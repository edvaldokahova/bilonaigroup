# A Bilonai Group — site da agência

Site 3D da agência, sem base de dados. O cliente responde a 8 perguntas, vê o orçamento e o prazo na hora e envia o pedido pronto para o WhatsApp **+244 955 968 159**.

## Onde mudar cada coisa

| Quero mudar… | Ficheiro |
|---|---|
| Número de WhatsApp, email de suporte, nome do agente, assinatura, taxa Kz→€ | `lib/brand.ts` |
| Preços (sites, lojas, emails, renovações) | `lib/pricing.ts` (única fonte de preços) |
| Perguntas, opções, cores, funcionalidades, regra de prazo 24 h / 48 h | `lib/fluxo.ts` |
| Texto da mensagem que vai para o WhatsApp | `lib/whatsapp.ts` |
| Dados de pagamento da fatura (Multicaixa Express, banco, titular, IBAN) | `lib/brand.ts` → `pagamento` |
| Fatura pró-forma em PDF (layout, validade, condições) | `lib/fatura.ts` |
| Cláusulas prontas dos termos de serviço do site do cliente | `lib/fluxo.ts` → `CLAUSULAS` |
| Trabalhos do portfólio (nome, categoria, link, captura) | `lib/portfolio.ts` + imagens em `public/portfolio/` |
| Termos e privacidade | `app/termos/page.tsx`, `app/privacidade/page.tsx` |
| Imagem de partilha (WhatsApp, Facebook…) | `public/og.jpg` (1200×630) |

## Regras importantes

- **Loja, blog e sistema** (ou funcionalidades marcadas «painel») contam como projecto **com base de dados**: preço com BD, domínio próprio obrigatório, prazo 48 h.
- **Site simples** com até 4 funcionalidades: sem BD, prazo 24 h.
- O site não guarda dados: tudo corre no navegador do cliente.

## Técnica

Next.js 14 (App Router), React 18, Tailwind 3.4, TypeScript. Sem bibliotecas 3D: o 3D é feito com CSS 3D + WebGL leve. A escultura de ouro do símbolo (hero, análise e CTA final) está em `components/Orbita.tsx`; a poeira dourada em `components/GoldField.tsx`; o site a desmontar-se em camadas em `components/Montagem.tsx`. Sem WebGL, em telemóveis fracos, com poupança de dados ou "movimento reduzido", aparece o símbolo estático. Deploy automático na Vercel a cada envio para o GitHub.

## Por preencher

- Domínio oficial: **service.bilonai.com** (já é o valor por omissão em `lib/brand.ts`). Falta adicioná-lo ao projecto na Vercel (Settings → Domains) e criar o registo DNS que a Vercel indicar.
