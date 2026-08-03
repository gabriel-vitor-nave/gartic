import { useState, useEffect, useRef } from 'react';
import { Home, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Whiteboard } from './components/Whiteboard';
import type { WhiteboardRef } from './components/Whiteboard';
import './App.css';

type Phase = 
  | 'setup' 
  | 'roundIntro' 
  | 'drawing' 
  | 'timeUp' 
  | 'judging' 
  | 'roundResult' 
  | 'finalReview' 
  | 'finalScore' 
  | 'winner';

interface Team {
  id: 'yellow' | 'cyan';
  name: string;
  score: number;
}

interface Round {
  number: number;
  drawingTeam: 'yellow' | 'cyan';
  result: 'correct' | 'wrong';
  points: 0 | 1 | 2;
  pointsTeam?: 'yellow' | 'cyan';
  drawingSvg: string;
}

// Browser-native sound synthesizer using Web Audio API
const playSound = (type: 'click' | 'tick' | 'success' | 'fail' | 'buzzer' | 'fanfare') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      // Celebratory C-E-G major chord arpeggio
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'buzzer') {
      // Harsh end of time sound
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'fanfare') {
      // Upbeat victory tune
      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25];
      const durations = [0.15, 0.15, 0.15, 0.22, 0.15, 0.45];
      let time = now;
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, time);
        noteGain.gain.setValueAtTime(0.12, time);
        noteGain.gain.linearRampToValueAtTime(0.01, time + durations[idx]);
        noteOsc.start(time);
        noteOsc.stop(time + durations[idx]);
        time += durations[idx] - 0.03;
      });
    }
  } catch (err) {
    console.error('Audio synthesis failed:', err);
  }
};

function App() {
  const whiteboardRef = useRef<WhiteboardRef>(null);
  
  // Game Configuration State
  const [phase, setPhase] = useState<Phase>('setup');
  const [yellowTeam, setYellowTeam] = useState<Team>({ id: 'yellow', name: 'Amarelo', score: 0 });
  const [cyanTeam, setCyanTeam] = useState<Team>({ id: 'cyan', name: 'Ciano', score: 0 });
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(10);
  const [customRounds, setCustomRounds] = useState<string>('');
  const [roundsError, setRoundsError] = useState<string>('');
  const [timePerRound, setTimePerRound] = useState<number>(60);
  const [customTime, setCustomTime] = useState<string>('');
  const [roundsHistory, setRoundsHistory] = useState<Round[]>([]);

  // Drawing Phase Timer State
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const timerRef = useRef<any>(null);
  const timerStartRef = useRef<number>(0);
  const timerDurationRef = useRef<number>(0);

  // Judging Step State
  const [scoringTeam, setScoringTeam] = useState<'yellow' | 'cyan' | null>(null);
  const [scoringPoints, setScoringPoints] = useState<1 | 2 | null>(null);

  // Review Carousel State
  const [reviewIndex, setReviewIndex] = useState<number>(0);

  // Score Count Up Animation State
  const [animatedYellowScore, setAnimatedYellowScore] = useState<number>(0);
  const [animatedCyanScore, setAnimatedCyanScore] = useState<number>(0);
  const [isCountingFinished, setIsCountingFinished] = useState<boolean>(false);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Play click sound on all body clicks of buttons/interactive items
  const handleInteractionClick = () => {
    playSound('click');
  };

  // Alert on reload while playing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (phase !== 'setup' && phase !== 'winner') {
        e.preventDefault();
        e.returnValue = 'A partida está em andamento. Tem certeza de que deseja sair?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [phase]);

  // Track Fullscreen status change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    handleInteractionClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Erro ao ativar tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Timer logic
  const startTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(seconds);
    timerStartRef.current = performance.now();
    timerDurationRef.current = seconds * 1000;

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - timerStartRef.current;
      const remaining = Math.max(0, timerDurationRef.current - elapsed);
      const remainingSec = Math.ceil(remaining / 1000);
      
      setTimeLeft((prev) => {
        // If second changed and is in ticking range (last 5 seconds)
        if (remainingSec !== prev) {
          if (remainingSec <= 5 && remainingSec > 0) {
            playSound('tick');
          }
        }
        return remainingSec;
      });

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        playSound('buzzer');
        // Drawing ends: freeze and enter timeup phase
        setPhase('timeUp');
      }
    }, 100);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Determine drawing team based on round alternation
  const getDrawingTeamId = (roundNum: number): 'yellow' | 'cyan' => {
    return roundNum % 2 === 1 ? 'yellow' : 'cyan';
  };

  const getDrawingTeamName = (roundNum: number): string => {
    const id = getDrawingTeamId(roundNum);
    return id === 'yellow' ? yellowTeam.name : cyanTeam.name;
  };

  // Start the actual drawing phase
  const handleStartDrawing = () => {
    handleInteractionClick();
    setPhase('drawing');
    startTimer(timePerRound);
  };

  // Early end round (Organizer bypassed or clicked to judge)
  const handleEndDrawingEarly = () => {
    handleInteractionClick();
    stopTimer();
    playSound('buzzer');
    setPhase('timeUp');
  };

  // Handle judging input (ACERTO or ERRO)
  const handleSelectResult = (result: 'correct' | 'wrong') => {
    if (result === 'wrong') {
      playSound('fail');
      // Direct save with 0 points
      saveRoundAndProceed('wrong', 0, undefined);
    } else {
      playSound('click');
      // Set to judging page step 2
      setPhase('judging');
      setScoringTeam(null);
      setScoringPoints(null);
    }
  };

  // Save round result and update scores
  const saveRoundAndProceed = (
    result: 'correct' | 'wrong', 
    points: 0 | 1 | 2, 
    ptsTeam?: 'yellow' | 'cyan'
  ) => {
    // Get SVG snapshot
    const drawingSvg = whiteboardRef.current?.getSvgString() || '';
    
    const newRound: Round = {
      number: currentRoundNumber,
      drawingTeam: getDrawingTeamId(currentRoundNumber),
      result,
      points,
      pointsTeam: ptsTeam,
      drawingSvg
    };

    // Update global scores (ORIGINAL RULE)
    if (result === 'correct') {
      // Only the team that guessed correctly gets points
      // +1 for wrong TICs classification, +2 for correct TICs classification
      if (ptsTeam) {
        if (ptsTeam === 'yellow') {
          setYellowTeam(prev => ({ ...prev, score: prev.score + points }));
        } else {
          setCyanTeam(prev => ({ ...prev, score: prev.score + points }));
        }
      }
    }

    setRoundsHistory(prev => [...prev, newRound]);
    setPhase('roundResult');
  };

  const handleConfirmCorrectScore = () => {
    playSound('success');
    if (!scoringTeam || !scoringPoints) return;
    saveRoundAndProceed('correct', scoringPoints, scoringTeam);
  };

  // Proceed to next round or final review
  const handleNextRound = () => {
    handleInteractionClick();
    if (currentRoundNumber < totalRounds) {
      setCurrentRoundNumber(prev => prev + 1);
      setPhase('roundIntro');
    } else {
      // All rounds completed!
      setReviewIndex(0);
      setPhase('finalReview');
    }
  };

  // Final review screen transition to final counting screen
  const handleFinishReview = () => {
    handleInteractionClick();
    setAnimatedYellowScore(0);
    setAnimatedCyanScore(0);
    setIsCountingFinished(false);
    setPhase('finalScore');
  };

  // Animate final scores counter
  useEffect(() => {
    if (phase === 'finalScore') {
      let currentYellow = 0;
      let currentCyan = 0;
      const targetYellow = yellowTeam.score;
      const targetCyan = cyanTeam.score;
      const maxTarget = Math.max(targetYellow, targetCyan, 1);
      const duration = 2000; // 2 seconds animation
      const intervalTime = Math.max(50, duration / maxTarget);

      const countInterval = setInterval(() => {
        let updated = false;
        if (currentYellow < targetYellow) {
          currentYellow++;
          playSound('tick');
          setAnimatedYellowScore(currentYellow);
          updated = true;
        }
        if (currentCyan < targetCyan) {
          currentCyan++;
          if (!updated) playSound('tick'); // avoid overlapping ticks
          setAnimatedCyanScore(currentCyan);
          updated = true;
        }

        if (!updated) {
          clearInterval(countInterval);
          setIsCountingFinished(true);
          // Play fanfare and go to victory screen
          setTimeout(() => {
            playSound('fanfare');
            setPhase('winner');
            triggerConfetti();
          }, 1000);
        }
      }, intervalTime);

      return () => clearInterval(countInterval);
    }
  }, [phase, yellowTeam.score, cyanTeam.score]);

  // Victory confettis
  const triggerConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFC700', '#ffffff', '#00E5FF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFC700', '#ffffff', '#00E5FF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Play Again: Keep names, reset scores & rounds
  const handlePlayAgain = () => {
    handleInteractionClick();
    setYellowTeam(prev => ({ ...prev, score: 0 }));
    setCyanTeam(prev => ({ ...prev, score: 0 }));
    setCurrentRoundNumber(1);
    setRoundsHistory([]);
    setPhase('roundIntro');
  };

  // Back to Setup: Reset everything
  const handleRestartAll = () => {
    handleInteractionClick();
    setYellowTeam({ id: 'yellow', name: 'Amarelo', score: 0 });
    setCyanTeam({ id: 'cyan', name: 'Ciano', score: 0 });
    setCurrentRoundNumber(1);
    setTotalRounds(10);
    setCustomRounds('');
    setRoundsError('');
    setTimePerRound(60);
    setCustomTime('');
    setRoundsHistory([]);
    setPhase('setup');
  };

  // Start game from setup validation
  const handleStartGame = () => {
    handleInteractionClick();
    if (totalRounds < 2 || totalRounds % 2 !== 0) {
      setRoundsError('A quantidade de rodadas deve ser um número PAR e no mínimo 2.');
      return;
    }
    setRoundsError('');
    setPhase('roundIntro');
  };

  // Determine game winner
  const getWinnerInfo = () => {
    if (yellowTeam.score > cyanTeam.score) {
      return { winner: 'yellow', name: yellowTeam.name, scoreText: `${yellowTeam.score} × ${cyanTeam.score}` };
    } else if (cyanTeam.score > yellowTeam.score) {
      return { winner: 'cyan', name: cyanTeam.name, scoreText: `${cyanTeam.score} × ${yellowTeam.score}` };
    } else {
      return { winner: 'draw', name: 'Empate', scoreText: `${yellowTeam.score} × ${cyanTeam.score}` };
    }
  };

  return (
    <div className="game-container">
      {/* HEADER: Always visible */}
      <header className="game-header">
        <div className="logo-container" onClick={handleInteractionClick}>
          <img src="/logo-garTICS.png" alt="GarTICS logo" className="logo-image" />
          <span className="logo-text">GarTICS</span>
        </div>
        
        <div className="header-actions">
          {phase !== 'setup' && (
            <button className="action-btn" onClick={handleRestartAll} title="Voltar ao início">
              <Home size={18} />
              <span>Início</span>
            </button>
          )}
          <button className="fullscreen-btn" onClick={toggleFullscreen} title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}>
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* PHASE MANAGER ROUTER */}
      
      {/* 1. SETUP / LOBBY SCREEN */}
      {phase === 'setup' && (
        <div className="screen-wrapper">
          <div className="setup-screen">
            <img src="/logo-garTICS-bg.png" alt="GarTICS Background" className="setup-logo" />
            <h1 className="setup-title">GarTICS</h1>
            <p className="setup-subtitle">Desenhe. Adivinhe. Aprenda TICs!</p>
            
            <div className="setup-form">
              <div className="team-inputs-row">
                <div className="team-input-group yellow">
                  <label>🟡 Nome do Time Amarelo</label>
                  <input 
                    type="text" 
                    value={yellowTeam.name} 
                    onChange={(e) => setYellowTeam(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Amarelo"
                    maxLength={16}
                  />
                </div>
                <div className="team-input-group cyan">
                  <label>🔵 Nome do Time Ciano</label>
                  <input 
                    type="text" 
                    value={cyanTeam.name} 
                    onChange={(e) => setCyanTeam(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ciano"
                    maxLength={16}
                  />
                </div>
              </div>

              {/* Adjustable Rounds Config */}
              <div className="time-config-group">
                <label>Quantidade de rodadas (Número Par, mínimo 2)</label>
                <div className="time-options">
                  {[2, 4, 6, 8, 10, 12, 16, 20].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`time-btn ${totalRounds === r && !customRounds ? 'active' : ''}`}
                      onClick={() => {
                        handleInteractionClick();
                        setTotalRounds(r);
                        setCustomRounds('');
                        setRoundsError('');
                      }}
                    >
                      {r}
                    </button>
                  ))}
                  <input
                    type="number"
                    className="hex-input-box"
                    style={{ flex: 1, padding: '10px', height: 'auto', fontSize: '16px' }}
                    value={customRounds}
                    placeholder="Outro"
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomRounds(val);
                      const parsed = parseInt(val);
                      if (!isNaN(parsed)) {
                        setTotalRounds(parsed);
                        if (parsed >= 2 && parsed % 2 === 0) {
                          setRoundsError('');
                        } else {
                          setRoundsError('A quantidade de rodadas deve ser PAR e maior ou igual a 2.');
                        }
                      }
                    }}
                  />
                </div>
                {roundsError && <span style={{ color: '#ffb3b3', fontSize: '14px', fontWeight: 'bold', textShadow: '1px 1px 0px #000' }}>⚠️ {roundsError}</span>}
              </div>

              {/* Round Duration Timer Config */}
              <div className="time-config-group">
                <label>Tempo por rodada (segundos)</label>
                <div className="time-options">
                  {[30, 45, 60, 90].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`time-btn ${timePerRound === t && !customTime ? 'active' : ''}`}
                      onClick={() => {
                        handleInteractionClick();
                        setTimePerRound(t);
                        setCustomTime('');
                      }}
                    >
                      {t}s
                    </button>
                  ))}
                  <input
                    type="number"
                    className="hex-input-box"
                    style={{ flex: 1, padding: '10px', height: 'auto', fontSize: '16px' }}
                    value={customTime}
                    placeholder="Outro"
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomTime(val);
                      const parsed = parseInt(val);
                      if (!isNaN(parsed) && parsed > 0) {
                        setTimePerRound(parsed);
                      }
                    }}
                  />
                </div>
              </div>

              <button className="start-btn" onClick={handleStartGame}>
                Começar Jogo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROUND INTRO SCREEN */}
      {phase === 'roundIntro' && (
        <div className="screen-wrapper">
          <div className="round-intro-screen">
            <span className="round-intro-number">RODADA {currentRoundNumber} DE {totalRounds}</span>
            
            <div className={`round-intro-team-card ${getDrawingTeamId(currentRoundNumber)}`}>
              <span className="vez-de-text">Vez do time</span>
              <h2 className="team-display-name">
                {getDrawingTeamName(currentRoundNumber).toUpperCase()}
              </h2>
              <p className="draw-instruction">Escolha uma pessoa para desenhar!</p>
              
              <button className="ready-btn" onClick={handleStartDrawing}>
                Começar Desenho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DRAWING SCREEN (ACTIVE GAMEBOARD) */}
      {(phase === 'drawing' || phase === 'timeUp' || phase === 'judging') && (
        <div className="screen-wrapper">
          <div className="game-play-area">
            {/* Play board Topbar */}
            <div className="game-status-bar">
              <div className="current-team-status">
                <span className={`team-badge ${getDrawingTeamId(currentRoundNumber)}`}>
                  {getDrawingTeamName(currentRoundNumber)}
                </span>
                <span className="drawing-label">Desenhando...</span>
              </div>

              <span className="current-round-indicator">
                RODADA {currentRoundNumber} / {totalRounds}
              </span>

              <div className={`timer-box ${timeLeft <= 10 ? 'warning' : ''}`}>
                <span className="timer-text">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>

              {phase === 'drawing' && (
                <button className="action-btn danger" onClick={handleEndDrawingEarly}>
                  Finalizar Tempo
                </button>
              )}
            </div>

            {/* Drawing workspace (Whiteboard canvas is FULLY visible in the background) */}
            <Whiteboard 
              ref={whiteboardRef} 
              disabled={phase === 'timeUp' || phase === 'judging'} 
            />

            {/* 4. NON-INTRUSIVE BOTTOM OVERLAY: TIME UP DECISION */}
            {phase === 'timeUp' && (
              <div className="bottom-judging-overlay">
                <div className="bottom-judging-row">
                  <div className="bottom-judging-text-group">
                    <h2 className="bottom-timeup-title">Tempo Esgotado!</h2>
                    <p className="bottom-timeup-desc">O desenho foi congelado. Quem acertará a palavra?</p>
                  </div>
                  
                  <div className="bottom-decision-buttons">
                    <button className="bottom-decision-btn correct" onClick={() => handleSelectResult('correct')}>
                      ✓ Acerto
                    </button>
                    <button className="bottom-decision-btn wrong" onClick={() => handleSelectResult('wrong')}>
                      ✕ Erro
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. NON-INTRUSIVE BOTTOM OVERLAY: JUDGING STEP 2 */}
            {phase === 'judging' && (
              <div className="bottom-judging-overlay">
                <div className="bottom-judging-card">
                  
                  {/* Team selector */}
                  <div className="bottom-judging-selection-section">
                    <span className="bottom-judging-label">Pontos Para:</span>
                    <div className="bottom-judging-options">
                      <button 
                        className={`bottom-judging-btn yellow ${scoringTeam === 'yellow' ? 'active' : ''}`}
                        onClick={() => { handleInteractionClick(); setScoringTeam('yellow'); }}
                      >
                        {yellowTeam.name}
                      </button>
                      <button 
                        className={`bottom-judging-btn cyan ${scoringTeam === 'cyan' ? 'active' : ''}`}
                        onClick={() => { handleInteractionClick(); setScoringTeam('cyan'); }}
                      >
                        {cyanTeam.name}
                      </button>
                    </div>
                  </div>

                  {/* Points selector */}
                  <div className="bottom-judging-selection-section">
                    <span className="bottom-judging-label">Valor:</span>
                    <div className="bottom-judging-options">
                      <button 
                        className={`bottom-judging-btn points ${scoringPoints === 1 ? 'active' : ''}`}
                        onClick={() => { handleInteractionClick(); setScoringPoints(1); }}
                      >
                        +1 Ponto
                      </button>
                      <button 
                        className={`bottom-judging-btn points ${scoringPoints === 2 ? 'active' : ''}`}
                        onClick={() => { handleInteractionClick(); setScoringPoints(2); }}
                      >
                        +2 Pontos
                      </button>
                    </div>
                  </div>

                  {/* Confirm & Back */}
                  <div className="bottom-judging-options">
                    <button 
                      className="bottom-judging-btn" 
                      style={{ background: 'transparent' }}
                      onClick={() => { handleInteractionClick(); setPhase('timeUp'); }}
                    >
                      Voltar
                    </button>
                    <button 
                      className="bottom-confirm-btn" 
                      onClick={handleConfirmCorrectScore}
                      disabled={!scoringTeam || !scoringPoints}
                    >
                      Confirmar
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. ROUND RESULT SUMMARY */}
      {phase === 'roundResult' && (
        <div className="screen-wrapper">
          {(() => {
            const lastRound = roundsHistory[roundsHistory.length - 1];
            const isCorrect = lastRound.result === 'correct';
            const pts = lastRound.points;
            const scoringTeamName = lastRound.pointsTeam === 'yellow' ? yellowTeam.name : cyanTeam.name;

            return (
              <div className="round-result-screen">
                <span className="round-intro-number">RODADA {lastRound.number} CONCLUÍDA</span>
                
                <h2 className={`result-title ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? '✓ Acerto!' : '✕ Erro!'}
                </h2>

                {isCorrect && pts > 0 && (
                  <p className="round-result-points">
                    <span className={`team-badge ${lastRound.pointsTeam}`}>{scoringTeamName}</span>
                    &nbsp;+{pts} {pts === 1 ? 'ponto' : 'pontos'}
                  </p>
                )}

                <button className="next-round-btn" onClick={handleNextRound}>
                  {currentRoundNumber < totalRounds ? 'Próxima Rodada' : 'Ver Retrospectiva'}
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* 7. FINAL REVIEW SCREEN (RETROSPECTIVA) */}
      {phase === 'finalReview' && (
        <div className="screen-wrapper">
          {(() => {
            const currentItem = roundsHistory[reviewIndex];
            if (!currentItem) return null;
            const drawTeamName = currentItem.drawingTeam === 'yellow' ? yellowTeam.name : cyanTeam.name;
            const ptsTeamName = currentItem.result === 'correct' && currentItem.pointsTeam
              ? (currentItem.pointsTeam === 'yellow' ? yellowTeam.name : cyanTeam.name)
              : '';

            return (
              <div className="final-review-screen">
                <h2 className="final-review-title">Retrospectiva dos Desenhos</h2>

                <div className="review-carousel-container">
                  <button 
                    className="carousel-nav-btn"
                    disabled={reviewIndex === 0}
                    onClick={() => { handleInteractionClick(); setReviewIndex(prev => prev - 1); }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="review-slide-card">
                    <div className="review-slide-header">
                      <span className="review-round-num">RODADA {currentItem.number} / {totalRounds}</span>
                      <span className={`review-team-badge ${currentItem.drawingTeam}`}>
                        Desenhado por: {drawTeamName}
                      </span>
                    </div>

                    <div className="review-canvas-container">
                      <div 
                        className="review-canvas-svg"
                        dangerouslySetInnerHTML={{ __html: currentItem.drawingSvg }}
                      />
                    </div>

                    <div className="review-slide-footer">
                      <span className={`review-result-badge ${currentItem.result}`}>
                        {currentItem.result === 'correct' ? '✓ Acerto' : '✕ Erro'}
                      </span>
                      {ptsTeamName && (
                        <span className="review-pts-badge">
                          {ptsTeamName} +{currentItem.points}pt
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    className="carousel-nav-btn"
                    disabled={reviewIndex === roundsHistory.length - 1}
                    onClick={() => { handleInteractionClick(); setReviewIndex(prev => prev + 1); }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="carousel-indicators">
                  {roundsHistory.map((_, idx) => (
                    <div
                      key={idx}
                      className={`indicator-dot ${reviewIndex === idx ? 'active' : ''}`}
                      onClick={() => { handleInteractionClick(); setReviewIndex(idx); }}
                    />
                  ))}
                </div>

                <button className="skip-review-btn" onClick={handleFinishReview}>
                  Ir para o Placar Final
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* 8. FINAL SCORE BOARD (COUNT ANIMATION) */}
      {phase === 'finalScore' && (
        <div className="screen-wrapper">
          <div className="final-score-screen">
            <h2 className="final-score-title">Placar Final</h2>

            <div className="scoreboard-final-row">
              <div className="final-score-card yellow">
                <span className="final-score-name">{yellowTeam.name}</span>
                <span className="final-score-number">{animatedYellowScore}</span>
                <span className="drawing-label">Pontos</span>
              </div>

              <div className="final-score-card cyan">
                <span className="final-score-name">{cyanTeam.name}</span>
                <span className="final-score-number">{animatedCyanScore}</span>
                <span className="drawing-label">Pontos</span>
              </div>
            </div>
            
            <p className="drawing-label">
              {!isCountingFinished ? 'Calculando pontuação total...' : 'Fim do cálculo!'}
            </p>
          </div>
        </div>
      )}

      {/* 9. WINNER / VICTORY SCREEN */}
      {phase === 'winner' && (
        <div className="screen-wrapper">
          {(() => {
            const win = getWinnerInfo();
            return (
              <div className="final-score-screen">
                <div className="winner-announce-container">
                  <img src="/trophy.png" alt="Troféu" className="trophy-image" />
                  
                  {win.winner === 'draw' ? (
                    <h2 className="winner-title draw">Empate!</h2>
                  ) : (
                    <h2 className={`winner-title ${win.winner}`}>
                      Time {win.name} Venceu!
                    </h2>
                  )}

                  <span className="winner-subtitle">Placar final: {win.scoreText}</span>
                </div>

                <div className="scoreboard-final-row" style={{ maxWidth: '600px' }}>
                  <div className={`final-score-card yellow ${win.winner === 'yellow' ? 'winner-card' : ''}`}>
                    <span className="final-score-name">{yellowTeam.name}</span>
                    <span className="final-score-number" style={{ fontSize: '72px' }}>{yellowTeam.score}</span>
                  </div>

                  <div className={`final-score-card cyan ${win.winner === 'cyan' ? 'winner-card' : ''}`}>
                    <span className="final-score-name">{cyanTeam.name}</span>
                    <span className="final-score-number" style={{ fontSize: '72px' }}>{cyanTeam.score}</span>
                  </div>
                </div>

                <div className="final-actions-row">
                  <button className="final-action-btn primary" onClick={handlePlayAgain}>
                    Jogar Novamente
                  </button>
                  <button className="final-action-btn secondary" onClick={handleRestartAll}>
                    Configurar Outro Jogo
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default App;
