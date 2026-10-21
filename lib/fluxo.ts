// Regras do fluxo "Começar o meu projecto": opções, preço, prazo e veredito.
// Tudo corre no navegador. Não há base de dados: no fim, a mensagem vai pronta para o WhatsApp.
import { calcularOrcamento, type Dominio, type Orcamento } from "./pricing";

export type Tipo = "site" | "loja" | "blog" | "sistema";
export type Pais = "AO" | "PT" | "outro";
export type Trafego = "sim" | "talvez" | "nao";

export interface Respostas {
  nome: string;
  negocio: string;
  pais: Pais;
  tipo: Tipo | null;
  ramo: string | null;
  oferta: string;
  estilo: string;
  paleta: string;
  funcs: string[];
  dominio: Dominio;
  dominioNome: string;
  emails: number;
  whatsapp: string;
  instagram: string;
  facebook: string;
  cidade: string;
  trafego: Trafego | null;
  denominacao: string; // denominação social (opcional)
  nif: string; // NIF (opcional)
  termos: string[]; // ids das cláusulas escolhidas para os termos de serviço do site do cliente
  notasTermos: string;
}

export const RESPOSTAS_INICIAIS: Respostas = {
  nome: "",
  negocio: "",
  pais: "AO",
  tipo: null,
  ramo: null,
  oferta: "",
  estilo: "elegante",
  paleta: "noite",
  funcs: [],
  dominio: "com",
  dominioNome: "",
  emails: 0,
  whatsapp: "",
  instagram: "",
  facebook: "",
  cidade: "",
  trafego: null,
  denominacao: "",
  nif: "",
  termos: [],
  notasTermos: "",
};

export const TIPOS: { id: Tipo; titulo: string; desc: string }[] = [
  { id: "site", titulo: "Site profissional", desc: "Apresenta o teu negócio e traz clientes para o WhatsApp." },
  { id: "loja", titulo: "Loja online", desc: "Catálogo com preços, pedidos e painel para gerir produtos." },
  { id: "blog", titulo: "Blog ou revista", desc: "Publica artigos e notícias com o teu próprio painel." },
  { id: "sistema", titulo: "Sistema à medida", desc: "Reservas, clientes, gestão interna. Feito para o teu processo." },
];

export const RAMOS = [
  "Restauração e comida",
  "Moda e beleza",
  "Saúde e clínicas",
  "Imobiliário e construção",
  "Serviços e consultoria",
  "Tecnologia e electrónica",
  "Educação e formação",
  "Turismo e eventos",
  "Comércio e distribuição",
  "Outro",
];

export const ESTILOS = [
  { id: "elegante", titulo: "Elegante", desc: "Escuro, sofisticado, premium", serif: true },
  { id: "minimal", titulo: "Minimalista", desc: "Claro, limpo, muito espaço", serif: false },
  { id: "vibrante", titulo: "Vibrante", desc: "Cores fortes, energia, jovem", serif: false },
  { id: "classico", titulo: "Clássico", desc: "Confiança, tradição, sobriedade", serif: true },
];

// bg = fundo, fg = texto, ac = destaque, sf = superfície
export const PALETAS = [
  { id: "noite", nome: "Noite e ouro", bg: "#0B0C0F", fg: "#F4EFE6", ac: "#D4A936", sf: "#17191F" },
  { id: "marinho", nome: "Azul profundo", bg: "#0B1730", fg: "#EEF3FF", ac: "#4F8CFF", sf: "#13234A" },
  { id: "esmeralda", nome: "Esmeralda", bg: "#07211B", fg: "#EAF7F1", ac: "#2BC48A", sf: "#0E3229" },
  { id: "vinho", nome: "Vinho", bg: "#2A0D16", fg: "#FBEFF2", ac: "#E0607E", sf: "#3B1420" },
  { id: "terracota", nome: "Terracota e creme", bg: "#FAF4EA", fg: "#2B1D14", ac: "#C2622D", sf: "#F0E4D2" },
  { id: "branco", nome: "Preto e branco", bg: "#FFFFFF", fg: "#111111", ac: "#111111", sf: "#F2F2F2" },
  { id: "rosa", nome: "Rosa e nude", bg: "#FFF5F3", fg: "#3A2026", ac: "#D9677F", sf: "#F7E3DF" },
  { id: "logo", nome: "Cores do meu logótipo", bg: "#101114", fg: "#F4EFE6", ac: "#9B8CFF", sf: "#1C1E25" },
];

// bd: true → esta funcionalidade precisa de base de dados (painel/gestão).
export const FUNCS = [
  { id: "catalogo", titulo: "Catálogo de produtos ou serviços", bd: false },
  { id: "whatsapp", titulo: "Pedidos e contacto por WhatsApp", bd: false },
  { id: "galeria", titulo: "Galeria de fotos e trabalhos", bd: false },
  { id: "video", titulo: "Vídeos", bd: false },
  { id: "mapa", titulo: "Mapa e localização", bd: false },
  { id: "formulario", titulo: "Formulário de contacto", bd: false },
  { id: "painel", titulo: "Painel para eu editar sozinho", bd: true },
  { id: "marcacoes", titulo: "Marcações e reservas", bd: true },
  { id: "clientes", titulo: "Área de clientes (login)", bd: true },
  { id: "noticias", titulo: "Notícias / artigos", bd: true },
];

export function tituloFunc(id: string) {
  return FUNCS.find((f) => f.id === id)?.titulo ?? id;
}
export function tituloTipo(t: Tipo | null) {
  return TIPOS.find((x) => x.id === t)?.titulo ?? "Site";
}
export function paletaDe(id: string) {
  return PALETAS.find((p) => p.id === id) ?? PALETAS[0];
}
export function estiloDe(id: string) {
  return ESTILOS.find((e) => e.id === id) ?? ESTILOS[0];
}

/** Loja, blog e sistema têm painel de gestão → precisam de base de dados (e de domínio próprio). */
export function precisaBD(r: Respostas) {
  return r.tipo === "loja" || r.tipo === "blog" || r.tipo === "sistema" || r.funcs.some((id) => FUNCS.find((f) => f.id === id)?.bd);
}

/** Domínio efectivo: com base de dados, ".vercel.app" não é permitido → passa a ".com". */
export function dominioEfectivo(r: Respostas): Dominio {
  return precisaBD(r) && r.dominio === "vercel" ? "com" : r.dominio;
}

export function orcamentoDe(r: Respostas): Orcamento {
  return calcularOrcamento({ comBaseDados: precisaBD(r), dominio: dominioEfectivo(r), emailsProfissionais: r.emails });
}

/** Simples = sem base de dados e até 4 funcionalidades → 24 h. Caso contrário 48 h. */
export function complexo(r: Respostas) {
  return precisaBD(r) || r.funcs.length > 4;
}
export function prazoDe(r: Respostas) {
  return complexo(r) ? "48 horas" : "24 horas";
}

export function nomeProjecto(r: Respostas) {
  const n = r.negocio.trim() || "o teu negócio";
  const base = { site: "Site", loja: "Loja online", blog: "Blog", sistema: "Sistema" }[r.tipo ?? "site"];
  return `${base} ${n}`;
}

export function estrategiaDe(r: Respostas): string[] {
  const pts: string[] = [];
  if (r.tipo === "loja") pts.push("Catálogo com fotos grandes, preços claros e pedido em 1 toque.");
  else if (r.tipo === "blog") pts.push("Artigos fáceis de ler no telemóvel e de partilhar nas redes.");
  else if (r.tipo === "sistema") pts.push("Fluxo desenhado à volta da forma como a tua equipa trabalha.");
  else pts.push("Página principal que explica em 5 segundos o que fazes e porque escolher-te.");
  pts.push(`Visual ${estiloDe(r.estilo).titulo.toLowerCase()} com a paleta "${paletaDe(r.paleta).nome}", pensado primeiro para telemóvel.`);
  if (r.funcs.includes("whatsapp") || r.tipo !== "sistema") pts.push("Botões de WhatsApp com mensagem pronta, para converter visitas em conversas.");
  if (precisaBD(r)) pts.push("Painel de gestão próprio: alteras conteúdos e acompanhas tudo sem depender de ninguém.");
  if (r.trafego === "sim" || r.trafego === "talvez") pts.push("Preparado para anúncios no Facebook, Instagram e Google desde o primeiro dia.");
  if (termosEscolhidos(r).length) pts.push(`Página de termos de serviço redigida a partir das ${termosEscolhidos(r).length} regras que escolheste.`);
  pts.push("Optimizado para Google (SEO), carregamento rápido e imagem de partilha nas redes.");
  return pts.slice(0, 5);
}

/** Valores 0–100 para o gráfico "prioridades do teu projecto" — calculados a partir das respostas. */
export function prioridadesDe(r: Respostas) {
  const tem = (id: string) => (r.funcs.includes(id) ? 1 : 0);
  const clamp = (n: number) => Math.max(18, Math.min(100, Math.round(n)));
  return [
    { nome: "Imagem", v: clamp(55 + (r.estilo === "elegante" ? 25 : 15) + tem("galeria") * 12 + tem("video") * 8) },
    { nome: "Vendas", v: clamp((r.tipo === "loja" ? 80 : 45) + tem("catalogo") * 12 + tem("whatsapp") * 10) },
    { nome: "Confiança", v: clamp(60 + tem("mapa") * 10 + tem("formulario") * 8 + (r.tipo === "site" ? 12 : 6)) },
    { nome: "Gestão", v: clamp((precisaBD(r) ? 70 : 25) + tem("painel") * 15 + tem("clientes") * 10) },
    { nome: "Alcance", v: clamp(45 + (r.trafego === "sim" ? 40 : r.trafego === "talvez" ? 22 : 0) + tem("noticias") * 12) },
  ];
}

/** O que o cliente deve anexar no WhatsApp, conforme as respostas. */
export function anexosDe(r: Respostas): string[] {
  const a = ["O logótipo (se tiveres)"];
  if (r.tipo === "loja" || r.funcs.includes("catalogo")) a.push("Fotos dos produtos ou serviços, com os preços");
  if (r.funcs.includes("galeria")) a.push("Fotos de trabalhos já feitos");
  a.push("Fotos do espaço, da equipa ou tuas (as que queres no site)");
  if (r.paleta === "logo") a.push("O logótipo em boa qualidade (usamos as cores dele)");
  return a;
}

// ---------- Termos de serviço do site do cliente ----------
// Cláusulas prontas: o cliente só escolhe as que se aplicam. {n} é substituído pelo nome do negócio.
// para = tipos de projecto onde aparecem; func = aparecem também se essa funcionalidade foi escolhida.
export interface Clausula {
  id: string;
  curto: string; // resumo usado na mensagem de WhatsApp
  texto: string;
  para: Tipo[];
  func?: string;
}

const TODOS: Tipo[] = ["site", "loja", "blog", "sistema"];

export const CLAUSULAS: Clausula[] = [
  { id: "autoria", curto: "Direitos sobre os conteúdos", texto: "Os textos, imagens e marca deste site pertencem a {n} e não podem ser copiados sem autorização.", para: TODOS },
  { id: "precos", curto: "Preços podem mudar", texto: "Os preços e as informações apresentadas podem ser actualizados sem aviso prévio.", para: ["site", "loja", "sistema"] },
  { id: "dados", curto: "Uso dos dados dos visitantes", texto: "Os dados enviados pelos visitantes são usados apenas para responder aos seus pedidos e nunca são vendidos.", para: TODOS },
  { id: "reclamacoes", curto: "Dúvidas e reclamações", texto: "Dúvidas e reclamações são tratadas pelos contactos oficiais indicados neste site.", para: TODOS },
  { id: "orcamentos", curto: "Orçamentos sem compromisso", texto: "Os orçamentos pedidos pelo site só se tornam compromisso depois de confirmados por escrito.", para: ["site", "sistema"] },
  { id: "horario", curto: "Resposta em horário de expediente", texto: "Os pedidos de contacto são respondidos em horário de expediente.", para: ["site", "loja", "sistema"] },
  { id: "servicos", curto: "Condições acordadas por cliente", texto: "Os serviços são prestados de acordo com as condições acordadas com cada cliente.", para: ["site", "sistema"] },
  { id: "confirmacao", curto: "Encomenda confirmada após pagamento", texto: "As encomendas só ficam confirmadas depois de confirmado o pagamento.", para: ["loja"], func: "catalogo" },
  { id: "entregas", curto: "Prazos de entrega indicativos", texto: "Os prazos de entrega são indicativos e dependem da zona de entrega.", para: ["loja"] },
  { id: "portes", curto: "Custos de entrega informados antes", texto: "Os custos de entrega são indicados ao cliente antes de confirmar o pedido.", para: ["loja"] },
  { id: "trocas", curto: "Trocas em 7 dias", texto: "Aceitamos trocas ou devoluções até 7 dias após a entrega, com o produto em perfeito estado e o comprovativo de compra.", para: ["loja"] },
  { id: "sem-trocas", curto: "Sem devolução de personalizados/perecíveis", texto: "Não são aceites devoluções de produtos personalizados ou perecíveis.", para: ["loja"] },
  { id: "fotos", curto: "Fotos ilustrativas", texto: "As fotos dos produtos são ilustrativas e podem existir pequenas diferenças de cor ou acabamento.", para: ["loja"], func: "catalogo" },
  { id: "informativo", curto: "Artigos informativos", texto: "Os artigos têm carácter informativo e não substituem aconselhamento profissional.", para: ["blog"], func: "noticias" },
  { id: "comentarios", curto: "Moderação de comentários", texto: "Comentários ofensivos, enganosos ou publicitários podem ser removidos.", para: ["blog"], func: "noticias" },
  { id: "partilha", curto: "Partilha com indicação da fonte", texto: "A partilha de artigos é permitida desde que seja indicada a fonte.", para: ["blog"], func: "noticias" },
  { id: "conta", curto: "Responsabilidade pela conta", texto: "Cada utilizador é responsável por manter confidenciais os dados de acesso à sua conta.", para: ["sistema"], func: "clientes" },
  { id: "suspensao", curto: "Suspensão por uso indevido", texto: "O acesso pode ser suspenso em caso de uso indevido ou violação destes termos.", para: ["sistema"], func: "clientes" },
  { id: "marcacoes", curto: "Cancelamento até 24 h antes", texto: "As marcações podem ser alteradas ou canceladas até 24 horas antes da hora marcada.", para: ["sistema"], func: "marcacoes" },
  { id: "faltas", curto: "Faltas sem aviso", texto: "Faltas sem aviso prévio podem impedir novas marcações online.", para: ["sistema"], func: "marcacoes" },
  { id: "confidencial", curto: "Dados tratados com confidencialidade", texto: "Os dados guardados no sistema são tratados com confidencialidade e só pessoas autorizadas lhes têm acesso.", para: ["sistema"], func: "clientes" },
];

/** Cláusulas a mostrar conforme o tipo de projecto e as funcionalidades escolhidas. */
export function clausulasPara(r: Respostas): Clausula[] {
  const t = r.tipo ?? "site";
  return CLAUSULAS.filter((c) => c.para.includes(t) || (c.func && r.funcs.includes(c.func)));
}

export function textoClausula(c: Clausula, r: Respostas) {
  return c.texto.replace("{n}", r.negocio.trim() || "o negócio");
}

/** Só as escolhidas que ainda se aplicam (se o cliente mudar de tipo, as outras deixam de contar). */
export function termosEscolhidos(r: Respostas): Clausula[] {
  return clausulasPara(r).filter((c) => r.termos.includes(c.id));
}
