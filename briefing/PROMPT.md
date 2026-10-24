# Prompt para o Claude Code: site da ChrisKendra (rascunho da proposta)

**Como usar:**
1. Crie uma pasta vazia para o projeto e descompacte este kit dentro dela. A pasta `briefing/` precisa ficar na raiz.
2. Abra o Claude Code nessa pasta, com o Notion conectado.
3. Cole todo o texto abaixo da linha.

---

Vamos criar o site de uma cliente seguindo o meu Devkit.

## 0. Antes de qualquer coisa

1. Busque minhas skills habilitadas no Notion com `notion-get-enabled-skills` e siga a skill **"Criar site ou landing page para cliente"**. Ela conduz o Playbook fase a fase. Quando ela indicar, use também:
   - "Registrar decisão técnica (ADR)";
   - "Implementar funcionalidade a partir de receita";
   - "Revisão pré-lançamento de site".
2. Se houver uma skill de design instalada no Claude Code (por exemplo `frontend-design`), carregue-a antes de planejar o visual. Ela e a seção 5 deste prompt têm prioridade sobre qualquer padrão seu.
3. Leia tudo em `briefing/` antes de propor qualquer coisa: `briefing.md`, `content.json`, as fotos e as referências.
4. Se o Notion não estiver acessível, pare e me avise.

## 1. Escopo deste trabalho

- **Cliente:** salão afro-caribenho em London Road, Croydon (Londres). Os dados estão em `briefing/content.json`.
- **O que é:** um **rascunho para a proposta**. A cliente ainda não aceitou.
- **Pendências aceitas:** eu aceito explicitamente seguir com duas pendências. Registre as duas em `PENDENCIAS.md`, junto com a lista `pending` do content.json, e continue:
  - Fase 0 sem proposta aceita;
  - Fase 1 com briefing incompleto.
- **Até onde vai:** Fase 4 completa, Fase 5 (revisão) e um deploy de **preview**. Nada de produção. As Fases 6 e 7 ficam para depois do aceite.
- **Objetivo único da página:** a cliente agendar pelo WhatsApp. Ligar é o CTA secundário.

## 2. Regras fixas

**Conteúdo**
- Não invente nada além do que está em `briefing/`: preços, serviços, horários, avaliações, depoimentos, nome da dona, anos de experiência, certificações.
- Onde faltar informação, use o tratamento já definido. Exemplo: um preço `null` vira "Ask for a price".
- Os textos de `suggestedCopy` podem ser reescritos. Os fatos não.
- Os dados da cliente ficam só neste repositório. Não escreva nada sobre ela no Notion nem no Devkit.

**Rascunho e SEO**
- Mostre uma faixa visível "Draft for review" e use `<meta name="robots" content="noindex, nofollow">`.
- Avaliações:
  - mostre "5.0 from 7 Google reviews" com link para o Google Maps, mais um resumo parafraseado dos temas em `reviewThemes`;
  - não use citações nem nomes;
  - não coloque `aggregateRating` no JSON-LD, porque o Google ignora avaliações que o próprio negócio publica.

**Fotos**
- Use só as fotos de `briefing/photos/`. Nada de banco de imagens, imagem gerada por IA ou recorte do flyer.
- A pasta `briefing/reference/` é referência de conteúdo, não material visual.

**Privacidade (UK GDPR/PECR)**
- Sem cookies e sem scripts de terceiros.
- Sem Google Fonts por CDN: fontes com licença livre, hospedadas no próprio site, com subset e `font-display: swap`.
- Sem mapa incorporado: use um botão que abre o Google Maps.

**Confirmações**
- Peça confirmação antes de criar contas, fazer deploy ou enviar qualquer coisa para a cliente.

## 3. Decisões técnicas

Registre cada uma com a skill de ADR. O que segue é a minha sugestão; avalie antes de aceitar.

- **Framework:** Astro, sem framework de UI, com o conteúdo em `src/content/` (copie `briefing/content.json`). Motivos:
  - página estática;
  - zero JS por padrão;
  - `<Image>` gera AVIF/WebP com width/height.
- **JavaScript:** só para o status "Open now / Closed now" no fuso `Europe/London`, como progressive enhancement. Sem JS, a tabela de horários continua visível.
  - Se agrupar os preços em blocos que abrem e fecham, use `<details>` nativo.
- **Preview:** Cloudflare Pages na minha conta, com o projeto `chriskendra-preview`.
  - A conta definitiva, no nome da cliente, fica como pendência para depois do aceite.

## 4. Conteúdo e estrutura

Ordem sugerida. Ajuste se a direção visual pedir, sem perder o objetivo.

1. **Hero:**
   - logo;
   - um único `h1`;
   - uma frase curta;
   - nota do Google;
   - CTA do WhatsApp e botão de ligar;
   - fotos dos trabalhos.
2. **Preços:**
   - mostre os 6 grupos e os 37 itens do content.json. Num celular, a lista não pode virar um rolo impossível de escanear;
   - um preço `null` vira "Ask for a price", que abre o WhatsApp com `priceQuestionMessage` já preenchida;
   - os 10% de desconto na primeira visita ficam perto dos preços;
   - inclua o aviso de `priceNote`.
3. **Galeria:**
   - as 8 fotos, com legenda e `alt` que descreve o penteado;
   - um bloco "Have a style in mind? Send us a photo" que leva ao WhatsApp com `photoQuoteMessage`.
4. **O que dizem as clientes:**
   - os 3 temas de `reviewThemes`;
   - "Summarised from 7 reviews on Google", com link.
5. **Como chegar e horários:**
   - endereço;
   - tabela de horários com o dia de hoje destacado;
   - status de aberto/fechado;
   - botão de rota.
6. **Rodapé:** nome, endereço e telefone exatamente como no Google.

**Regras gerais da página**
- No celular, deixe uma barra fixa embaixo com WhatsApp e Ligar.
- Não crie seção "Sobre" nem FAQ por enquanto, porque ainda não há conteúdo real.
- Links:
  - WhatsApp: `https://wa.me/447534857950?text=<mensagem codificada>`;
  - telefone: `tel:+447534857950`.
- Idioma: `en-GB`.

## 5. Direção visual (a parte mais importante)

Este site não pode parecer template nem "site feito por IA". A cliente precisa reconhecer o salão dela.

**Assunto e público**
- **Assunto:** um salão afro-caribenho de bairro, popular e acolhedor.
- **Público:** mulheres negras da região, que chegam pelo celular.
- **Trabalho da página:** mostrar os estilos e os preços e levar ao WhatsApp em um toque.

**Identidade que já existe (respeite)**
- O logo:
  - silhueta dourada de cabeça e cabelo;
  - "ChrisKendra" em serifa branca sobre marrom chocolate;
  - "AFRO CARIBBEAN SALON" em maiúsculas douradas.
- O flyer usa magenta e rosa.
- Cores de partida (derive os tokens e confira o contraste AA):
  - chocolate `#3B2117`;
  - dourado `#F2C230`;
  - magenta `#9E1677`;
  - rosa `#FBE6EF`.

**De onde tirar personalidade:** do vocabulário real do salão.
- os padrões geométricos das divisões (partings) das tranças;
- a tabela de preços com pontilhado, como na lista impressa;
- o selo "A try will convince you" do flyer;
- o hábito de mandar a foto do estilo pelo WhatsApp.

As fotos dos trabalhos são o conteúdo principal, e o design existe para servir a elas.

**Processo obrigatório**
1. Antes de escrever código, me apresente um plano curto e espere meu OK. O plano deve ter:
   - 4 a 6 cores nomeadas, em hex;
   - 1 ou 2 famílias tipográficas (licença livre) e o papel de cada uma;
   - wireframe ASCII do celular (360px) e do desktop;
   - **um único** elemento memorável.
2. Revise esse plano contra a lista "Evite" abaixo e diga o que mudou.
3. Construa mobile-first.
4. Tire screenshots com Playwright em 360px, 390px e 1366px. Critique e corrija antes de me mostrar.

**Evite (sinais de design genérico de IA)**
- Fundo creme com acento terracota, ou fundo quase preto com um único acento neon.
- Conteúdo picotado em cards idênticos, com a mesma sombra cinza e o mesmo raio. Gradientes decorativos e blobs.
- Tipografia:
  - rótulo em CAIXA ALTA espaçada acima de cada título;
  - uma palavra do título destacada em outra cor ou em itálico;
  - numeração 01/02/03 em itens que não são sequência;
  - textos no formato "A · B · C";
  - "→" no fim de botões;
  - fonte monoespaçada em rótulos.
- Movimento:
  - fade-and-slide-up em toda seção;
  - hover animado em todo card.
  - No máximo um momento de movimento, respeitando `prefers-reduced-motion`.
- Ícones de emoji, ilustrações genéricas, imagens de banco.
- Frases vazias de marketing ("Elevate your beauty", "Experience the difference", "Your journey starts here"). Escreva como o salão falaria: direto, caloroso, específico.

## 6. Critérios de aceite

**Layout e acessibilidade**
- Sem rolagem horizontal em 360px.
- Alvos de toque com pelo menos 44px.
- Foco visível e contraste AA.
- Um único `h1` e hierarquia de títulos coerente.

**Imagens**
- AVIF/WebP com width/height.
- Lazy loading abaixo da dobra e prioridade para a imagem do hero.
- Sem metadados EXIF.

**SEO**
- JSON-LD `HairSalon` com:
  - nome, endereço, telefone e geo;
  - horários;
  - `hasMap`.
- Sem `aggregateRating`.

**Rede**
- Nenhuma requisição a domínio externo ao carregar a página. Verifique com Playwright.

**Lighthouse mobile**
- Performance, Acessibilidade e Boas práticas ≥ 95.
- SEO perde pontos por causa do `noindex`; registre isso e siga.

**Documentação**
- `PENDENCIAS.md` atualizado.
- `README.md` com os comandos e com como atualizar preços e fotos pelo arquivo de conteúdo.

**Entrega final**
- Resumo do que foi feito.
- Decisões registradas.
- URL do preview, depois da minha confirmação para o deploy.
- Screenshots.
- Lista de pendências.
