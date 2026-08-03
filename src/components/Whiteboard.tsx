import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Pencil, Eraser, Minus, Square, Circle as CircleIcon, PaintBucket, Pipette, Undo, Redo, Trash2 } from 'lucide-react';

export interface WhiteboardRef {
  getSvgString: () => string;
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

interface WhiteboardProps {
  disabled?: boolean;
}

type Tool = 'pencil' | 'eraser' | 'line' | 'rect' | 'circle' | 'bucket' | 'picker';
type ShapeMode = 'hollow' | 'filled';

interface DrawingElement {
  id: string;
  type: 'path' | 'line' | 'rect' | 'circle' | 'image';
  tool: Tool;
  points?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
  opacity: number;
  href?: string; // for flood fill images
}

const PALETTE = [
  '#000000', '#ffffff', '#7f7f7f', '#c3c3c3',
  '#ef4444', '#f97316', '#F4C430', '#22c55e',
  '#00E5FF', '#3b82f6', '#8b5cf6', '#ec4899'
];

export const Whiteboard = forwardRef<WhiteboardRef, WhiteboardProps>(({ disabled = false }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // hidden canvas for picker and flood fill

  // Board settings
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(8);
  const [opacity, setOpacity] = useState<number>(100);
  const [shapeMode, setShapeMode] = useState<ShapeMode>('hollow');

  // SVG drawing state
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [history, setHistory] = useState<DrawingElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [activeElement, setActiveElement] = useState<DrawingElement | null>(null);

  // Drawing tracking
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [showConfirmClear, setShowConfirmClear] = useState<boolean>(false);

  // Undo / Redo helpers
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const pushState = (newElements: DrawingElement[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newElements);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (disabled || !canUndo) return;
    const prevIndex = historyIndex - 1;
    setHistoryIndex(prevIndex);
    setElements(history[prevIndex]);
  };

  const handleRedo = () => {
    if (disabled || !canRedo) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setElements(history[nextIndex]);
  };

  const handleClear = () => {
    if (disabled) return;
    pushState([]);
    setShowConfirmClear(false);
  };

  // Expose controls to parent
  useImperativeHandle(ref, () => ({
    getSvgString: () => {
      if (!svgRef.current) return '';
      // Clone SVG and set inline styles if needed
      const serializer = new XMLSerializer();
      return serializer.serializeToString(svgRef.current);
    },
    clear: () => {
      pushState([]);
    },
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo
  }));

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      
      // Prevent shortcuts if typing in any input element (e.g. HEX input)
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      // Check for Ctrl key combos
      if (e.ctrlKey) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
        }
        return;
      }

      // Single-key shortcuts
      switch (e.key.toLowerCase()) {
        case 'p':
          setTool('pencil');
          break;
        case 'e':
          setTool('eraser');
          break;
        case 'l':
          setTool('line');
          break;
        case 'r':
          setTool('rect');
          break;
        case 'c':
          setTool('circle');
          break;
        case 'g':
          setTool('bucket');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, historyIndex, history]);

  // Convert screen coordinates to SVG coordinates - FIXED INTERNAL SYSTEM
  const getCoordinates = (e: React.PointerEvent<SVGSVGElement>): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    // Internal viewbox is ALWAYS 1600x900 (16:9 ratio)
    // Same point always maps to same coordinates regardless of display size
    const x = ((e.clientX - rect.left) / rect.width) * 1600;
    const y = ((e.clientY - rect.top) / rect.height) * 900;
    return { x, y };
  };

  // Sync canvas with elements for eyedropper & flood fill
  const updateHiddenCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const canvas = canvasRef.current;
    if (!canvas || !svgRef.current) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Clear canvas with white background (1600x900)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1600, 900);

    // Rasterize current SVG elements
    const svgStr = new XMLSerializer().serializeToString(svgRef.current);
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1600, 900);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    });
  };

  // Flood fill algorithm helper
  const floodFill = (canvas: HTMLCanvasElement, startX: number, startY: number, fillColorHex: string, targetOpacity: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clamp coordinates
    const pxX = Math.floor(startX);
    const pxY = Math.floor(startY);
    if (pxX < 0 || pxX >= width || pxY < 0 || pxY >= height) return null;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Helper to get pixel color
    const getPixel = (x: number, y: number) => {
      const idx = (y * width + x) * 4;
      return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
    };

    const targetColor = getPixel(pxX, pxY);

    // Parse fill color
    const fillR = parseInt(fillColorHex.slice(1, 3), 16);
    const fillG = parseInt(fillColorHex.slice(3, 5), 16);
    const fillB = parseInt(fillColorHex.slice(5, 7), 16);
    const fillA = Math.floor(targetOpacity * 2.55);

    // If click is same color, do nothing
    const colorMatch = (c1: number[], r: number, g: number, b: number, a: number) => {
      // Allow slight threshold
      const threshold = 15;
      return Math.abs(c1[0] - r) <= threshold &&
             Math.abs(c1[1] - g) <= threshold &&
             Math.abs(c1[2] - b) <= threshold &&
             Math.abs(c1[3] - a) <= threshold;
    };

    if (colorMatch(targetColor, fillR, fillG, fillB, fillA)) {
      return null;
    }

    // Standard Queue Flood Fill
    const queue: [number, number][] = [[pxX, pxY]];
    const targetR = targetColor[0];
    const targetG = targetColor[1];
    const targetB = targetColor[2];
    const targetA = targetColor[3];

    // Create a new canvas to draw ONLY the filled region (transparent background)
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = width;
    resultCanvas.height = height;
    const resultCtx = resultCanvas.getContext('2d');
    if (!resultCtx) return null;
    const resultImgData = resultCtx.createImageData(width, height);
    const resultData = resultImgData.data;

    const visited = new Uint8Array(width * height);

    while (queue.length > 0) {
      const curr = queue.shift();
      if (!curr) continue;
      const [cx, cy] = curr;

      const idx = cy * width + cx;
      if (visited[idx]) continue;
      visited[idx] = 1;

      const pIdx = idx * 4;
      // Check if current matches target
      const match = Math.abs(data[pIdx] - targetR) <= 20 &&
                    Math.abs(data[pIdx+1] - targetG) <= 20 &&
                    Math.abs(data[pIdx+2] - targetB) <= 20 &&
                    Math.abs(data[pIdx+3] - targetA) <= 20;

      if (match) {
        // Draw in fill color on result image
        resultData[pIdx] = fillR;
        resultData[pIdx+1] = fillG;
        resultData[pIdx+2] = fillB;
        resultData[pIdx+3] = fillA;

        // Draw in data so we don't repeat checks
        data[pIdx] = fillR;
        data[pIdx+1] = fillG;
        data[pIdx+2] = fillB;
        data[pIdx+3] = fillA;

        // Push neighbors
        if (cx > 0) queue.push([cx - 1, cy]);
        if (cx < width - 1) queue.push([cx + 1, cy]);
        if (cy > 0) queue.push([cx, cy - 1]);
        if (cy < height - 1) queue.push([cx, cy + 1]);
      }
    }

    resultCtx.putImageData(resultImgData, 0, 0);
    return resultCanvas.toDataURL('image/png');
  };

  // Pointer Down
  const handlePointerDown = async (e: React.PointerEvent<SVGSVGElement>) => {
    if (disabled) return;
    const coords = getCoordinates(e);
    setStartPoint(coords);
    setIsDrawing(true);

    const id = Date.now().toString();

    // Eye dropper picker
    if (tool === 'picker') {
      const canvas = await updateHiddenCanvas();
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Read pixel
          const pixel = ctx.getImageData(Math.floor(coords.x), Math.floor(coords.y), 1, 1).data;
          const r = pixel[0];
          const g = pixel[1];
          const b = pixel[2];
          const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          setColor(hex);
          setTool('pencil'); // Switch back to pencil
        }
      }
      setIsDrawing(false);
      return;
    }

    // Bucket flood fill
    if (tool === 'bucket') {
      const canvas = await updateHiddenCanvas();
      if (canvas) {
        const dataUrl = floodFill(canvas, coords.x, coords.y, color, opacity);
        if (dataUrl) {
          const newElement: DrawingElement = {
            id,
            type: 'image',
            tool: 'bucket',
            x: 0,
            y: 0,
            width: 1600,
            height: 900,
            href: dataUrl,
            stroke: 'none',
            strokeWidth: 0,
            fill: 'none',
            opacity: 1
          };
          pushState([...elements, newElement]);
        }
      }
      setIsDrawing(false);
      return;
    }

    // Normal draw tools
    let newElement: DrawingElement | null = null;
    const currentOpacity = opacity / 100;

    if (tool === 'pencil' || tool === 'eraser') {
      const drawColor = tool === 'eraser' ? '#ffffff' : color;
      newElement = {
        id,
        type: 'path',
        tool,
        points: `M ${coords.x.toFixed(1)} ${coords.y.toFixed(1)}`,
        stroke: drawColor,
        strokeWidth: brushSize,
        fill: 'none',
        opacity: currentOpacity
      };
    } else if (tool === 'line') {
      newElement = {
        id,
        type: 'line',
        tool,
        x1: coords.x,
        y1: coords.y,
        x2: coords.x,
        y2: coords.y,
        stroke: color,
        strokeWidth: brushSize,
        fill: 'none',
        opacity: currentOpacity
      };
    } else if (tool === 'rect') {
      newElement = {
        id,
        type: 'rect',
        tool,
        x: coords.x,
        y: coords.y,
        width: 0,
        height: 0,
        stroke: color,
        strokeWidth: brushSize,
        fill: shapeMode === 'filled' ? color : 'none',
        opacity: currentOpacity
      };
    } else if (tool === 'circle') {
      newElement = {
        id,
        type: 'circle',
        tool,
        cx: coords.x,
        cy: coords.y,
        r: 0,
        stroke: color,
        strokeWidth: brushSize,
        fill: shapeMode === 'filled' ? color : 'none',
        opacity: currentOpacity
      };
    }

    if (newElement) {
      setActiveElement(newElement);
    }
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const coords = getCoordinates(e);
    setCursorPos(coords);

    if (!isDrawing || !activeElement || disabled) return;

    let updated = { ...activeElement };

    if (activeElement.type === 'path') {
      updated.points = `${activeElement.points} L ${coords.x.toFixed(1)} ${coords.y.toFixed(1)}`;
    } else if (activeElement.type === 'line') {
      updated.x2 = coords.x;
      updated.y2 = coords.y;
    } else if (activeElement.type === 'rect') {
      const x = Math.min(startPoint.x, coords.x);
      const y = Math.min(startPoint.y, coords.y);
      const width = Math.abs(startPoint.x - coords.x);
      const height = Math.abs(startPoint.y - coords.y);
      updated.x = x;
      updated.y = y;
      updated.width = width;
      updated.height = height;
    } else if (activeElement.type === 'circle') {
      const r = Math.sqrt(
        Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2)
      );
      updated.r = r;
    }

    setActiveElement(updated);
  };

  // Pointer Up
  const handlePointerUp = () => {
    if (!isDrawing || disabled) return;
    setIsDrawing(false);

    if (activeElement) {
      pushState([...elements, activeElement]);
      setActiveElement(null);
    }
  };

  // Leave drawing area
  const handlePointerLeave = () => {
    handlePointerUp();
    setCursorPos({ x: -100, y: -100 });
  };

  return (
    <div className="drawing-workspace">
      {/* LEFT PANEL: Color selection */}
      <div className="workspace-panel left">
        <h3 className="panel-title">Cores</h3>
        <div className="color-picker-section">
          <div className="palette-grid">
            {PALETTE.map((c) => (
              <div
                key={c}
                className={`palette-color ${color.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => !disabled && setColor(c)}
              />
            ))}
          </div>
          
          <div className="custom-picker-wrapper">
            <div className="native-color-btn" style={{ backgroundColor: color }}>
              <input
                type="color"
                value={color}
                disabled={disabled}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="hex-input-box"
              value={color.toUpperCase()}
              disabled={disabled}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#000000"
            />
            <div className="active-color-preview-box" style={{ backgroundColor: color }} />
          </div>
        </div>
      </div>

      {/* CENTER WORKSPACE: SVGs drawing board */}
      <div className="workspace-center" ref={containerRef}>
        <div className="whiteboard-container">
          <svg
            ref={svgRef}
            className="drawing-canvas"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid meet"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
          >
            {/* White Background element so rasterization works */}
            <rect width="1600" height="900" fill="#ffffff" />
            
            {/* Render all past elements */}
            {elements.map((el) => {
              if (el.type === 'path') {
                return (
                  <path
                    key={el.id}
                    d={el.points}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    fill={el.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={el.opacity}
                  />
                );
              }
              if (el.type === 'line') {
                return (
                  <line
                    key={el.id}
                    x1={el.x1}
                    y1={el.y1}
                    x2={el.x2}
                    y2={el.y2}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    opacity={el.opacity}
                    strokeLinecap="round"
                  />
                );
              }
              if (el.type === 'rect') {
                return (
                  <rect
                    key={el.id}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    fill={el.fill}
                    opacity={el.opacity}
                    strokeLinejoin="round"
                  />
                );
              }
              if (el.type === 'circle') {
                return (
                  <circle
                    key={el.id}
                    cx={el.cx}
                    cy={el.cy}
                    r={el.r}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    fill={el.fill}
                    opacity={el.opacity}
                  />
                );
              }
              if (el.type === 'image') {
                return (
                  <image
                    key={el.id}
                    href={el.href}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                  />
                );
              }
              return null;
            })}

            {/* Active Drawing Preview element */}
            {activeElement && (
              <>
                {activeElement.type === 'path' && (
                  <path
                    d={activeElement.points}
                    stroke={activeElement.stroke}
                    strokeWidth={activeElement.strokeWidth}
                    fill={activeElement.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={activeElement.opacity}
                  />
                )}
                {activeElement.type === 'line' && (
                  <line
                    x1={activeElement.x1}
                    y1={activeElement.y1}
                    x2={activeElement.x2}
                    y2={activeElement.y2}
                    stroke={activeElement.stroke}
                    strokeWidth={activeElement.strokeWidth}
                    opacity={activeElement.opacity}
                    strokeLinecap="round"
                  />
                )}
                {activeElement.type === 'rect' && (
                  <rect
                    x={activeElement.x}
                    y={activeElement.y}
                    width={activeElement.width}
                    height={activeElement.height}
                    stroke={activeElement.stroke}
                    strokeWidth={activeElement.strokeWidth}
                    fill={activeElement.fill}
                    opacity={activeElement.opacity}
                    strokeLinejoin="round"
                  />
                )}
                {activeElement.type === 'circle' && (
                  <circle
                    cx={activeElement.cx}
                    cy={activeElement.cy}
                    r={activeElement.r}
                    stroke={activeElement.stroke}
                    strokeWidth={activeElement.strokeWidth}
                    fill={activeElement.fill}
                    opacity={activeElement.opacity}
                  />
                )}
              </>
            )}
          </svg>

          {/* Custom Cursor Circle Preview (not displayed when disabled) */}
          {!disabled && cursorPos.x >= 0 && cursorPos.y >= 0 && (tool === 'pencil' || tool === 'eraser') && (
            <div
              className="custom-cursor"
              style={{
                left: `${(cursorPos.x / 1600) * 100}%`,
                top: `${(cursorPos.y / 900) * 100}%`,
                width: `${brushSize * (containerRef.current ? containerRef.current.getBoundingClientRect().width / 1600 : 1)}px`,
                height: `${brushSize * (containerRef.current ? containerRef.current.getBoundingClientRect().width / 1600 : 1)}px`,
              }}
            />
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Tools and Options */}
      <div className="workspace-panel right">
        <h3 className="panel-title">Ferramentas</h3>
        <div className="tools-section">
          <div className="tool-grid">
            <button
              className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('pencil')}
              title="Lápis (P)"
            >
              <Pencil />
              <span>Lápis</span>
            </button>
            <button
              className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('eraser')}
              title="Borracha (E)"
            >
              <Eraser />
              <span>Borracha</span>
            </button>
            <button
              className={`tool-btn ${tool === 'line' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('line')}
              title="Linha (L)"
            >
              <Minus />
              <span>Linha</span>
            </button>
            <button
              className={`tool-btn ${tool === 'rect' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('rect')}
              title="Retângulo (R)"
            >
              <Square />
              <span>Retângulo</span>
            </button>
            <button
              className={`tool-btn ${tool === 'circle' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('circle')}
              title="Círculo (C)"
            >
              <CircleIcon />
              <span>Círculo</span>
            </button>
            <button
              className={`tool-btn ${tool === 'bucket' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('bucket')}
              title="Balde (G)"
            >
              <PaintBucket />
              <span>Balde</span>
            </button>
            <button
              className={`tool-btn ${tool === 'picker' ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => setTool('picker')}
              title="Conta-gotas"
            >
              <Pipette />
              <span>Gotas</span>
            </button>
          </div>
        </div>

        {/* Options */}
        {(tool === 'rect' || tool === 'circle') && (
          <div className="slider-group">
            <div className="slider-header">
              <span>Estilo</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`time-btn ${shapeMode === 'hollow' ? 'active' : ''}`}
                style={{ padding: '6px', fontSize: '12px' }}
                disabled={disabled}
                onClick={() => setShapeMode('hollow')}
              >
                Vazado
              </button>
              <button
                className={`time-btn ${shapeMode === 'filled' ? 'active' : ''}`}
                style={{ padding: '6px', fontSize: '12px' }}
                disabled={disabled}
                onClick={() => setShapeMode('filled')}
              >
                Preenchido
              </button>
            </div>
          </div>
        )}

        <div className="slider-group">
          <div className="slider-header">
            <span>Tamanho</span>
            <span className="slider-value">{brushSize}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            className="tool-slider"
            value={brushSize}
            disabled={disabled}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
        </div>

        <div className="slider-group">
          <div className="slider-header">
            <span>Opacidade</span>
            <span className="slider-value">{opacity}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            className="tool-slider"
            value={opacity}
            disabled={disabled}
            onChange={(e) => setOpacity(parseInt(e.target.value))}
          />
        </div>

        {/* Action section (Undo, Redo, Clean) */}
        <div className="actions-section">
          <button
            className="action-btn"
            disabled={disabled || !canUndo}
            onClick={handleUndo}
            title="Desfazer (Ctrl+Z)"
          >
            <Undo size={16} />
            <span>Desfazer</span>
          </button>
          <button
            className="action-btn"
            disabled={disabled || !canRedo}
            onClick={handleRedo}
            title="Refazer (Ctrl+Shift+Z)"
          >
            <Redo size={16} />
            <span>Refazer</span>
          </button>
          <button
            className="action-btn danger"
            disabled={disabled}
            onClick={() => setShowConfirmClear(true)}
          >
            <Trash2 size={16} />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Hidden rasterization canvas for eyedropper and bucket fills */}
      <canvas ref={canvasRef} width="1600" height="900" style={{ display: 'none' }} />

      {/* Clean Confirm Modal */}
      {showConfirmClear && (
        <div className="modal-overlay">
          <div className="confirm-modal-card">
            <h3 className="modal-title">Limpar desenho?</h3>
            <p className="modal-desc">Isso irá apagar permanentemente todas as suas linhas nesta rodada.</p>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={() => setShowConfirmClear(false)}>
                Cancelar
              </button>
              <button className="modal-btn confirm-danger" onClick={handleClear}>
                Limpar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Whiteboard.displayName = 'Whiteboard';
