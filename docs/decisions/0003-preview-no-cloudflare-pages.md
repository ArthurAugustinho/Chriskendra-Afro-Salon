# 0003. Preview no Cloudflare Pages, na conta do desenvolvedor

- Status: Aceita (somente para o preview da proposta)
- Data: 2026-10-24

## Contexto

O rascunho precisa de uma URL para acompanhar a proposta. A cliente ainda não aceitou, então não existe conta no nome dela (padrão do Devkit: uma conta por cliente). O site é estático, sem funções de servidor. O preview precisa de cabeçalhos de segurança e de `noindex`. A entrada "Cloudflare Pages" no Devkit estava como "termos não verificados".

Verificação feita em 2026-10-24 nas fontes oficiais:

- Self-Serve Subscription Agreement (atualizado em 2025-09-12): não restringe o plano Free a uso pessoal. Proíbe processar ou coletar dados de cartão em propriedades com serviço gratuito e revender acesso aos serviços.
- Limites do Pages Free (página atualizada em 2026-09-05): 500 builds/mês, 1 build simultâneo, 20.000 arquivos por site, 25 MiB por arquivo, 100 projetos por conta, 100 domínios por projeto, até 100 regras em `_headers`. Requisições a arquivos estáticos não são cobradas.
- A Cloudflare publica guia de migração de Pages para Workers com static assets, onde novos recursos têm chegado. O Pages continua funcionando.

## Alternativas consideradas

### A. Cloudflare Pages, projeto `chriskendra-preview`, deploy direto com Wrangler

- Prós: plano Free sem restrição de uso comercial; `_headers` para CSP e `X-Robots-Tag`; URL previsível (`chriskendra-preview.pages.dev`); deploy direto da pasta `dist/` sem integrar repositório.
- Contras: a URL `*.pages.dev` é pública (mitigado com `noindex` em meta e em cabeçalho); a Cloudflare tem priorizado o Workers; precisa de login do Wrangler na sua conta.

### B. Cloudflare Workers com static assets

- Prós: onde a Cloudflare concentra os recursos novos.
- Contras: mais configuração (`wrangler.jsonc`, `.assetsignore`) sem ganho para um site estático de uma página.

### C. Netlify Free

- Prós: termos verificados no Devkit (2026-10-22); uso comercial permitido.
- Contras: no plano por créditos, estourar o limite pode pausar todos os projetos da conta, risco maior numa conta pessoal com outros projetos.

### D. Vercel Hobby

- Descartada: o plano Hobby proíbe uso comercial.

## Decisão

Opção A, só para o preview. Critério que pesou mais: termos compatíveis com uso comercial e cabeçalhos configuráveis, sem risco para outros projetos da conta.

## Consequências

- Positivas: preview gratuito com cabeçalhos de segurança; nada no nome da cliente antes do aceite.
- Negativas / custos assumidos: o projeto de preview fica na conta do desenvolvedor e deve ser apagado depois do lançamento; a URL é pública para quem tiver o link.
- O que faria esta decisão ser revista: o aceite da proposta. Nesse momento, decidir o host de produção na conta da cliente (Pages, Workers static assets ou Netlify) e registrar em novo ADR.
