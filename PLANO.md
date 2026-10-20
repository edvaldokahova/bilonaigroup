# Plano do site 3D — A Bilonai Group

> Fase 1 (auditoria e plano). Sem código de interface. Escrito para o fundador, em português simples.

## 1. O que encontrei (auditoria)

- O repositório `bilonaigroup` está **vazio**: não há commits, nem `package.json`, nem nenhum dos ficheiros que o pedido manda "manter" (`lib/pricing.ts`, `lib/brand.ts`, `components/ui/Logo.tsx`, `tailwind.config.ts`, `app/layout.tsx`, `app/globals.css`, `public/favicon.png`, `public/android-chrome-512x512.png`).
- Também **não há Supabase** para arquivar: a pasta `_arquivo/` deixa de ser precisa. O site nasce já sem base de dados.
- **Vercel**: ainda não existe nenhum projecto ligado a este repositório. Existem projectos dos sites do portfólio (eddievelor, nk-luzindalalu, rede29, lamptech, gidia, aba, benerluzi-imoveis, fisiouige), de onde posso tirar os links e capturas reais na Fase 4.
- Conclusão: **construímos tudo do zero**, seguindo a marca, os preços e as regras do documento.

## 2. Pacotes (versões fixas, todas compatíveis com Next 13.5 / React 18.2 / Node 16)

| Pacote | Versão | Para quê |
|---|---|---|
| next | 13.5.6 | Estrutura do site (App Router) |
| react / react-dom | 18.2.0 | Base |
| typescript | 5.2.2 | Verificação de erros |
| tailwindcss / postcss / autoprefixer | 3.3.3 / 8 / 10 | Estilos |
| three | 0.160.1 | Motor 3D |
| @react-three/fiber | 8.15.19 | 3D dentro do React |
| @react-three/drei | 9.105.6 | Ajudas 3D (texturas, ambiente, rato) |
| lucide-react | 0.292.0 | Ícones |

Fica de fora: Supabase, Resend, pós-processamento pesado (o brilho/"bloom" será simulado com materiais e sprites, para poupar peso). Fontes via `next/font` (sem pacote extra).

## 3. Estrutura de pastas

```
app/
  layout.tsx, globals.css, page.tsx          → página inicial
  comecar/page.tsx                           → fluxo de conversão
  termos/, privacidade/, not-found.tsx       → páginas de apoio
  sitemap.ts, robots.ts, opengraph-image     → SEO
components/
  ui/        Logo, Botao, Secoes…
  three/     CanvasDinamico, Cena, Dispositivo, Particulas, Poster (reserva)
  fluxo/     Passo, Progresso, Previa3D, Previa2D, PrecoAoVivo, Veredito, FaltaUmPasso
lib/
  brand.ts      nome, assinatura, WhatsApp 244955968159, cores, NEXT_PUBLIC_SITE_URL
  pricing.ts    motor de preços (única fonte) — calcularOrcamento()
  portfolio.ts  os 8 sites entregues
  whatsapp.ts   monta a mensagem e o link wa.me (limite ~1.800 caracteres)
  dispositivo.ts detecção de WebGL / gama baixa / poupança de dados / movimento reduzido
public/
  favicon.png, android-chrome-512x512.png, portfolio/*.webp, poster.webp
```

`lib/pricing.ts` será escrito a partir da tabela do documento (13.997 / 26.997 / 39.997 Kz sem BD; 34.700 / 46.700 Kz com BD; email extra 2.500 Kz, 1 incluído com BD; renovação BD 6.000, `.com` 16.900, `.ao` 35.000; € a 1.055 Kz; BD + `.vercel.app` devolve erro).

## 4. Plano de desempenho (Android de gama baixa, dados lentos)

1. Texto e botão em HTML puro aparecem primeiro; o 3D carrega depois (`next/dynamic`, `ssr:false`, só quando o browser está livre).
2. Antes de carregar o 3D verifico: há WebGL? Poucos núcleos/memória? `saveData` ligado? `prefers-reduced-motion`? Se sim → **poster estático** com o mesmo texto e botão.
3. Geometria feita em código (sem modelos 3D pesados); capturas do portfólio em WebP pequeno (~40–60 KB cada). Meta: cena < 1,5 MB.
4. `dpr` máximo 1,5 no telemóvel; a renderização pára quando o 3D sai do ecrã ou o separador fica escondido; uma só `Canvas`.
5. O fluxo `/comecar` funciona todo sem 3D (prévia 2D). O botão de WhatsApp nunca depende do 3D.
6. Metas: Lighthouse mobile Desempenho ≥ 80, Acessibilidade ≥ 95; LCP = texto/poster.

## 5. Como vou trabalhar no Git

O ambiente onde estou só me deixa enviar para o ramo `ccr-58503e89-m5lbfg`. Faço lá todas as fases (commits pequenos, em português). Quando aprovares o resultado, abro um pedido de junção (PR) para `main`. Não faço `push --force` nem apago nada.

## 6. O que só tu consegues fazer (ou autorizar)

1. **Ligar o repositório à Vercel** — ou autorizas-me a criar o projecto `bilonaigroup` na tua conta Vercel (consigo fazê-lo daqui), ou fazes tu: vercel.com → *Add New…* → *Project* → importar `edvaldokahova/bilonaigroup` → *Deploy*.
2. **Logótipos e favicon**: o repositório não os tem. Envia-me (ou carrega no repositório) o logótipo do novo branding (SVG ou PNG), `favicon.png` e `android-chrome-512x512.png`. Até lá uso um logótipo de texto provisório marcado `// PREENCHER`.
3. **Portfólio**: confirmar se posso usar os links públicos dos projectos Vercel dos 8 sites (eddievelor, nk-luzindalalu, rede29, lamptech, gidia, aba, benerluzi-imoveis, fisiouige) para links e capturas.
