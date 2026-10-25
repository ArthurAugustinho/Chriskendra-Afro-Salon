# Pendências: site ChrisKendra (rascunho para proposta)

Atualizado em 2026-10-24. Nenhum item abaixo impede o rascunho e o preview; os marcados como **bloqueia lançamento** impedem a Fase 6.

## Pendências de fase aceitas explicitamente (2026-10-24)

| Fase                       | Pendência                                         | Motivo do aceite                                                                                               | Impacto                                                                                |
| -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 0. Qualificação e proposta | Proposta ainda não aceita pela cliente            | O site é o rascunho que acompanha a proposta                                                                   | Nada vai para produção; conta e domínio no nome da cliente ficam para depois do aceite |
| 1. Briefing                | Briefing incompleto e não aprovado pela cliente   | Os fatos que faltam estão listados abaixo e têm tratamento definido (ex.: preço `null` vira "Ask for a price") | Todos os itens da lista da cliente bloqueiam o lançamento                              |
| 2. Decisões técnicas       | Conta de hospedagem definitiva no nome da cliente | Preview fica na conta do desenvolvedor (ver `docs/decisions/0003`)                                             | Revisar a escolha de host quando a conta for criada                                    |

## Pendências com a cliente (lista `pending` do site.json)

### Resolvidas em 2026-10-24

- Horário: o do Google está certo (seg–qui 10h–18h, sex–sáb 9h30–21h, dom fechado).
- Lista de preços: a impressa é a atual. Atualizados: 2 feed-in braids £45; feed-in braids infantil £50; "Protein/reconstructive treatment".
- Fotos: todas com consentimento de imagem.
- Logo: arquivo original recebido (`briefing/brand/logo-mark-redrawn.png`); marca, favicon e ícone gerados por `scripts/brand-assets.mjs`.
- Nome oficial: está correto como está (nome do Google no NAP e no JSON-LD; nome do logo no topo e em `alternateName`).
- Endereço: "195 London Road" (com "Road").
- Knotless braids (medium/large): £100, como na lista impressa.
- Gel twists: os dois preços da lista, "Gel twists" £15 e "Gel twists (half head)" £45; saiu o "full head".
- Lace wig installation (£30) e loc retwist (só no flyer): continuam no site.

### Em aberto

**Bloqueia o lançamento:**

1. Proposta não aceita (Playbook, Fase 0).

**Não bloqueiam (o site já trata):**

2. Feed-in braids (small, adulto) e loc retwist: sem preço; aparecem como "Ask for a price".
3. O cabelo para trança está incluído no preço? Se não estiver, vale uma linha perto dos preços.
4. As fotos são trabalhos do salão? Se forem, a galeria pode se chamar "Our work" em vez de "Styles".
5. Nome da dona e texto "sobre", se ela quiser (sem isso, nenhuma seção "Sobre").

## Pendências técnicas e de conteúdo encontradas no trabalho

- **Título da galeria:** "Styles" até a confirmação do item 4 em aberto.
- **Repositório remoto privado e preview por push (Fase 3):** o git é só local; não há template base. O `gh` (GitHub CLI) não está instalado nesta máquina, então o remoto não foi criado. Quando for criar, **privado**. O workflow de CI (`.github/workflows/ci.yml`) já está pronto e roda no primeiro push. Enquanto isso, o preview é publicado por deploy direto com Wrangler.
- **Rodada de revisão da cliente (Fase 4):** não feita; acontece com a proposta.
- **SEO do preview:** `noindex, nofollow` derruba a nota de SEO do Lighthouse para 69 (só `is-crawlable` falha). Aceito para o rascunho. Sem sitemap pelo mesmo motivo.
- **Revisão pré-lançamento** (`docs/revisao-pre-lancamento.md`): HTTPS e cabeçalhos ficam "não verificado" até o site estar no ar; domínio e host canônico ficam para a Fase 6.
- **Wordmark:** a marca agora é a original; o texto "ChrisKendra / Afro Caribbean Salon" continua composto em Young Serif. Se existir o arquivo do logo completo (marca + texto), dá para usar no lugar.
- **Fases 6 e 7:** domínio, HTTPS no domínio final, sitemap, Search Console, link no perfil do Google, monitor de disponibilidade e documento de manutenção ficam para depois do aceite.
