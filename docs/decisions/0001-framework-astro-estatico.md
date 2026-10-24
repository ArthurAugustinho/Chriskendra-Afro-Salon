# 0001. Astro estático, sem framework de UI

- Status: Aceita
- Data: 2026-10-24

## Contexto

Landing page de uma página para um salão de bairro. O objetivo único é levar a cliente ao WhatsApp. A dona não vai editar o site sozinha. Requisitos não funcionais: Lighthouse mobile ≥ 95 em desempenho, acessibilidade e boas práticas; nenhum JavaScript além do status "Open now"; imagens AVIF/WebP com `width`/`height`; nenhuma requisição externa; todo o conteúdo vindo de um único JSON (`content.json`, 37 preços e 8 fotos) que precisa ser fácil de atualizar.

## Alternativas consideradas

### A. Astro 7 com saída estática

- Prós: zero JS por padrão; `astro:assets` gera AVIF/WebP com `srcset`, `width` e `height` no build (sharp); o JSON pode ser validado com o zod embutido (`astro/zod`) e o build falha se um preço ou uma foto estiver mal formado; hospeda em qualquer host estático.
- Contras: menos familiar que Next.js; versões major frequentes (7.x em out/2026), cada uma com guia de migração; `@astrojs/check` aceita só TypeScript 5 ou 6, então o TypeScript fica fixado na 6; sharp é binário nativo e precisa instalar na CI.

### B. HTML e CSS escritos à mão, com script de imagens

- Prós: nenhuma dependência de framework; nada a migrar.
- Contras: o pipeline de imagens (formatos, tamanhos, `srcset`) teria de ser escrito e mantido à mão; sem templates, a lista de 37 preços seria duplicada no HTML e divergiria do JSON.

### C. Next.js com export estático

- Prós: stack que domino.
- Contras: envia o runtime do React para uma página sem estado; `next/image` em export estático não otimiza imagens sem um loader externo ou script próprio.

## Decisão

Astro 7 com `output: 'static'`, sem framework de UI. O conteúdo fica em `src/content/site.json` (cópia de `briefing/content.json`) e as fotos em `src/content/photos/`, validados por um schema zod no build. Critério que pesou mais: atingir as metas de desempenho e de imagem com o menor JS e o menor código próprio.

## Consequências

- Positivas: HTML estático pronto para qualquer host; preço ou foto nova é uma mudança só no JSON; erro de conteúdo quebra o build em vez de quebrar a página.
- Negativas / custos assumidos: dependência de sharp no build; atualizar o Astro a cada major exige ler o guia de migração; TypeScript fixado na 6 até o `@astrojs/check` suportar a 7.
- O que faria esta decisão ser revista: a cliente querer editar textos sozinha (avaliar CMS headless) ou o site precisar de agendamento online com estado.
