# Site ChrisKendra Afro Caribbean Salon (rascunho)

Landing page de uma página para o salão em 195 London Road, Croydon. Objetivo único: a cliente agendar pelo WhatsApp; ligar é o secundário. Este é o **rascunho da proposta**: tem faixa "Draft for review" e `noindex`. Pendências em [PENDENCIAS.md](PENDENCIAS.md), decisões em [docs/decisions/](docs/decisions/), direção visual em [design-system/chriskendra/MASTER.md](design-system/chriskendra/MASTER.md).

## Comandos

Requer Node 22.23+ (testado com Node 24).

| O quê                            | Comando                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Instalar                         | `npm ci`                                                                                 |
| Desenvolvimento                  | `npm run dev` (http://localhost:4321)                                                    |
| Lint e formatação                | `npm run lint`; corrigir: `npm run format`                                               |
| Build (checa tipos e o conteúdo) | `npm run build` → `dist/`                                                                |
| Servir o build                   | `npm run preview` (http://localhost:4321)                                                |
| Testes de aceite (Playwright)    | `npx playwright install chromium` (1ª vez) e `npm test`                                  |
| Screenshots 360/390/1366         | `npm run screenshots` → `docs/screenshots/`                                              |
| Lighthouse mobile                | com o preview rodando: `npm run lighthouse` → `reports/lighthouse/`                      |
| Deploy do preview                | `npx wrangler pages deploy dist --project-name chriskendra-preview` (só com confirmação) |

`npm test` sobe o `npm run preview` sozinho se ele não estiver rodando, mas usa o que estiver em `dist/`: rode `npm run build` antes.

O CSP do site é gerado no build. No `npm run dev`, o Astro não aplica o CSP; para conferir, use `build` + `preview`.

## Como atualizar o conteúdo

Todo o texto e todos os fatos estão em **`src/content/site.json`**. Os componentes não têm texto fixo. O build valida o arquivo (`src/content/schema.ts`) e **falha com uma mensagem clara** se algo estiver mal formado, por exemplo um preço como texto ou uma foto que não existe.

`briefing/content.json` é o material original recebido e não é lido pelo site.

### Preços

Em `priceGroups`, cada grupo tem `title` e `items`; cada item tem `name` e `price`:

```json
{ "name": "Box braids (small)", "price": 95 }
```

- `price` é um número em libras, sem o símbolo (`95`, não `"£95"`).
- Preço desconhecido: `"price": null`. O site mostra **Ask for a price**, que abre o WhatsApp com a mensagem de `suggestedCopy.priceQuestionMessage` já preenchida com o nome do serviço.
- O resumo de cada grupo ("7 services, from £40") e a faixa de preço do JSON-LD são calculados sozinhos.
- Grupo novo: acrescente um objeto em `priceGroups`. A folha divide os grupos em duas colunas no desktop.

### Fotos

1. Coloque o arquivo (JPG, PNG ou WebP, **sem EXIF**) em `src/content/photos/`.
2. Acrescente em `photos`:

   ```json
   {
     "file": "photos/nome-do-arquivo.jpg",
     "alt": "Descrição do penteado",
     "caption": "Legenda curta"
   }
   ```

3. `alt` descreve o penteado para quem não vê a foto; `caption` é a legenda visível.
4. Para remover, apague a entrada e o arquivo. A ordem em `photos` é a ordem da galeria.

O build gera AVIF e WebP em vários tamanhos com `width`/`height`. Para conferir se há EXIF:

```sh
node -e "require('sharp')('src/content/photos/ARQUIVO.jpg').metadata().then(m => console.log({ exif: !!m.exif }))"
```

As 3 fotos do topo são escolhidas em `src/components/Hero.astro`. A primeira é um recorte da foto tirada no salão, gerado por `node scripts/crop-hero.mjs`; rode de novo se trocar essa foto.

### Horários, contato e textos

- Horários: `business.hours` (formato 24 h, `"09:30"`). Dia fechado: `{ "day": "Sunday", "closed": true }`. A tabela, o status "Open now" e o JSON-LD usam a mesma lista.
- Nome, endereço, telefone e link do Maps: `business`. Rodapé e JSON-LD usam `nameOnGoogle` para bater com o perfil do Google.
- Textos de interface (títulos, botões, faixa de rascunho): `pageCopy`. Podem ser reescritos à vontade.
- Mensagens do WhatsApp e frase do topo: `suggestedCopy`.

## Antes do lançamento

Ver [PENDENCIAS.md](PENDENCIAS.md). No mínimo: tirar a faixa (`pageCopy.draftBanner` e o elemento em `src/layouts/Base.astro`), tirar o `noindex` (`Base.astro` e `public/_headers`), trocar `site` em `astro.config.mjs` pelo domínio final e adicionar sitemap.
