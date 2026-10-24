# chriskendra-site

Site de salão afro-caribenho em Croydon (Londres). Objetivo único: agendar pelo WhatsApp; ligar é o secundário. Estado: rascunho para proposta (faixa "Draft for review" + `noindex`).

## Stack

- Astro 7 estático, sem framework de UI · preview no Cloudflare Pages (`chriskendra-preview`) · sem formulário (links `wa.me` e `tel:`)
- Decisões e motivos: docs/decisions/

## Comandos

- Instalar: `npm ci`
- Desenvolvimento: `npm run dev`
- Lint e build (antes de todo commit): `npm run lint && npm run build`
- Testes de aceite: `npm test` (depois do build)

## Convenções

- Design: seguir design-system/chriskendra/MASTER.md.
- Mobile-first; testar em 360px de largura antes de considerar uma seção pronta.
- Textos e fatos do site em `src/content/site.json`, nunca escritos em componentes.
- Imagens via `<Picture>` do `astro:assets`, AVIF/WebP, com width/height.
- JS só para o status "Open now" (docs/decisions/0002). Nada de estilo inline (o CSP usa hashes).
- Sem bibliotecas novas sem justificativa.

## Restrições

- Nunca ler, criar ou alterar arquivos .env. Variáveis novas vão para .env.example com valor vazio.
- Não inventar depoimentos, avaliações, preços ou dados de contato: usar só o briefing.
- Avaliações: só a nota, a contagem e os temas parafraseados; sem citações, sem nomes, sem `aggregateRating`.
- Não adicionar cookies, scripts de terceiros nem requisições a outros domínios.
- Dados da cliente ficam só neste repositório.
