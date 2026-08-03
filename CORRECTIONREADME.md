# GAR TICS — CORREÇÃO DA LÓGICA DE JULGAMENTO

## 1. REGRA FUNDAMENTAL

O GarTICS **NÃO deve tentar descobrir, validar ou registrar a resposta dada pelos jogadores**.

O site não precisa saber:

- qual era a palavra;
- o que alguém falou;
- se a resposta estava próxima;
- se a palavra era TICs;
- se a palavra era tecnologia;
- quem falou primeiro;
- quem desenhou;
- qual foi a justificativa dada oralmente.

Tudo isso acontece presencialmente.

O organizador é o juiz.

O site apenas registra o resultado decidido pelo organizador.

---

# 2. O PAPEL FÍSICO É A FONTE DA VERDADE

As palavras ficam nos papéis físicos.

Exemplo:

```text
┌─────────────────────┐
│                     │
│     CELULAR         │
│                     │
└─────────────────────┘
```

No verso:

```text
TECNOLOGIA: SIM
TICs: SIM
```

O jogador vê o papel.

O site não vê o papel.

O jogador desenha.

Os participantes tentam adivinhar verbalmente.

O organizador olha o verso do papel e sabe qual é a classificação correta.

---

# 3. O SITE NÃO POSSUI BANCO DE PALAVRAS

Não criar:

```text
words.json
```

Não criar:

```text
technologyWords
ticsWords
```

Não criar sistema de sorteio digital.

Não criar validação automática.

Não criar campo para inserir a resposta antes do julgamento.

O conteúdo das palavras pertence à atividade física.

---

# 4. O ORGANIZADOR CONTROLA O RESULTADO

Depois que alguém responder verbalmente, o organizador decide.

Se estiver errado:

```text
❌ ERRO
```

Se estiver correto:

```text
✅ ACERTO
```

O site então pergunta apenas:

> Quantos pontos?

E:

> Para qual time?

---

# 5. TELA DE JULGAMENTO

Quando o tempo acabar, ou quando o organizador decidir registrar o resultado, mostrar:

```text
┌─────────────────────────────────────────┐
│                                         │
│             FIM DA RODADA               │
│                                         │
│          O QUE ACONTECEU?                │
│                                         │
│       ┌────────────┐  ┌────────────┐     │
│       │            │  │            │     │
│       │  ✓ ACERTO  │  │  ✕ ERRO    │     │
│       │            │  │            │     │
│       └────────────┘  └────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

---

# 6. SE FOR ERRO

Ao clicar em:

> ❌ ERRO

o resultado é automaticamente:

```text
0 pontos
```

Não perguntar mais nada.

Mostrar:

```text
ERRO

0 PONTOS

[ CONTINUAR ]
```

O desenho é salvo para a apresentação final.

---

# 7. SE FOR ACERTO

Ao clicar:

> ✅ ACERTO

abrir:

```text
┌─────────────────────────────────────────┐
│                                         │
│                ACERTO!                  │
│                                         │
│           QUEM GANHOU OS PONTOS?        │
│                                         │
│       🟡 AMARELO      🔵 CIANO          │
│                                         │
│                                         │
│             QUANTOS PONTOS?             │
│                                         │
│             ┌─────┐  ┌─────┐            │
│             │ +1  │  │ +2  │            │
│             └─────┘  └─────┘            │
│                                         │
└─────────────────────────────────────────┘
```

O organizador escolhe:

### Time

- Amarelo
- Ciano

### Pontos

- +1
- +2

Depois:

```text
[ CONFIRMAR ]
```

---

# 8. POR QUE O SITE NÃO PRECISA SABER O MOTIVO DOS PONTOS?

Porque você já sabe o motivo.

As regras da brincadeira são:

### +1

A pessoa acertou o desenho/palavra, mas errou a classificação de TICs.

### +2

A pessoa acertou o desenho/palavra e acertou a classificação de TICs.

O organizador simplesmente transforma isso em:

```text
+1
```

ou:

```text
+2
```

O site não precisa conhecer a lógica por trás da decisão.

---

# 9. O SITE DEVE PERMITIR QUALQUER RESULTADO VÁLIDO

Não fazer o site tentar impedir:

> "Mas essa rodada deveria ser +2."

O organizador é soberano.

Se ele clicar:

```text
Ciano
+1
```

o site registra:

```text
Ciano += 1
```

Se clicar:

```text
Amarelo
+2
```

registra:

```text
Amarelo += 2
```

O sistema não deve questionar a decisão.

---

# 10. QUEM RECEBE OS PONTOS

O time que recebe os pontos deve ser escolhido manualmente.

Isso é importante porque:

**o time que está desenhando NÃO necessariamente recebe os pontos.**

Exemplo:

```text
Rodada:

🟡 AMARELO está desenhando.

Uma pessoa do 🔵 CIANO adivinha.

Você confirma:

ACERTO
↓
Ciano
↓
+2
```

Resultado:

```text
🔵 CIANO +2
```

---

# 11. ERRO NÃO PRECISA DE TIME

Quando for erro:

```text
❌ ERRO
```

automaticamente:

```text
0 pontos
```

Não perguntar qual time.

Nenhum time recebe pontos.

---

# 12. MODELO DE DADOS SIMPLIFICADO

Não precisamos mais de:

```typescript
word;
technology;
tics;
guessingTeam;
classification;
```

A rodada pode ser simplesmente:

```typescript
type Round = {
  number: number;

  drawingTeam: "yellow" | "cyan";

  result: "correct" | "wrong";

  points: 0 | 1 | 2;

  pointsTeam?: "yellow" | "cyan";

  drawingSvg: string;
};
```

Exemplo de erro:

```typescript
{
    number: 4,
    drawingTeam: "yellow",
    result: "wrong",
    points: 0,
    drawingSvg: "..."
}
```

Exemplo de acerto:

```typescript
{
    number: 5,
    drawingTeam: "cyan",
    result: "correct",
    points: 2,
    pointsTeam: "yellow",
    drawingSvg: "..."
}
```

---

# 13. FLUXO CORRETO

O fluxo completo passa a ser:

```text
                  RODADA
                    │
                    ▼
              TIME DESENHA
                    │
                    ▼
              PAPEL FÍSICO
                    │
                    ▼
                 DESENHO
                    │
                    ▼
             TEMPO TERMINOU
                    │
                    ▼
            TODOS ADIVINHAM
                    │
                    ▼
             ORGANIZADOR DECIDE
                    │
              ┌─────┴─────┐
              ▼           ▼
           ACERTO        ERRO
              │           │
              ▼           ▼
       ESCOLHER TIME      0
              │
              ▼
       ESCOLHER PONTOS
          +1 ou +2
              │
              ▼
       CONFIRMAR RESULTADO
              │
              ▼
          SALVAR RODADA
              │
              ▼
       PRÓXIMA RODADA
```

---

# 14. TELA DE ACERTO MAIS SIMPLES

Eu recomendo que seja ainda mais rápida, porque você estará apresentando o jogo ao vivo.

Ao clicar em ACERTO:

```text
               ACERTO!

          QUEM GANHOU?

       🟡 AMARELO    🔵 CIANO


           QUANTOS?

            +1    +2


             CONFIRMAR
```

Idealmente você consegue fazer isso em **dois cliques**:

1. clicar no time;
2. clicar em +1 ou +2;

e então confirmar.

---

# 15. ERRO EM UM CLIQUE

O botão:

```text
❌ ERRO
```

já pode abrir diretamente:

```text
ERRO

0 PONTOS

[ PRÓXIMA RODADA ]
```

Ou até confirmar imediatamente, caso você queira que a dinâmica seja extremamente rápida.

---

# 16. APRESENTAÇÃO FINAL

Na retrospectiva, o site também não precisa mostrar a palavra.

Ele deve mostrar somente:

```text
RODADA 1

🟡 AMARELO

[ DESENHO ]

✓ ACERTO

+2 🔵 CIANO
```

ou:

```text
RODADA 4

🔵 CIANO

[ DESENHO ]

✕ ERRO

+0
```

Não é necessário mostrar:

> "A palavra era celular."

Porque o site nunca precisou armazenar essa informação.

---

# 17. O QUE O SITE REALMENTE PRECISA SABER

Durante uma partida, o site só precisa saber:

### Configuração

```text
Nome do time amarelo
Nome do time ciano
Tempo
```

### Rodada

```text
Número da rodada
Time que está desenhando
Tempo restante
```

### Resultado

```text
Acertou?
Quantos pontos?
Qual time recebeu os pontos?
```

### Histórico

```text
Desenho
Resultado
Pontos
Time que recebeu pontos
```

É só isso.

---

# 18. O QUE O SITE NÃO DEVE SABER

```text
❌ Palavra
❌ Categoria da palavra
❌ Se é tecnologia
❌ Se é TICs
❌ Resposta falada
❌ Quem falou
❌ Quem foi o primeiro
❌ Justificativa
❌ Por que ganhou +1
❌ Por que ganhou +2
```

Tudo isso fica no mundo real.

---

# 19. REGRA DEFINITIVA

A regra de implementação deve ser:

> **O GarTICS não é o juiz. O organizador é o juiz.**

O GarTICS fornece as ferramentas para o organizador registrar rapidamente a decisão.

Isso deixa o sistema:

- mais simples;
- mais rápido;
- mais confiável;
- mais adequado para uma apresentação presencial;
- menos suscetível a erros;
- sem necessidade de banco de palavras;
- sem necessidade de IA;
- sem necessidade de reconhecimento de voz;
- sem necessidade de backend.

---

# 20. ARQUITETURA FINAL

O GarTICS passa a ter apenas quatro responsabilidades principais:

```text
┌─────────────────────────────────────┐
│              GAR TICS               │
├─────────────────────────────────────┤
│                                     │
│  1. GERENCIAR A PARTIDA             │
│                                     │
│  2. FORNECER O QUADRO DE DESENHO    │
│                                     │
│  3. REGISTRAR A DECISÃO DO JUIZ     │
│                                     │
│  4. APRESENTAR O RESULTADO          │
│                                     │
└─────────────────────────────────────┘
```

O jogo presencial cuida de

```text
SORTEIO
PALAVRAS
DESENHISTA
ADIVINHAÇÕES
CLASSIFICAÇÃO TICs
DECISÃO
```

O site cuida de:

```text
TELA
DESENHO
TEMPO
PONTUAÇÃO
HISTÓRICO
ANIMAÇÕES
RESULTADO
```

Essa é a lógica que deve ser usada na implementação final.
