# 0005. Sem analytics no rascunho

- Status: Aceita
- Data: 2026-10-24

## Contexto

O Playbook pede uma decisão sobre analytics na Fase 2. Para o rascunho, o requisito é zero cookies, zero scripts de terceiros e nenhuma requisição a domínio externo ao carregar a página. O rascunho só serve para a proposta e tem `noindex`.

## Alternativas consideradas

### A. Nenhum analytics

- Prós: cumpre todos os requisitos de privacidade e de rede sem exceção.
- Contras: nenhum dado de visitas do preview.

### B. Cloudflare Web Analytics (sem cookies)

- Prós: gratuito e sem cookies.
- Contras: carrega um script de `static.cloudflareinsights.com`, o que quebra o critério "nenhuma requisição externa".

### C. Analytics próprio sem cookies (ex.: contagem no servidor)

- Contras: exige backend, que o site não tem.

## Decisão

Opção A no rascunho. Critério que pesou mais: o critério de aceite de rede e privacidade.

## Consequências

- Positivas: nada a declarar em política de privacidade; nenhum banner de consentimento.
- Negativas / custos assumidos: nenhuma métrica de visitas ou cliques no WhatsApp durante a proposta.
- O que faria esta decisão ser revista: o lançamento. Se a cliente quiser números, avaliar analytics sem script no host de produção e registrar em novo ADR.
