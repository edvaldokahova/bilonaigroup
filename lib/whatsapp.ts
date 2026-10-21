// Monta a mensagem final do pedido e o link do WhatsApp da agência.
import { brand, waLink } from "./brand";
import { formatEur, formatKz, kzParaEur } from "./pricing";
import {
  type Respostas,
  dominioEfectivo,
  orcamentoDe,
  prazoDe,
  precisaBD,
  tituloFunc,
  tituloTipo,
  paletaDe,
  estiloDe,
  termosEscolhidos,
} from "./fluxo";
import { datasFatura } from "./fatura";

const LIMITE_URL = 4000; // tamanho máximo seguro do texto já codificado no link wa.me

const DOM = { vercel: "endereço .vercel.app (sem domínio próprio)", com: ".com", ao: ".ao" } as const;

function eur(kz: number) {
  return `≈ ${formatEur(kzParaEur(kz, brand.taxaKzPorEur))}`;
}

function corta(s: string, n: number) {
  const t = s.trim().replace(/\s+/g, " ");
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}

export function montarMensagem(r: Respostas, aceiteEm: Date, maxLivre = 160): string {
  const o = orcamentoDe(r);
  const pt = r.pais === "PT";
  const dom = dominioEfectivo(r);
  const linhas: string[] = [];
  const nome = corta(r.nome, 60) || "um cliente";
  const neg = corta(r.negocio, 60);

  linhas.push(`Olá! 👋 Sou ${nome}${neg ? `, do negócio *${neg}*` : ""}.`);
  linhas.push(`Fiz o meu pedido no site da ${brand.nome} e quero avançar:`);
  linhas.push("");
  linhas.push(`🧩 *Projecto:* ${tituloTipo(r.tipo)}${r.ramo ? ` — ${r.ramo}` : ""}`);
  if (r.oferta.trim()) linhas.push(`✨ *O que ofereço:* ${corta(r.oferta, maxLivre)}`);
  linhas.push(`🎨 *Estilo:* ${estiloDe(r.estilo).titulo} · ${paletaDe(r.paleta).nome}`);
  if (r.funcs.length) linhas.push(`📋 *Quero ter:* ${r.funcs.map(tituloFunc).join(", ")}`);
  if (precisaBD(r)) linhas.push(`🗂 Inclui painel de gestão e base de dados`);
  const domNome = corta(r.dominioNome, 60);
  linhas.push(`🌐 *Domínio:* ${DOM[dom]}${domNome && dom !== "vercel" ? ` (${domNome})` : ""}${r.emails > 0 && dom !== "vercel" ? ` · ✉️ ${r.emails === 1 ? "1 email profissional" : `${r.emails} emails profissionais`}` : ""}`);
  const contactos = [
    r.cidade.trim() && `📍 ${corta(r.cidade, 40)}`,
    r.whatsapp.trim() && `WhatsApp ${corta(r.whatsapp, 25)}`,
    r.instagram.trim() && `IG ${corta(r.instagram, 40)}`,
    r.facebook.trim() && `FB ${corta(r.facebook, 60)}`,
  ].filter(Boolean);
  if (contactos.length) linhas.push(`📇 *Contactos do negócio:* ${contactos.join(" · ")}`);
  const legais = [corta(r.denominacao, 80), r.nif.trim() && `NIF ${corta(r.nif, 20)}`].filter(Boolean);
  if (legais.length) linhas.push(`🏛 *Dados legais:* ${legais.join(" · ")}`);
  const termos = termosEscolhidos(r);
  if (termos.length) linhas.push(`📜 *Termos do meu site:* ${termos.map((c) => c.curto).join("; ")}`);
  if (r.notasTermos.trim()) linhas.push(`📝 *Notas:* ${corta(r.notasTermos, maxLivre)}`);
  if (r.trafego) linhas.push(`📣 *Anúncios (tráfego pago):* ${{ sim: "Sim, quero", talvez: "Talvez, quero saber mais", nao: "Agora não" }[r.trafego]}`);
  linhas.push("");
  linhas.push(`💰 *Total a pagar:* ${formatKz(o.total)}${pt ? ` (${eur(o.total)})` : ""}`);
  if (o.emailsExtraTotal > 0) linhas.push(`   (base ${formatKz(o.base)} + emails ${formatKz(o.emailsExtraTotal)})`);
  if (o.anual.total > 0) linhas.push(`🔁 Renovação anual a partir do 2.º ano: ${formatKz(o.anual.total)}${pt ? ` (${eur(o.anual.total)})` : ""}`);
  linhas.push(`⏱ *Prazo:* ${prazoDe(r)}`);
  const f = datasFatura(r, aceiteEm);
  linhas.push(`🧾 *Fatura pró-forma:* ${f.numero} (válida até ${f.vencimentoTxt})`);
  linhas.push("");
  const data = aceiteEm.toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "short" });
  linhas.push(`✅ Li e aceitei os termos (pagamento só depois da entrega; 15 dias + 5 de tolerância) em ${data}.`);
  linhas.push("");
  linhas.push(`📎 Vou anexar o logótipo e as fotos já a seguir nesta conversa.`);
  return linhas.join("\n");
}

/** Devolve a mensagem e o link, encurtando o texto livre se o link ficar demasiado longo. */
export function pedidoWhatsApp(r: Respostas, aceiteEm: Date) {
  let max = 160;
  let msg = montarMensagem(r, aceiteEm, max);
  while (encodeURIComponent(msg).length > LIMITE_URL && max > 40) {
    max -= 30;
    msg = montarMensagem(r, aceiteEm, max);
  }
  return { mensagem: msg, link: waLink(msg) };
}
