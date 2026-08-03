GAR TICS — ESPECIFICAÇÃO COMPLETA DO PROJETO

1. VISÃO GERAL

O GarTICS é um jogo presencial inspirado na dinâmica de jogos de desenho como Gartic, porém adaptado para uma atividade escolar da disciplina de Tecnologia / TICs.

O jogo será executado em um computador conectado a um projetor. A interface precisa ser visualmente bonita, extremamente clara e adequada para ser vista à distância.

A atividade possui dois times:

🟡 Time Amarelo
🔵 Time Ciano

Os nomes dos times serão definidos pelo organizador antes do início da partida.

A partida terá 10 rodadas, sendo:

5 rodadas para o time amarelo desenhar;
5 rodadas para o time ciano desenhar;
os times se alternam;
a primeira equipe pode ser definida automaticamente como Amarelo.

O site não sorteará as palavras.

As palavras serão impressas previamente em papéis físicos, embaralhadas e sorteadas presencialmente pelo organizador.

O site será responsável por:

configurar a partida;
controlar as rodadas;
indicar qual time está desenhando;
controlar o cronômetro;
disponibilizar o quadro de desenho;
disponibilizar as ferramentas;
congelar o desenho ao fim do tempo;
registrar acerto ou erro;
registrar a classificação TICs;
calcular a pontuação;
guardar os desenhos;
apresentar todos os desenhos no final;
apresentar a pontuação final;
determinar vencedor, perdedor ou empate;
executar a animação final com confetes.

O site será hospedado posteriormente na Vercel e deverá funcionar diretamente pelo navegador, sem instalação.

2. OBJETIVO PEDAGÓGICO

O objetivo não é apenas adivinhar desenhos.

O jogo deve ensinar e testar a diferença entre:

algo que é tecnologia;
algo que é Tecnologia da Informação e Comunicação (TIC);
algo que não é tecnologia.

As palavras físicas serão divididas nesses grupos.

Exemplos:

Exemplo 1

Frente:

CELULAR

Verso:

É tecnologia: SIM
É TICs: SIM

Exemplo 2

Frente:

GELADEIRA

Verso:

É tecnologia: SIM
É TICs: NÃO

Exemplo 3

Frente:

CACHORRO

Verso:

É tecnologia: NÃO
É TICs: NÃO

O jogador que adivinhar deverá também dizer se aquilo é ou não é TICs.

2.5 PRINCÍPIO FUNDAMENTAL: O SITE NÃO JULGA

Este é o princípio arquitetural mais importante do GarTICS:

⚠️ O SITE NÃO É O JUIZ. O ORGANIZADOR É O JUIZ.

Consequências:

✗ O site NÃO sabe qual é a palavra antes do julgamento
✗ O site NÃO armazena as classificações de TICs
✗ O site NÃO tenta validar respostas
✗ O site NÃO usa IA ou reconhecimento
✗ O site NÃO avalia se o desenho está correto

✓ O papel físico é a fonte de verdade (frente/verso)
✓ O organizador lê o papel e conhece a resposta correta
✓ O organizador decide: ACERTO ou ERRO
✓ O organizador escolhe: +1 ou +2 pontos
✓ O site apenas registra a decisão do organizador

Por que? Porque:

1. A atividade é presencial — há um humano (organizador) vendo tudo
2. Acelera o jogo — sem processamento de respostas
3. Simplifica o código — sem banco de palavras, sem IA
4. Evita discussões — o organizador é a autoridade final
5. Mantém a experiência educacional — o objetivo é aprender sobre TICs, não depender de máquinas

6. REGRAS DA PARTIDA
   3.1 Quantidade de rodadas

A partida terá 10 rodadas.

Alternância:

Rodada 1 → Amarelo
Rodada 2 → Ciano
Rodada 3 → Amarelo
Rodada 4 → Ciano
Rodada 5 → Amarelo
Rodada 6 → Ciano
Rodada 7 → Amarelo
Rodada 8 → Ciano
Rodada 9 → Amarelo
Rodada 10 → Ciano

Cada equipe, portanto, terá 5 oportunidades de desenhar.

4. PREPARAÇÃO DOS PAPÉIS

Antes da partida, o organizador terá uma quantidade de papéis físicos.

Na frente do papel estará somente a palavra.

No verso estará a classificação.

Exemplo:

FRENTE:

COMPUTADOR

Verso:

TECNOLOGIA: SIM
TICs: SIM

Outro:

FRENTE:

GELADEIRA

Verso:

TECNOLOGIA: SIM
TICs: NÃO

Outro:

FRENTE:

CACHORRO

Verso:

TECNOLOGIA: NÃO
TICs: NÃO

Os papéis serão embaralhados e sorteados presencialmente.

O site não precisa saber previamente qual é a palavra.

5. INÍCIO DA RODADA

Quando uma rodada começar, o site deverá mostrar claramente:

RODADA 1 / 10

VEZ DO

🟡 TIME AMARELO

ou:

RODADA 2 / 10

VEZ DO

🔵 TIME CIANO

Abaixo:

ESCOLHA UMA PESSOA PARA DESENHAR

O organizador chama uma pessoa.

Essa pessoa recebe o papel físico com a palavra.

Ela lê a palavra sem mostrar aos outros jogadores.

Depois vai ao computador.

O organizador inicia a rodada.

6. CONFIGURAÇÃO INICIAL

Na primeira tela do site deverá existir:

                 GarTICS

       DESENHE. ADIVINHE. APRENDA.

┌───────────────────────────────────┐
│ 🟡 NOME DO TIME AMARELO │
│ │
│ [_______________________________] │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│ 🔵 NOME DO TIME CIANO │
│ │
│ [_______________________________] │
└───────────────────────────────────┘

TEMPO POR RODADA

[ 60 segundos ▼ ]

           [ COMEÇAR JOGO ]

O nome padrão pode ser:

Amarelo
Ciano

Mas os nomes devem ser editáveis.

7. TEMPO

O tempo padrão será de:

60 segundos.

O programador deve deixar o tempo configurável.

Opções sugeridas:

30 segundos;
45 segundos;
60 segundos;
90 segundos;
personalizado.

O cronômetro deve aparecer de maneira extremamente visível.

Exemplo:

01:00

Durante a contagem:

00:59
00:58
00:57
...
00:05
00:04
00:03
00:02
00:01
00:00

Quando chegar a 00:00:

o desenho deve ser congelado;
todas as ferramentas devem ser desativadas;
não deve ser possível modificar o desenho;
o jogador não poderá continuar desenhando;
o site deve entrar na fase de julgamento. 8. FASE DE DESENHO

A tela de desenho será dividida em três áreas principais:

┌──────────────────────────────────────────────────────────────┐
│ CABEÇALHO │
├───────────────┬─────────────────────────────┬────────────────┤
│ │ │ │
│ CORES │ │ FERRAMENTAS │
│ │ │ │
│ │ │ │
│ │ QUADRO BRANCO │ │
│ │ DE DESENHO │ │
│ │ │ │
│ │ │ │
│ │ │ │
│ │ │ │
└───────────────┴─────────────────────────────┴────────────────┘
Esquerda

Controle de cores.

Centro

Canvas/quadro de desenho.

Direita

Ferramentas.

9. CABEÇALHO DURANTE O DESENHO

O topo deve mostrar:

🟡 NOME DO TIME

RODADA 3 / 10

00:47

O time que está desenhando deve possuir destaque visual.

Exemplo:

🟡 AMARELO

ou

🔵 CIANO

Também deve haver uma indicação:

DESENHANDO

10. QUADRO DE DESENHO

O quadro deverá ser inicialmente:

branco;
limpo;
grande;
centralizado;
com proporção adequada ao projetor.

O desenho deverá ser implementado preferencialmente usando SVG.

O quadro não deve depender de uma biblioteca externa pesada de desenho se for possível implementar diretamente.

O SVG deverá permitir:

linhas;
caminhos;
formas;
círculos;
retângulos;
preenchimentos;
transparência;
diferentes tamanhos;
edição através do histórico.

O fundo do desenho deve ser branco.

11. FERRAMENTA DE LÁPIS

O lápis deve desenhar livremente seguindo o movimento do mouse.

Configurações:

Tamanho

Faixa sugerida:

1px → 50px

Interface:

TAMANHO

───────●────────

O tamanho atual deve ser mostrado numericamente.

Exemplo:

12 px
Opacidade

Faixa:

0% → 100%

Exemplo:

OPACIDADE

──────●─────────

72%

O lápis deve respeitar a opacidade selecionada.

12. BORRACHA

A borracha também deve possuir:

tamanho configurável;
opacidade configurável.

Exemplo:

BORRACHA

Tamanho:
──────●──────

Opacidade:
──────●──────

A borracha deverá remover o desenho de forma coerente.

Ela não deve simplesmente pintar de branco por cima se isso causar problemas no SVG.

Preferencialmente utilizar lógica de remoção/mascaramento ou estrutura equivalente.

13. COLOR PICKER

No lado esquerdo deverá existir um seletor de cores.

O usuário deverá poder:

clicar na área de cores;
selecionar matiz;
ajustar a cor;
inserir hexadecimal.

Exemplo:

┌───────────────────┐
│ │
│ COLOR PICKER │
│ │
│ │
└───────────────────┘

HEX

[#00FFFF__________]

Ao digitar:

#FF0000

a cor ativa deve ser vermelho.

14. CONTA-GOTAS

Deve existir uma ferramenta:

👁 Conta-gotas

Ao selecionar o conta-gotas e clicar sobre uma parte do desenho:

capturar a cor daquele ponto;
atualizar a cor atual;
retornar automaticamente para a ferramenta anterior, se possível.

A interface deve mostrar a cor selecionada.

15. FERRAMENTAS DE FORMA

Deverão existir:

Quadrado vazado

Somente contorno.

┌────────┐
│ │
│ │
└────────┘

Não deve preencher o interior.

Círculo vazado

Somente contorno.

Quadrado preenchido

Interior preenchido pela cor selecionada.

Círculo preenchido

Interior preenchido pela cor selecionada.

Linha

O jogador clica no ponto inicial e arrasta até o ponto final.

16. BALDE DE TINTA

Deve existir:

🪣 BALDE

O comportamento esperado:

selecionar o balde;
clicar dentro de uma região;
preencher aquela região com a cor atual.

O preenchimento deve respeitar a cor escolhida.

IMPORTANTE:

Como o desenho será baseado em SVG, o programador deverá implementar uma solução compatível com a estrutura usada.

O balde não pode depender exclusivamente do comportamento nativo de fill de SVG, porque o jogador poderá ter desenhado regiões manualmente.

Uma solução aceitável pode envolver:

análise de regiões;
conversão temporária do desenho para rasterização;
flood fill;
reconstrução do resultado;
ou outra abordagem tecnicamente adequada.

O resultado visual é o que importa.

17. UNDO / REDO

Devem existir dois botões:

↶ DESFAZER

↷ REFAZER

Atalhos:

Ctrl + Z

para desfazer.

Ctrl + Shift + Z

para refazer.

O sistema deverá possuir um histórico das ações.

Exemplo:

Desenho inicial
↓
Linha
↓
Círculo
↓
Quadrado
↓
Borracha

Se o jogador apertar Ctrl+Z:

Borracha

é removida.

Se apertar novamente:

Quadrado

é removido.

Ao realizar uma nova ação depois de um undo, o histórico de redo deverá ser tratado de maneira convencional.

18. ATALHOS DE TECLADO

Implementar:

P = lápis
E = borracha
L = linha
R = retângulo
C = círculo
G = balde
Ctrl+Z = desfazer
Ctrl+Shift+Z = refazer

Os atalhos não devem interferir com campos de texto.

Se o usuário estiver digitando no campo hexadecimal, por exemplo, os atalhos não devem executar ferramentas indevidamente.

19. CURSOR

O cursor do lápis deve ser personalizado.

Idealmente, mostrar um círculo correspondente ao tamanho do pincel.

Por exemplo:

       ◯

Se o pincel for grande, o círculo deve ficar grande.

Se for pequeno, pequeno.

Isso ajuda o jogador a saber exatamente o tamanho que está usando.

20. QUALIDADE DE VIDA

Implementar:

confirmação antes de limpar o desenho;
indicação visual da ferramenta ativa;
indicação da cor atual;
indicação do tamanho atual;
indicação da opacidade;
botão de limpar;
estado desabilitado após o fim do tempo;
atalhos;
cursor personalizado;
animações leves;
feedback visual ao selecionar ferramentas;
prevenção de ações acidentais;
suporte a tela cheia;
interface adaptada para projetor. 21. BOTÃO LIMPAR

Pode existir um botão:

🗑 LIMPAR

Ao clicar:

LIMPAR DESENHO?

Todo o desenho será apagado.

[CANCELAR] [LIMPAR]

O limpar deve entrar no histórico para que seja possível desfazer, se tecnicamente apropriado.

22. FIM DO TEMPO

Quando o cronômetro chegar a zero:

A interface deve mudar.

Mostrar:

             TEMPO ESGOTADO!

                  ✏️

           ÚLTIMA CHANCE!

Todos podem dar uma última resposta.

             [ ACERTO ]

               [ ERRO ]

O desenho permanece visível.

Todas as ferramentas devem ficar desativadas.

23. ADIVINHAÇÃO

As respostas são dadas verbalmente.

Não haverá campo para os participantes digitarem a resposta.

O organizador será o juiz.

Todos podem tentar adivinhar, independentemente do time.

Por exemplo:

Time Amarelo está desenhando.

Uma pessoa do Ciano fala:

"Computador!"

O organizador verifica o papel.

Se estiver correto, o organizador registra o acerto.

⚠️ IMPORTANTE — O SITE NÃO JULGA

O site não deve:

❌ tentar descobrir ou validar a resposta;
❌ saber qual era a palavra;
❌ conhecer previamente a classificação de TICs;
❌ avaliar se o desenho corresponde à palavra;
❌ escutar/ouvir as respostas;
❌ manter banco de palavras digital;
❌ usar IA ou reconhecimento;
❌ tentar impedir decisões do organizador.

O papel físico é a fonte da verdade. O organizador lê o verso e decide o resultado. O site apenas registra a decisão.

24. REGRA DE RESPOSTA

⚠️ CONTEXTO PEDAGÓGICO — Não é responsabilidade do site validar

Essas regras existem para a atividade presencial, não para o site implementar.

O organizador conhece as regras e decide se uma resposta é aceitável.

Exemplos de contexto (para referência, não para código):

Palavra: COMPUTADOR

✓ "Computador!" → ACEITA
✓ "Computadores!" → ACEITA (variação)
? "PC!" → Depende da organização
✗ "Eletrônico!" → NÃO ACEITA
✗ "Máquina!" → NÃO ACEITA
✗ "Notebook!" → NÃO ACEITA (palavra diferente)

O site não validará respostas. Apenas registrará a decisão do organizador: ACERTO ou ERRO.

25. ACERTO

Ao clicar em:

✓ ACERTO

o site deve abrir uma tela rápida para o organizador registrar:

Exemplo:

               ACERTO!

           QUEM GANHOU?

        🟡 AMARELO    🔵 CIANO


           QUANTOS PONTOS?

             +1    +2


             CONFIRMAR

O organizador escolhe:

1️⃣ Qual time acertou (amarelo ou ciano)
2️⃣ Quantos pontos (+1 ou +2)

Depois confirma.

Todas as informações relevantes (palavra, classificação TICs, justificativa) já foram decididas presencialmente pelo organizador ao ver o papel físico.

26. REGRA DE CLASSIFICAÇÃO DE TICs

⚠️ CONTEXTO PEDAGÓGICO — Não é responsabilidade do site validar

O organizador já viu o verso do papel com a classificação correta.

Existem três situações possíveis (para referência):

Situação A: Não é tecnologia
→ Se acertar: +2 pontos

Situação B: É tecnologia, mas NÃO é TICs
→ Se acertar e disse "não é TICs": +2 pontos
→ Se acertar mas disse "é TICs": +1 ponto

Situação C: É tecnologia E é TICs
→ Se acertar e disse "é TICs": +2 pontos
→ Se acertar mas disse "não é TICs": +1 ponto

O organizador transforma essa lógica em uma decisão simples:

+1 ou +2

e registra no site.

27. ATRIBUIÇÃO DE PONTOS

⚠️ REGRA CRÍTICA

Os pontos pertencem ao time da pessoa que acertou,
NÃO necessariamente ao time que estava desenhando.

Exemplo:

🟡 AMARELO está desenhando.

Uma pessoa do 🔵 CIANO adivinha corretamente.

Resultado registrado:

🔵 CIANO +2

(não amarelo)

O site deve permitir que o organizador escolha qualquer time, independentemente de quem estava desenhando.

28. ERRO

Se ninguém acertar ou a resposta não for válida, o organizador clica:

✕ ERRO

O site registra automaticamente:

Resultado: ERRO
Pontos: 0

Nenhum time recebe pontos.

O desenho deve ser salvo mesmo assim para a apresentação final.

Tela do site:

               ERRO

           NINGUÉM ACERTOU

             +0 PONTOS


          [ PRÓXIMA RODADA ]

29. FINAL DA RODADA

Depois de confirmar o resultado:

Mostrar brevemente:

RODADA CONCLUÍDA

🟡 AMARELOS 4 pontos
🔵 CIANOS 6 pontos

+2 🔵 CIANOS

Depois:

[ PRÓXIMA RODADA ]

Se ainda houver rodadas.

30. NÃO MOSTRAR O PLACAR DURANTE O JOGO

Durante a partida, evitar mostrar claramente a pontuação total.

O objetivo é guardar o suspense.

Pode ser mostrado:

RODADA 4 / 10

e o time atual.

Mas a pontuação total só deve ser revelada na apresentação final.

O site deve internamente registrar os pontos normalmente.

31. REGISTRO DE CADA RODADA

Cada rodada deverá guardar apenas os dados que o site precisa:

roundNumber → número da rodada
drawingTeam → time que desenhou
result → "correct" ou "wrong"
points → 0, 1 ou 2
pointsTeam → "yellow" ou "cyan" (quem recebeu os pontos)
drawingSvg → representação visual do desenho

Exemplo de ACERTO:

{
round: 3,
drawingTeam: "yellow",
result: "correct",
points: 2,
pointsTeam: "cyan",
drawingSvg: "..."
}

Exemplo de ERRO:

{
round: 4,
drawingTeam: "cyan",
result: "wrong",
points: 0,
pointsTeam: null,
drawingSvg: "..."
}

⚠️ O site NÃO armazena:
❌ palavra
❌ classificação de TICs
❌ resposta falada
❌ justificativa

Essas informações ficam no papel físico e na memória presencial da atividade.

A palavra pode ficar armazenada apenas para fins de registro/apresentação, mas não precisa ser conhecida antes do julgamento.

32. SALVAR O DESENHO

O desenho final de cada rodada precisa ser armazenado.

O sistema deve guardar uma representação visual do desenho.

Idealmente:

SVG;
ou imagem rasterizada derivada do SVG.

Isso será usado na apresentação final.

Não é necessário banco de dados.

O armazenamento pode ser feito apenas em memória durante a partida.

Opcionalmente, usar localStorage para tolerar pequenos recarregamentos, mas isso não é obrigatório na primeira versão.

33. PRÓXIMA RODADA

Depois do resultado:

RODADA 3 CONCLUÍDA

[ PRÓXIMA RODADA ]

Ao clicar:

RODADA 4 / 10

VEZ DO

🔵 TIME CIANO

O desenho deve ser completamente limpo para a nova rodada.

34. FINAL DAS 10 RODADAS

Após a rodada 10, não mostrar imediatamente o vencedor.

Primeiro iniciar uma apresentação.

Tela:

             FIM DE JOGO

          PREPARANDO RESULTADO...

Pequena animação.

Depois começar a retrospectiva.

35. APRESENTAÇÃO DOS DESENHOS

Cada desenho deve ser mostrado individualmente.

Exemplo:

╔══════════════════════════════╗
║ RODADA 1 ║
║ ║
║ 🟡 AMARELO ║
║ ║
║ ┌──────────────┐ ║
║ │ │ ║
║ │ DESENHO │ ║
║ │ │ ║
║ └──────────────┘ ║
║ ║
║ ✓ ACERTO ║
║ ║
║ +2 ║
╚══════════════════════════════╝

Depois de alguns segundos, transicionar para a rodada seguinte.

Pode haver animação de:

fade;
slide;
zoom;
escala;
aparecimento do desenho.

Não exagerar.

A apresentação deve parecer uma retrospectiva.

36. RESULTADO DE CADA DESENHO

Mostrar:

número da rodada;
time que desenhou;
desenho;
resultado;
pontos;
opcionalmente quem acertou.

Exemplo:

RODADA 6

🔵 CIANO

[ DESENHO ]

✓ ACERTO

🟡 AMARELO ACERTOU

+2

Ou:

RODADA 7

🟡 AMARELO

[ DESENHO ]

✗ NINGUÉM ACERTOU

+0 37. PLACAR FINAL

Depois de mostrar as 10 rodadas:

Tela:

             PLACAR FINAL

        🟡 AMARELO    8

        🔵 CIANO      7

Fazer uma animação de contagem dos pontos.

Exemplo:

0
1
2
3
4
5
6
7
8

Depois revelar o vencedor.

38. VITÓRIA

Se Amarelo tiver mais pontos:

                 🏆

          AMARELO VENCEU!

              8 × 7

        PARABÉNS, AMARELO!

Executar confetes.

39. VITÓRIA DO CIANO
    🏆

           CIANO VENCEU!

              9 × 6

          PARABÉNS, CIANO!

Executar confetes.

40. EMPATE

Se:

Amarelo = Ciano

mostrar:

                 🤝

               EMPATE!

              8 × 8

       OS DOIS TIMES VENCERAM!

Também pode executar confetes.

41. BOTÕES FINAIS

Após o resultado:

[ JOGAR NOVAMENTE ]

[ VOLTAR AO INÍCIO ]
Jogar novamente

Mantém os nomes dos times e reinicia a partida.

Voltar ao início

Retorna para a configuração inicial.

42. MODO TELA CHEIA

O site deverá possuir suporte para:

[ ⛶ TELA CHEIA ]

Idealmente, ao iniciar a partida, oferecer:

"Deseja entrar em tela cheia?"

O modo de jogo deve ocupar todo o espaço disponível.

A interface precisa funcionar bem em:

monitor;
notebook;
projetor;
tela 16:9.

A prioridade é 16:9.

43. RESPONSIVIDADE

Não é necessário otimizar inicialmente para celular.

O principal alvo é:

computador conectado ao projetor.

Prioridade:

Desktop;
Notebook;
Tela 16:9;
projetor.

Celular pode ter suporte básico, mas não é prioridade.

44. DESIGN

Identidade visual:

amarelo;
ciano;
branco;
preto/cinza escuro.

Evitar uma aparência infantil demais.

O projeto deve parecer:

um jogo tecnológico escolar moderno.

Nome:

GarTICS

Subtítulo opcional:

DESENHE. ADIVINHE. ENTENDA A TECNOLOGIA.

45. TIPOGRAFIA

Usar uma fonte moderna e altamente legível.

Exemplos possíveis:

Inter;
Poppins;
Nunito Sans;
similar.

O texto precisa ser grande porque será exibido em projetor.

46. ANIMAÇÕES

Usar animações principalmente em:

troca de telas;
início da rodada;
cronômetro;
acerto;
erro;
mudança de rodada;
apresentação final;
placar;
vencedor;
confetes.

Evitar animações que atrapalhem o desenho.

Durante o desenho, a prioridade é desempenho.

47. CRONÔMETRO

O cronômetro deve ser baseado em tempo real e não simplesmente decrementado de forma ingênua a cada setInterval.

Usar uma lógica baseada em timestamp para evitar problemas caso o navegador atrase um frame.

Conceitualmente:

endTime = currentTime + duration
remaining = endTime - currentTime

Assim, se o navegador atrasar, o cronômetro continua correto.

Quando:

remaining <= 0

mudar para:

TIME_UP 48. ESTADOS DO JOGO

Implementar uma máquina de estados clara.

Estados sugeridos:

LOBBY
SETUP
ROUND_INTRO
DRAWING
TIME_UP
JUDGING
ROUND_RESULT
FINAL_REVIEW
FINAL_SCORE
WINNER

Fluxo:

LOBBY
↓
SETUP
↓
ROUND_INTRO
↓
DRAWING
↓
TIME_UP
↓
JUDGING
↓
ROUND_RESULT
↓
ROUND_INTRO
↓
...
↓
FINAL_REVIEW
↓
FINAL_SCORE
↓
WINNER

Isso deve evitar que diferentes telas tentem controlar o jogo simultaneamente.

49. MODELO DE DADOS

⚠️ SIMPLIFICADO CONFORME ARQUITETURA DE JULGAMENTO

Estrutura conceitual:

type Team = {
id: "yellow" | "cyan";
name: string;
score: number;
};

type RoundResult =
| "correct"
| "wrong";

type Round = {
number: number;
drawingTeam: "yellow" | "cyan";

result: RoundResult;
points: 0 | 1 | 2;
pointsTeam?: "yellow" | "cyan"; // se result === "wrong", não precisa

drawingSvg: string; // SVG do desenho final
};

Estado geral:

type GameState = {
yellowTeam: Team;
cyanTeam: Team;

currentRound: number;
totalRounds: number;
timePerRound: number;

phase:
| "setup"
| "roundIntro"
| "drawing"
| "timeUp"
| "judging"
| "roundResult"
| "finalReview"
| "finalScore"
| "winner";

rounds: Round[];
}; 50. REGRAS DE ALTERNÂNCIA

O time deve ser determinado automaticamente:

round % 2 === 1 → yellow
round % 2 === 0 → cyan

Assim:

1 → yellow
2 → cyan
3 → yellow
4 → cyan
5 → yellow
6 → cyan
7 → yellow
8 → cyan
9 → yellow
10 → cyan 51. CÁLCULO DE PONTOS

⚠️ O SITE NÃO CALCULA — O ORGANIZADOR DECIDE

O site recebe do organizador:

- points: 0, 1 ou 2
- pointsTeam: "yellow" ou "cyan"

O site simplesmente soma:

if result === "wrong":
points = 0
// nenhum time recebe

else if result === "correct":
points = 1 ou 2 // decidido pelo organizador
pointsTeam += points // atualizar placar

O organizador já conhece a lógica de TICs. O site apenas registra a decisão do organizador, sem questioná-la.

O time que recebe os pontos é:

pointsTeam

e não:

drawingTeam

52. EXEMPLO DE RODADA COMPLETA

Suponha:

RODADA 3

🟡 AMARELO desenha.

O organizador sorteia o papel (presencialmente):

┌──────────────┐
│ CELULAR │ ← O jogador vê só o anverso
└──────────────┘

Verso (só o organizador vê):
TECNOLOGIA: SIM
TICs: SIM

O jogador desenha.

Timer: 60 → 59 → 58 → ... → 00

Uma pessoa do 🔵 CIANO grita:

"CELULAR!"

O organizador olha o papel e confirma. Clica na tela:

✓ ACERTO

Escolhe:

🔵 CIANO (quem acertou)

Depois:

+2 (porque classificação estava correta)

Clica:

CONFIRMAR

O site registra:

{
round: 3,
drawingTeam: "yellow",
result: "correct",
points: 2,
pointsTeam: "cyan",
drawingSvg: "..."
}

🔵 CIANO recebe +2 pontos.

O site NÃO armazena a palavra "CELULAR" ou as classificações de TICs.

Essas informações ficam no papel físico.

53. EXEMPLO DE ERRO NA CLASSIFICAÇÃO

Suponha:

RODADA 7

🔵 CIANO desenha.

Papel:

Verso:
GELADEIRA
TECNOLOGIA: SIM
TICs: NÃO

Uma pessoa do 🟡 AMARELO grita:

"Geladeira!"

Correto!

Mas ela também diz:

"É TICs!"

Incorreto! O papel diz "NÃO é TICs".

O organizador confirma:

✓ ACERTO (acertaram a palavra)

Escolhe:

🟡 AMARELO

Depois:

+1 (porque errou a classificação de TICs)

O site registra:

{
round: 7,
drawingTeam: "cyan",
result: "correct",
points: 1,
pointsTeam: "yellow",
drawingSvg: "..."
}

🟡 AMARELO recebe +1 ponto.

O organizador conhecia a lógica. O site apenas registrou a decisão.

54. FLUXO RÁPIDO DE JULGAMENTO

O julgamento deve ser extremamente rápido, pois o jogo está ao vivo.

Idealmente, o organizador consegue registrar um resultado em não mais que 3-4 cliques:

1. Clicar em ACERTO ou ERRO
2. (Se acerto) Clicar no time que acertou
3. (Se acerto) Clicar em +1 ou +2
4. Clicar em CONFIRMAR

Tela de confirmação (opcional se o organizador quiser validar antes):

CONFIRMAR RESULTADO

Time que desenhou: 🟡 Amarelo
Resultado: ✓ Acerto
Pontos: +2 para 🔵 Ciano

[ VOLTAR ] [ CONFIRMAR ]

55. NÃO PERMITIR ERRO HUMANO

Antes de confirmar o resultado, mostrar resumo:

CONFIRMAR RESULTADO

Time que desenhou:
🟡 Amarelo

Time que acertou:
🔵 Ciano

Resultado:
✓ Acerto

Pontuação:
+2 para Ciano

[ VOLTAR ]

[ CONFIRMAR ]

Isso evita que o organizador clique errado.

56. PROTEÇÃO CONTRA VOLTAR

Durante a partida, se o navegador tentar voltar:

O ideal é impedir ou avisar:

A partida está em andamento. Tem certeza que deseja sair?

Isso evita perder o jogo acidentalmente.

57. RECARREGAMENTO DA PÁGINA

Primeira versão:

Se a página for recarregada, a partida pode ser perdida.

Versão melhor:

Salvar o estado no localStorage.

Isso permitirá recuperar:

nomes;
rodada;
pontuação;
desenhos;
configurações.

Porém, isso deve ser feito cuidadosamente para não salvar dados excessivos.

58. PERFORMANCE

O projeto será usado ao vivo.

Portanto:

evitar re-renderizações desnecessárias do SVG;
não recriar o SVG inteiro a cada movimento do mouse se isso causar travamento;
otimizar histórico;
limitar quantidade de pontos gerados pelo lápis;
usar simplificação de paths se necessário;
manter animações leves;
não utilizar bibliotecas gigantes sem necessidade.

O desenho precisa parecer instantâneo.

59. SVG

O desenho deverá preferencialmente ser representado como uma árvore de elementos:

<svg>
    <path />
    <path />
    <circle />
    <rect />
    <line />
    ...
</svg>

Cada operação deve gerar uma entidade identificável.

Isso facilitará:

undo;
redo;
salvar;
exportar;
replay;
renderização final. 60. HISTÓRICO DO DESENHO

O histórico pode funcionar como snapshots ou comandos.

Primeira implementação simples:

history = [
estadoInicial,
estadoDepoisDaLinha,
estadoDepoisDoCirculo,
estadoDepoisDoQuadrado
]

Undo:

currentIndex--

Redo:

currentIndex++

Se o desempenho ficar ruim, migrar para command history.

61. EXPORTAÇÃO DO DESENHO

Ao finalizar uma rodada, gerar uma representação que possa ser usada posteriormente na apresentação.

Idealmente guardar:

SVG string

Também pode gerar:

PNG

para simplificar a apresentação final.

O SVG original deve ser preservado se possível.

62. TELAS PRINCIPAIS

O sistema deverá possuir aproximadamente estas telas:

Tela 1
HOME
Tela 2
CONFIGURAÇÃO
Tela 3
INTRO DA RODADA
Tela 4
DESENHO
Tela 5
TEMPO ESGOTADO
Tela 6
JULGAMENTO
Tela 7
RESULTADO DA RODADA
Tela 8
RETROSPECTIVA FINAL
Tela 9
PLACAR FINAL
Tela 10
VENCEDOR 63. COMPONENTES

Sugestão de componentes React:

App
│
├── HomeScreen
│
├── SetupScreen
│
├── RoundIntro
│
├── GameHeader
│
├── DrawingScreen
│ ├── ColorPanel
│ ├── DrawingCanvas
│ └── ToolsPanel
│
├── Timer
│
├── TimeUpScreen
│
├── JudgingScreen
│
├── RoundResult
│
├── FinalReview
│ └── DrawingReviewCard
│
├── FinalScore
│
└── WinnerScreen 64. COMPONENTES DE DESENHO

Separar as ferramentas logicamente:

DrawingCanvas
PencilTool
EraserTool
LineTool
RectangleTool
CircleTool
FilledRectangleTool
FilledCircleTool
BucketTool
EyedropperTool
DrawingHistory
ColorPicker
BrushSettings

Não necessariamente cada um precisa ser um componente React independente.

A separação pode ser por módulos/classes/hooks.

65. GERENCIAMENTO DE ESTADO

Usar uma arquitetura centralizada.

Pode ser:

React Context + reducer;
Zustand;
Redux Toolkit;
ou solução equivalente.

Para este projeto, uma solução simples como:

React Context + useReducer

é suficiente.

O estado da partida deve ser separado do estado temporário do desenho.

66. ESTRUTURA DE PASTAS SUGERIDA
    src/
    │
    ├── app/
    │ ├── App.tsx
    │ └── routes.ts
    │
    ├── components/
    │ ├── Button/
    │ ├── Modal/
    │ ├── Timer/
    │ ├── TeamBadge/
    │ └── ...
    │
    ├── game/
    │ ├── gameReducer.ts
    │ ├── gameTypes.ts
    │ ├── gameActions.ts
    │ ├── scoring.ts
    │ ├── roundManager.ts
    │ └── gameStorage.ts
    │
    ├── drawing/
    │ ├── DrawingCanvas.tsx
    │ ├── drawingTypes.ts
    │ ├── drawingHistory.ts
    │ ├── tools/
    │ │ ├── pencil.ts
    │ │ ├── eraser.ts
    │ │ ├── line.ts
    │ │ ├── rectangle.ts
    │ │ ├── circle.ts
    │ │ ├── bucket.ts
    │ │ └── eyedropper.ts
    │ └── svgUtils.ts
    │
    ├── screens/
    │ ├── HomeScreen.tsx
    │ ├── SetupScreen.tsx
    │ ├── RoundIntro.tsx
    │ ├── DrawingScreen.tsx
    │ ├── JudgingScreen.tsx
    │ ├── RoundResult.tsx
    │ ├── FinalReview.tsx
    │ ├── FinalScore.tsx
    │ └── WinnerScreen.tsx
    │
    ├── styles/
    │
    └── utils/
67. TECNOLOGIAS

Stack recomendada:

React
TypeScript
Vite
CSS / CSS Modules ou Tailwind
SVG

Hospedagem:

Vercel

Repositório:

GitHub

Não é necessário backend para a primeira versão.

Não é necessário banco de dados.

Não é necessário login.

Não é necessário sistema de contas.

Não é necessário multiplayer online.

O jogo inteiro acontece em um único computador.

68. REQUISITOS FUNCIONAIS

O sistema deve:

RF01

Permitir inserir o nome do time amarelo.

RF02

Permitir inserir o nome do time ciano.

RF03

Permitir configurar o tempo.

RF04

Iniciar uma partida.

RF05

Criar 10 rodadas.

RF06

Alternar automaticamente os times.

RF07

Mostrar o time atual.

RF08

Mostrar o número da rodada.

RF09

Iniciar cronômetro.

RF10

Permitir desenhar.

RF11

Permitir alterar cor.

RF12

Permitir hexadecimal.

RF13

Permitir conta-gotas.

RF14

Permitir lápis.

RF15

Permitir borracha.

RF16

Permitir linha.

RF17

Permitir quadrado vazado.

RF18

Permitir círculo vazado.

RF19

Permitir quadrado preenchido.

RF20

Permitir círculo preenchido.

RF21

Permitir balde.

RF22

Permitir alterar tamanho.

RF23

Permitir alterar opacidade.

RF24

Permitir undo.

RF25

Permitir redo.

RF26

Suportar Ctrl+Z.

RF27

Suportar Ctrl+Shift+Z.

RF28

Congelar desenho no fim do tempo.

RF29

Permitir registrar acerto.

RF30

Permitir registrar erro.

RF31

Permitir selecionar time que acertou.

RF32

Permitir registrar classificação.

RF33

Calcular pontos.

RF34

Guardar desenho.

RF35

Guardar resultado.

RF36

Mostrar retrospectiva.

RF37

Calcular vencedor.

RF38

Mostrar empate.

RF39

Mostrar confetes.

RF40

Permitir iniciar nova partida.

69. REQUISITOS NÃO FUNCIONAIS
    RNF01 — Desempenho

O desenho deve responder ao mouse sem atraso perceptível.

RNF02 — Usabilidade

Uma pessoa que nunca utilizou o site deve conseguir entender as ferramentas rapidamente.

RNF03 — Projetor

Textos e controles devem ser grandes e legíveis.

RNF04 — Visual

A interface deve parecer um jogo acabado, não uma ferramenta de desenvolvimento.

RNF05 — Estabilidade

Uma partida completa de 10 rodadas não pode apresentar degradação significativa de desempenho.

RNF06 — Navegador

Priorizar Chrome/Chromium.

RNF07 — Hospedagem

O projeto deve funcionar corretamente na Vercel.

RNF08 — Offline parcial

Depois de carregado, o jogo não deve depender de chamadas constantes à internet.

70. O QUE NÃO FAZER

Não criar:

❌ login;
❌ cadastro;
❌ banco de usuários;
❌ chat;
❌ multiplayer online;
❌ sistema de ranking;
❌ votação automática;
❌ reconhecimento de voz;
❌ IA para reconhecer o desenho;
❌ sorteio digital das palavras;
❌ sistema de contas;
❌ banco de palavras;
❌ validação automática de respostas;
❌ armazenamento de word/classificação de TICs;
❌ tentativa de julgar o acerto/erro;
❌ campos para digitar a palavra antes do julgamento;
❌ campos para digitar a classificação de TICs;
❌ reconhecimento do desenho.

Essas coisas não fazem parte da primeira versão.

O objetivo é manter o projeto focado e deixar o julgamento com o organizador.

71. NÃO USAR IA PARA JULGAR

A resposta será julgada presencialmente.

O site não deve tentar descobrir se o desenho corresponde à palavra.

O organizador é o árbitro.

Isso é proposital.

72. NÃO USAR MICROFONE

As respostas são dadas oralmente.

O site não precisa ouvir ninguém.

O organizador simplesmente registra:

ACERTO

ou:

ERRO

Isso torna a dinâmica muito mais confiável.

73. SEGURANÇA DA RESPOSTA

O jogador não deve conseguir acessar informações sobre a palavra através do site.

Como a palavra nem sequer é enviada ao site antes da rodada, isso naturalmente fica resolvido.

O site conhece somente o que o organizador registrar depois.

74. EXPERIÊNCIA DO USUÁRIO

A experiência deve ser:

1. Abrir GarTICS
2. Colocar nomes
3. Começar
4. Site mostra time
5. Organizador chama desenhista
6. Papel é sorteado
7. Jogador vê palavra
8. Jogador desenha
9. Todos tentam adivinhar
10. Organizador registra resultado
11. Próxima rodada
12. Repetir 10 vezes
13. Retrospectiva
14. Placar
15. Campeão
16. Confetes

O usuário não deve precisar entender programação ou configurações complexas.

75. BOTÕES

Os botões principais devem ser visualmente distintos.

Ações positivas:

ACERTO
CONFIRMAR
COMEÇAR
PRÓXIMA RODADA
JOGAR NOVAMENTE

Ações negativas:

ERRO
CANCELAR
LIMPAR 76. ACERTO E ERRO

O botão de ACERTO deve ser visualmente verde.

O botão de ERRO deve ser visualmente vermelho.

Não depender somente da cor.

Usar também:

✓ ACERTO
✗ ERRO

Isso melhora acessibilidade.

77. CORES DOS TIMES

O amarelo e ciano são elementos centrais.

O site deve utilizar:

Amarelo → #FFD000 ou similar
Ciano → #00D9FF ou similar

Mas não deixar as cores ocuparem a interface inteira.

Usar principalmente em:

badges;
bordas;
destaques;
placar;
cabeçalho;
indicadores. 78. SOM

Som é opcional.

Se implementado, pode haver:

som ao iniciar rodada;
som de contagem final;
som de acerto;
som de erro;
som de vitória.

Deve existir uma opção:

🔊 SOM

para ativar/desativar.

O jogo deve funcionar perfeitamente sem som.

79. CONTAGEM FINAL

Antes de mostrar o vencedor:

RESULTADO FINAL

3...
2...
1...

Depois revelar os placares.

Isso cria suspense.

80. CONFETES

Na tela final do vencedor:

confetes;
animação;
destaque do time;
placar grande.

O efeito deve terminar naturalmente.

Não deixar confetes atrapalhando a leitura.

81. EMPATE

O empate é um resultado válido.

Não criar vencedor artificial.

Exemplo:

🟡 10
🔵 10

EMPATE! 82. ACESSIBILIDADE

Implementar pelo menos:

contraste adequado;
textos grandes;
foco de teclado;
botões com aria-label;
ferramentas com nomes acessíveis;
não depender exclusivamente de cor;
estados disabled claros. 83. RESPONSABILIDADE DO ORGANIZADOR

O organizador controla:

sorteio;
quem desenha;
início da rodada;
confirmação de respostas;
classificação;
acerto/erro.

O site controla:

tempo;
ferramentas;
desenho;
histórico;
pontuação;
rodadas;
apresentação. 84. REGRA DE OURO DO JOGO

O site nunca deve atrapalhar a dinâmica presencial.

Se houver conflito entre uma animação e a possibilidade de jogar:

a jogabilidade vence.

O desenho precisa ser prioridade.

85. CRITÉRIOS DE ACEITAÇÃO

O projeto será considerado funcional quando for possível fazer uma partida completa:

Teste 1

Abrir o site.

Teste 2

Inserir:

Amarelos
Cianos
Teste 3

Começar partida.

Teste 4

Ver:

Rodada 1/10
Amarelos
Teste 5

Desenhar usando lápis.

Teste 6

Alterar cor.

Teste 7

Alterar tamanho.

Teste 8

Alterar opacidade.

Teste 9

Usar borracha.

Teste 10

Usar formas.

Teste 11

Usar linha.

Teste 12

Usar conta-gotas.

Teste 13

Usar balde.

Teste 14

Usar Ctrl+Z.

Teste 15

Usar Ctrl+Shift+Z.

Teste 16

Esperar o cronômetro chegar a zero.

Teste 17

Confirmar que o desenho está bloqueado.

Teste 18

Registrar ACERTO.

Teste 19

Selecionar time adversário.

Teste 20

Selecionar classificação correta.

Teste 21

Verificar +2.

Teste 22

Testar classificação errada.

Teste 23

Verificar +1.

Teste 24

Testar ERRO.

Teste 25

Verificar 0.

Teste 26

Completar 10 rodadas.

Teste 27

Verificar que existem 5 rodadas para cada time.

Teste 28

Verificar retrospectiva dos 10 desenhos.

Teste 29

Verificar placar final.

Teste 30

Verificar vitória.

Teste 31

Verificar derrota.

Teste 32

Verificar empate.

Teste 33

Verificar confetes.

Teste 34

Voltar para nova partida.

86. PRIORIDADE DE DESENVOLVIMENTO

Não tentar implementar tudo simultaneamente.

Prioridade:

PRIORIDADE 1 — Jogo básico
setup;
times;
rodadas;
timer;
estados;
pontuação.
PRIORIDADE 2 — Canvas
SVG;
lápis;
borracha;
cores;
tamanho;
opacidade.
PRIORIDADE 3 — Ferramentas
linha;
quadrado;
círculo;
preenchidos;
vazados;
conta-gotas;
balde.
PRIORIDADE 4 — Histórico
undo;
redo;
atalhos.
PRIORIDADE 5 — Julgamento
acerto;
erro;
classificação;
pontuação.
PRIORIDADE 6 — Apresentação
retrospectiva;
placar;
vencedor;
empate;
confetes.
PRIORIDADE 7 — Polimento
animações;
sons;
fullscreen;
acessibilidade;
responsividade;
persistência;
performance. 87. MVP

Se houver pouco tempo para desenvolver, a versão mínima funcional deve ter:

✓ Times
✓ 10 rodadas
✓ Timer
✓ SVG
✓ Lápis
✓ Borracha
✓ Cores
✓ Tamanho
✓ Opacidade
✓ Undo
✓ Redo
✓ Acerto
✓ Erro
✓ Pontuação
✓ Retrospectiva
✓ Resultado final

As ferramentas mais complexas, especialmente o balde, podem ser refinadas posteriormente.

88. VERSÃO FINAL IDEAL

A versão final deverá entregar:

GAR TICS

✓ Interface profissional
✓ Identidade visual
✓ Configuração
✓ 2 times
✓ 10 rodadas
✓ Timer configurável
✓ SVG
✓ Lápis
✓ Borracha
✓ Linha
✓ Quadrado
✓ Círculo
✓ Formas vazadas
✓ Formas preenchidas
✓ Balde
✓ Conta-gotas
✓ Color picker
✓ Hexadecimal
✓ Opacidade
✓ Tamanho
✓ Undo
✓ Redo
✓ Atalhos
✓ Cursor inteligente
✓ Fim automático
✓ Julgamento
✓ Sistema de TICs
✓ Pontuação
✓ Histórico
✓ Retrospectiva
✓ Placar
✓ Vitória
✓ Derrota
✓ Empate
✓ Confetes
✓ Tela cheia
✓ Vercel 89. RESUMO DA ARQUITETURA

O projeto deve ser pensado como três sistemas principais:

SISTEMA 1 — GAME ENGINE

Responsável por:

rodada
time
timer
pontuação
estado
resultados
SISTEMA 2 — DRAWING ENGINE

Responsável por:

SVG
lápis
borracha
formas
cores
opacidade
tamanho
balde
conta-gotas
undo
redo
SISTEMA 3 — PRESENTATION ENGINE

Responsável por:

transições
retrospectiva
placar
vitória
empate
confetes

Esses três sistemas devem ser relativamente independentes.

90. FLUXO COMPLETO FINAL
    GAR TICS
    │
    ▼
    TELA INICIAL
    │
    ▼
    ESCOLHER TIMES
    │
    ▼
    CONFIGURAR TEMPO
    │
    ▼
    COMEÇAR JOGO
    │
    ▼
    ┌──────────────┐
    │ RODADA 1 │
    │ AMARELO │
    └──────┬───────┘
    │
    ▼
    SORTEAR PAPEL
    FISICAMENTE
    │
    ▼
    DESENHAR
    │
    ▼
    TODOS ADIVINHAM
    │
    ▼
    ┌─────┴─────┐
    │ │
    ACERTO ERRO
    │ │
    ▼ ▼
    CLASSIFICAR 0
    │
    ▼
    1 ou 2
    │
    └──────┐
    ▼
    SALVAR DESENHO
    │
    ▼
    PRÓXIMA RODADA
    │
    ▼
    ... RODADAS 2-10
    │
    ▼
    FIM DA PARTIDA
    │
    ▼
    RETROSPECTIVA 1-10
    │
    ▼
    PLACAR FINAL
    │
    ┌──────────┼──────────┐
    ▼ ▼ ▼
    AMARELO EMPATE CIANO
    VENCE EMPATE VENCE
    │ │ │
    └──────────┼──────────┘
    ▼
    CONFETES
    │
    ▼
    JOGAR NOVAMENTE
91. RESULTADO ESPERADO

O GarTICS deve parecer um jogo de verdade, e não uma aplicação administrativa.

A pessoa olhando para o projetor deve imediatamente entender:

"Tem dois times, alguém está desenhando, existe um tempo, todos precisam descobrir o que é, e depois ainda precisam saber se aquilo é TICs."

O computador é o mediador visual e matemático da brincadeira.

Os papéis físicos são o sistema de sorteio e conteúdo.

O organizador é o árbitro.

Os jogadores são os participantes.

E a apresentação final transforma tudo o que aconteceu nas 10 rodadas em uma conclusão visual da atividade.

92. FRASE PRINCIPAL DO PROJETO

A identidade do projeto pode utilizar:

GarTICS — Desenhe. Adivinhe. Classifique.

ou:

GarTICS — Desenhe. Adivinhe. Entenda a Tecnologia.

A segunda opção é a mais adequada para apresentar o projeto como atividade escolar
