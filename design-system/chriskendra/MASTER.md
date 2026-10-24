# Design system: ChrisKendra

- Status: **Aprovado** (2026-10-24), com os ajustes de construção listados no fim
- Fonte: identidade existente (logo, flyer, lista de preços impressa) e a seção 5 do prompt do projeto. Nenhuma skill de design instalada; proposta feita à mão a partir do briefing.

## Direção

Um salão de bairro, popular e acolhedor. As fotos dos estilos são o conteúdo; o resto existe para emoldurar as fotos e levar ao WhatsApp em um toque. Topo e rodapé em marrom chocolate como o fundo do logo, corpo da página no rosa do flyer, ação principal no dourado do logo (sobre o chocolate) e no magenta do flyer (sobre o claro).

## Cores

| Nome       | Hex       | Papel                                                                                           |
| ---------- | --------- | ----------------------------------------------------------------------------------------------- |
| Cocoa      | `#3B2117` | Texto principal; fundo do topo, da galeria, do rodapé e da barra fixa                           |
| Gold       | `#F2C230` | Marca do logo; botão principal sobre Cocoa; selo; foco sobre Cocoa. **Nunca texto sobre claro** |
| Magenta    | `#9E1677` | Botão principal sobre claro; links; "Ask for a price"; destaque do dia de hoje                  |
| Blush      | `#FBE6EF` | Fundo da página; linhas de divisão da grade de fotos                                            |
| Paper      | `#FFFFFF` | Folha da tabela de preços; texto sobre Cocoa e Magenta                                          |
| Milk cocoa | `#6B4A3C` | Texto secundário (notas, legendas sobre claro)                                                  |

Contraste medido (WCAG 2.x):

| Texto / fundo                 | Razão | AA texto normal |
| ----------------------------- | ----- | --------------- |
| Cocoa / Blush                 | 12,48 | ok              |
| Cocoa / Paper                 | 14,83 | ok              |
| Milk cocoa / Blush            | 6,62  | ok              |
| Magenta / Blush               | 6,23  | ok              |
| Paper / Magenta               | 7,41  | ok              |
| Gold / Cocoa (e Cocoa / Gold) | 8,85  | ok              |
| Paper / Cocoa                 | 14,83 | ok              |
| Magenta / Cocoa               | 2,00  | **proibido**    |
| Gold / Blush                  | 1,41  | **proibido**    |

Regra decorrente: ação principal = Gold com texto Cocoa quando o fundo é Cocoa; Magenta com texto Paper quando o fundo é claro. Nada de verde do WhatsApp (seria a 7ª cor); o ícone do WhatsApp identifica o botão.

## Tipografia

Hospedadas no próprio site (pacotes Fontsource, OFL-1.1), só o subset `latin` (cobre £, é, ’), `font-display: swap`.

| Família                                   | Papel                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Young Serif** (400)                     | Wordmark "ChrisKendra", `h1`, `h2`, títulos dos grupos de preço, texto do selo. Serifa robusta e calorosa, próxima do tom do flyer, longe das serifas de "site de luxo". |
| **Atkinson Hyperlegible Next** (variável) | Todo o resto: texto, botões, itens e valores de preço, horários, legendas. Feita para legibilidade em tela pequena; preços em 700.                                       |

Escala (mobile → desktop): `h1` 2,25 → 4 rem; `h2` 1,75 → 2,5 rem; texto 1,0625 rem (17 px) com altura de linha 1,5; nota 0,9375 rem. Nenhum rótulo em caixa alta espaçada acima de títulos; a única caixa alta é "AFRO CARIBBEAN SALON", que faz parte do logo.

## Espaçamento e forma

- Base 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Largura máxima do conteúdo: 1160 px; margem lateral 16 px no celular.
- Fotos com cantos retos (as divisões do cabelo são linhas nítidas). Botões em pílula, como a faixa amarela "WE SPECIALISE IN" do flyer. Nenhuma sombra decorativa.
- Alvos de toque ≥ 48 px; foco visível com contorno de 3 px (Magenta sobre claro, Gold sobre Cocoa).
- Quebras: 600 px (galeria em 3 colunas), 900 px (desktop: navegação no topo, hero em 2 colunas, barra fixa some).

## Elemento memorável (único): a grade de divisões

As fotos ficam numa grade cujas linhas finas (3 px, Blush sobre Cocoa) desenham as divisões de um box braid recém-feito, o mesmo padrão da foto das two-strand twists tirada no salão. Aparece só onde há fotos: no hero (3 fotos) e na galeria (8 fotos), onde o bloco "Have a style in mind? Send us a photo" ocupa a nona casa da grade, em Gold.

Vocabulário de apoio, discreto:

- **Folha de preços:** fundo Paper com pontilhado entre o nome e o valor, como a lista impressa.
- **Selo "A try will convince you":** círculo Gold perto do desconto de 10%, como no flyer.
- **Movimento (o único):** o selo "carimba" uma vez ao entrar na tela (escala 1,15 → 1), via CSS com `animation-timeline: view()`, só com `prefers-reduced-motion: no-preference`. Sem suporte, fica parado.

## Wireframes

### Celular (360 px)

```
┌──────────────────────────────────┐
│ Draft for review. Not live yet.  │ faixa Gold, texto Cocoa
├──────────────────────────────────┤ Cocoa
│ ▲ ChrisKendra                    │ marca Gold + wordmark Paper
│   AFRO CARIBBEAN SALON           │ caixa alta Gold (parte do logo)
│                                  │
│ Braids, twists and               │ h1 Young Serif, Paper
│ wigs in Croydon                  │
│ Affordable Afro Caribbean hair   │ texto Blush
│ on London Road. Braids, silk     │
│ press, wigs, treatments and      │
│ children's hair.                 │
│ ★★★★★ 5.0 from 7 Google reviews  │ link para o Google Maps
│ [ (wa) Book on WhatsApp        ] │ Gold, 52 px
│ [ (tel) Call 07534 857950      ] │ contorno Paper
│ ┌───────────────┬──────────────┐ │ GRADE DE DIVISÕES
│ │ twists no     │ cornrow updo │ │ linhas Blush 3 px
│ │ salão (real)  ├──────────────┤ │
│ │               │ triangle-part│ │
│ └───────────────┴──────────────┘ │
├──────────────────────────────────┤ Blush
│ Prices                      (h2) │
│ (selo)  10% off your first visit │
│         New to the salon? Tell   │
│         us when you book.        │
│ ┌──────────────────────────────┐ │ folha Paper
│ │ Braids                     − │ │ <details open>
│ │ Knotless (small) ....... £120│ │
│ │ Box braids (small) ...... £95│ │
│ │ Feed-in braids (small)       │ │
│ │ ........... Ask for a price  │ │ Magenta → WhatsApp
│ ├──────────────────────────────┤ │
│ │ Cornrows and twists        + │ │ <details> fechado
│ │ 5 styles, from £30           │ │
│ ├──────────────────────────────┤ │
│ │ (mais 4 grupos)            + │ │
│ └──────────────────────────────┘ │
│ Prices can change with hair...   │ priceNote, Milk cocoa
├──────────────────────────────────┤ Cocoa
│ Styles                      (h2) │
│ ┌──────────────┬───────────────┐ │ grade 2 col
│ │ foto         │ foto          │ │
│ │ legenda      │ legenda       │ │
│ │ … 8 fotos …                  │ │
│ ├──────────────┴───────────────┤ │
│ │ Have a style in mind?        │ │ casa Gold, 2 col
│ │ Send us a photo              │ │
│ │ [ (wa) Send it on WhatsApp ] │ │
│ └──────────────────────────────┘ │
├──────────────────────────────────┤ Blush
│ What clients say            (h2) │
│ 5.0 from 7 Google reviews        │ Young Serif
│ ──────────────────────────────── │ filetes, sem cards
│ Patient and caring          (h3) │
│ Clients describe an unhurried…   │
│ ──────────────────────────────── │
│ There when you need her          │
│ ──────────────────────────────── │
│ Results that never disappoint    │
│ Summarised from 7 reviews on     │
│ Google                    (link) │
├──────────────────────────────────┤ Blush
│ Visit us                    (h2) │
│ 195 London Road                  │
│ Croydon CR0 2DR                  │
│ [ Get directions ]               │ contorno Magenta
│ ● Open now, until 21:00          │ só com JS
│ Monday       10:00 – 18:00       │
│ ▌Saturday    09:30 – 21:00       │ hoje: barra Magenta, negrito
│ Sunday       Closed              │
├──────────────────────────────────┤ Cocoa
│ Chriskendra Afro Salon           │ NAP como no Google
│ 195 London Road, Croydon CR0 2DR │
│ 07534 857950                     │
╞══════════════════════════════════╡ barra fixa Cocoa
│ [ (wa) WhatsApp      ][ (tel) Call ] │
└──────────────────────────────────┘
```

### Desktop (1366 px)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Draft for review. Not live yet.                                        │
├────────────────────────────────────────────────────────────────────────┤ Cocoa
│ ▲ ChrisKendra                    Prices   Styles   Visit  [Book on WhatsApp] │
│   AFRO CARIBBEAN SALON                                                 │
│                                                                        │
│  Braids, twists and           ┌──────────────┬───────────┬──────────┐  │
│  wigs in Croydon              │              │ cornrow   │ triangle │  │
│                               │  twists no   │ updo      │ part     │  │
│  Affordable Afro Caribbean…   │  salão       ├───────────┴──────────┤  │
│  ★★★★★ 5.0 from 7 Google…     │              │ straight-back        │  │
│  [Book on WhatsApp] [Call …]  │              │ cornrows             │  │
│                               └──────────────┴──────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤ Blush
│  Prices                                  (selo) 10% off your first visit│
│  ┌────────────────────────────┐  ┌────────────────────────────┐        │
│  │ Braids                   − │  │ Wash, silk press and cut + │        │
│  │ … 7 itens …                │  │ Relaxer, colour and…     + │        │
│  │ Cornrows and twists      + │  │ Children's braids        + │        │
│  │ Wigs, weaves and…        + │  └────────────────────────────┘        │
│  └────────────────────────────┘  priceNote                             │
├────────────────────────────────────────────────────────────────────────┤ Cocoa
│  Styles                                                                │
│  ┌────────────┬────────────┬────────────┐                              │
│  │ foto       │ foto       │ foto       │  grade 3 × 3                 │
│  ├────────────┼────────────┼────────────┤  (8 fotos + casa Gold        │
│  │ foto       │ foto       │ foto       │   "Send us a photo")         │
│  ├────────────┼────────────┼────────────┤                              │
│  │ foto       │ foto       │ Send us a  │                              │
│  │            │            │ photo      │                              │
│  └────────────┴────────────┴────────────┘                              │
├────────────────────────────────────────────────────────────────────────┤ Blush
│  What clients say          │ Patient and caring …                      │
│  5.0 from 7 Google reviews │ There when you need her …                 │
│  Summarised from 7 … (link)│ Results that never disappoint …           │
├────────────────────────────────────────────────────────────────────────┤
│  Visit us                  │ ● Open now, until 21:00                   │
│  195 London Road           │ Monday … Sunday (hoje destacado)          │
│  Croydon CR0 2DR           │                                           │
│  [Get directions]          │                                           │
├────────────────────────────────────────────────────────────────────────┤ Cocoa
│  Chriskendra Afro Salon   195 London Road, Croydon CR0 2DR   07534 857950 │
└────────────────────────────────────────────────────────────────────────┘
```

## Textos (reescrita de `suggestedCopy`, fatos inalterados)

- `h1`: "Braids, twists and wigs in Croydon".
- Frase: "Affordable Afro Caribbean hair on London Road. Braids, silk press, wigs, treatments and children's hair."
- Botões: "Book on WhatsApp", "Call 07534 857950", "Get directions", "Send it on WhatsApp". Sem "→".
- Resumo de grupo: "7 styles, from £40" (vírgula, não "·").
- Galeria: "Styles" (não "Our work" até a autoria das fotos ser confirmada).

## Revisão contra a lista "Evite"

O que mudou entre o primeiro esboço e esta versão:

1. Os 3 temas das avaliações eram 3 cards iguais → viraram uma lista com filetes.
2. Resumo dos grupos de preço "7 styles · from £40" → "7 styles, from £40".
3. As linhas da grade continuavam pelo fundo do hero inteiro, como padrão decorativo → ficam só entre fotos.
4. Uma casa da grade cortava duas fotos em triângulo (alusão ao triangle part) → removido, porque corta o conteúdo principal.
5. Selo grande sobre a foto do hero → foi para perto do desconto, menor, para não competir com a grade (um elemento memorável só).
6. Botões do WhatsApp em verde → Gold/Magenta, sem 7ª cor.
7. Zoom no hover das fotos → removido; só o foco/hover dos botões muda.

Conferido e ausente: creme + terracota, quase-preto + neon, gradientes, blobs, sombras, rótulos em caixa alta acima de títulos, palavra destacada no título, numeração 01/02/03, monoespaçada, emoji, imagem de banco, frases vazias de marketing, fade-and-slide-up.

## Ajustes durante a construção (após screenshots)

1. **Preços em Young Serif** (algarismos alinhados): os algarismos da Atkinson (zero cortado, "1" com serifa) davam aos preços cara de fonte monoespaçada. A serifa também ecoa os preços do flyer. Telefone e horários ficam na Atkinson, onde a distinção 0/O ajuda.
2. **Algarismos alinhados na Young Serif** em toda a página (o padrão dela é old-style, que deixava "195 London Road" irregular).
3. **Hero no celular:** as fotos vêm antes dos botões para entrar na primeira tela; a barra fixa já mostra WhatsApp e Ligar. A ordem no DOM não muda (foco por teclado intacto).
4. **Recorte da foto do salão** no hero (`scripts/crop-hero.mjs`): o original mostra mais cadeira e chão que cabelo.
5. **Folha de preços no desktop em duas páginas** lado a lado, cada uma com a altura do próprio conteúdo, como a lista impressa de 2 páginas; evita um vazio branco na coluna da direita.
6. **Logo original** (recebido em 2026-10-24) no lugar da marca redesenhada: PNG transparente servido em AVIF/WebP; favicon e ícone gerados dele (`scripts/brand-assets.mjs`).
