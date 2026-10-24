# 0002. JavaScript só para o status "Open now / Closed now"

- Status: Aceita
- Data: 2026-10-24

## Contexto

A página é estática. Duas informações dependem do momento da visita e não podem ser calculadas no build: se o salão está aberto agora e qual é o dia de hoje na tabela de horários. O horário vale no fuso `Europe/London`, mas a visitante pode estar com o celular em outro fuso. Os preços são 37 itens em 6 grupos e, no celular, precisam de blocos que abrem e fecham.

## Alternativas consideradas

### A. Nenhum JavaScript

- Prós: nada a manter; nada a falhar.
- Contras: sem status de aberto/fechado e sem destaque do dia de hoje, que são o que a visitante procura ao decidir se manda mensagem agora ou vai até o salão.

### B. Um script pequeno, sem dependências, como progressive enhancement

- Prós: menos de 1 KB; usa `Intl.DateTimeFormat` com `timeZone: 'Europe/London'`, que acerta o fuso e o horário de verão sem biblioteca; lê os horários de atributos `data-*` gerados do mesmo JSON, então não duplica dados; sem JS, a tabela completa continua visível e só o status some.
- Contras: depende do relógio do aparelho; se o relógio estiver errado, o status também estará.

### C. Componente interativo (ilha com framework de UI)

- Prós: padrão conhecido se a página crescer.
- Contras: dezenas de KB de runtime para uma linha de texto.

## Decisão

Opção B: um único script local, carregado sem bloquear a renderização, só para o status e o destaque do dia. Os grupos de preço usam `<details>`/`<summary>` nativos, sem JS.

## Consequências

- Positivas: página utilizável sem JS; nenhuma dependência; nada carregado de fora.
- Negativas / custos assumidos: `<details>` não abre todos os grupos automaticamente no desktop, porque o estado inicial é o mesmo em qualquer largura (só "Braids" começa aberto); o status depende do relógio do aparelho.
- O que faria esta decisão ser revista: agendamento online, filtro de estilos ou outra interação real na página.
