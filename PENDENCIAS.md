# Pendências: site ChrisKendra (rascunho para proposta)

Atualizado em 2026-10-24. Nenhum item abaixo impede o rascunho e o preview; os marcados como **bloqueia lançamento** impedem a Fase 6.

## Pendências de fase aceitas explicitamente (2026-10-24)

| Fase                       | Pendência                                         | Motivo do aceite                                                                                               | Impacto                                                                                |
| -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 0. Qualificação e proposta | Proposta ainda não aceita pela cliente            | O site é o rascunho que acompanha a proposta                                                                   | Nada vai para produção; conta e domínio no nome da cliente ficam para depois do aceite |
| 1. Briefing                | Briefing incompleto e não aprovado pela cliente   | Os fatos que faltam estão listados abaixo e têm tratamento definido (ex.: preço `null` vira "Ask for a price") | Todos os itens da lista da cliente bloqueiam o lançamento                              |
| 2. Decisões técnicas       | Conta de hospedagem definitiva no nome da cliente | Preview fica na conta do desenvolvedor (ver `docs/decisions/0003`)                                             | Revisar a escolha de host quando a conta for criada                                    |

## Pendências com a cliente (lista `pending` do content.json)

Todas **bloqueiam lançamento**.

1. Proposta não aceita (Playbook, Fase 0).
2. Horário: Google (seg–qui 10h–18h, sex–sáb 9h30–21h, dom fechado) vs. flyer (seg–sáb 9h–18h). O rascunho mostra o horário do Google.
3. Preços da lista impressa vs. flyer: a lista impressa é a atual? (Ex.: Wash & blow-dry £20 na lista, £15 no flyer; cornrows £30/£45 na lista, £20/£40 no flyer.)
4. Preços ilegíveis: feed-in braids (small), 2 feed-in braids, gel twists (full head), feed-in braids infantil. No site aparecem como "Ask for a price".
5. O cabelo para trança está incluído no preço das tranças?
6. Lace wig installation (£30, só no flyer) ainda é oferecido?
7. Direito de uso das fotos e consentimento das pessoas fotografadas. Só `two-strand-twists-in-salon.jpg` é claramente do salão.
8. Arquivo original do logo (PNG/SVG/PDF). Hoje: marca redesenhada em SVG e wordmark composto em fonte aproximada.
9. Nome oficial: "Chriskendra Afro Salon" (Google) ou "ChrisKendra Afro Caribbean Salon" (logo).
10. Nome da dona e texto "sobre", se ela quiser.

## Pendências técnicas e de conteúdo encontradas no trabalho

- **Título da galeria:** usa "Styles" e não "Our work", porque a autoria e os direitos de 7 das 8 fotos não estão confirmados. Trocar depois da confirmação (item 7).
- **NAP no formato do Google:** rodapé e JSON-LD usam o nome do Google e o endereço do `content.json` ("195 London Road"). O link do Maps escreve "London Rd". Conferir no perfil do Google a grafia exata antes do lançamento.
- **Repositório remoto privado e preview por push (Fase 3):** o git é só local; não há template base. O `gh` (GitHub CLI) não está instalado nesta máquina, então o remoto não foi criado. Quando for criar, **privado**. O workflow de CI (`.github/workflows/ci.yml`) já está pronto e roda no primeiro push. Enquanto isso, o preview é publicado por deploy direto com Wrangler.
- **Rodada de revisão da cliente (Fase 4):** não feita; acontece com a proposta.
- **SEO do preview:** `noindex, nofollow` derruba a nota de SEO do Lighthouse para 69 (só `is-crawlable` falha). Aceito para o rascunho. Sem sitemap pelo mesmo motivo.
- **Revisão pré-lançamento** (`docs/revisao-pre-lancamento.md`): HTTPS e cabeçalhos ficam "não verificado" até o site estar no ar; domínio e host canônico ficam para a Fase 6.
- **Logo:** o wordmark "ChrisKendra" está composto em Young Serif, uma aproximação do logo. Trocar pelo arquivo original quando chegar (item 8).
- **Fases 6 e 7:** domínio, HTTPS no domínio final, sitemap, Search Console, link no perfil do Google, monitor de disponibilidade e documento de manutenção ficam para depois do aceite.
