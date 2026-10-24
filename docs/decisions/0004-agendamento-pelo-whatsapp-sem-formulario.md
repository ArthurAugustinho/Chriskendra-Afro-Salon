# 0004. Agendamento pelo WhatsApp, sem formulário

- Status: Aceita
- Data: 2026-10-24

## Contexto

O salão já agenda pelo WhatsApp (07534 857950) e não tem agendamento online. O objetivo único da página é a cliente mandar mensagem para agendar; ligar é secundário. O site não deve usar cookies nem scripts de terceiros (UK GDPR/PECR).

## Alternativas consideradas

### A. Links `wa.me` com mensagem pré-preenchida e link `tel:`

- Prós: segue o hábito atual do salão; nenhum backend; o site não coleta nem guarda dado pessoal, então não precisa de política para formulário; a mensagem já chega dizendo o que a cliente quer (agendar, perguntar um preço, mandar a foto de um estilo).
- Contras: depende do WhatsApp instalado ou do WhatsApp Web; não há registro de quantas mensagens vieram do site.

### B. Formulário de contato seguindo a receita "Formulário de contato seguro" do Devkit

- Prós: funciona sem WhatsApp.
- Contras: exige backend, serviço de e-mail e anti-spam; passa a tratar dados pessoais e pede política de privacidade; a dona não agenda por e-mail.

### C. Widget de agendamento de terceiros

- Contras: o salão não usa agendamento online; carregaria script e cookies de terceiros.

## Decisão

Opção A. Todos os botões de ação levam a `https://wa.me/447534857950?text=<mensagem codificada>` ou a `tel:+447534857950`, com as mensagens de `suggestedCopy` no `content.json`. Nenhuma receita do Devkit se aplica, porque a única existente é a de formulário.

## Consequências

- Positivas: zero backend e zero dado pessoal no site; o contato chega no canal que a dona já usa.
- Negativas / custos assumidos: sem medição de conversão; quem não tem WhatsApp precisa ligar.
- O que faria esta decisão ser revista: a dona adotar agendamento online ou pedir para receber pedidos por e-mail.
