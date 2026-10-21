// Fatura pró-forma (documento sem valor fiscal) gerada no navegador, com os dados de pagamento.
// A biblioteca de PDF só é descarregada quando o cliente carrega em "Baixar fatura".
import { brand } from "./brand";
import { formatEur, formatKz, kzParaEur } from "./pricing";
import { type Respostas, complexo, dominioEfectivo, orcamentoDe, precisaBD, tituloTipo } from "./fluxo";

const DIA = 24 * 60 * 60 * 1000;
const PRAZO_PAGAMENTO = 15; // dias depois da entrega (termos)
const TOLERANCIA = 5;

const data = (d: Date) => d.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" });

/** Número, entrega prevista e validade, calculados a partir da data em que o cliente aceitou os termos. */
export function datasFatura(r: Respostas, pedido: Date) {
  const p2 = (n: number) => String(n).padStart(2, "0");
  const ini = (r.negocio.normalize("NFD").replace(/[^A-Za-z]/g, "").slice(0, 2) || "CL").toUpperCase();
  const numero = `BG-${pedido.getFullYear()}${p2(pedido.getMonth() + 1)}${p2(pedido.getDate())}-${p2(pedido.getHours())}${p2(pedido.getMinutes())}${ini}`;
  const entrega = new Date(pedido.getTime() + (complexo(r) ? 2 : 1) * DIA);
  const vencimento = new Date(entrega.getTime() + PRAZO_PAGAMENTO * DIA);
  const limite = new Date(vencimento.getTime() + TOLERANCIA * DIA);
  return { numero, entrega, vencimento, limite, pedidoTxt: data(pedido), entregaTxt: data(entrega), vencimentoTxt: data(vencimento), limiteTxt: data(limite) };
}

// Símbolo da marca desenhado num canvas (o PDF recebe-o como imagem).
function simbolo(px: number) {
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const x = c.getContext("2d")!;
  const k = px / 100;
  x.translate(px / 2, px / 2);
  const g = x.createLinearGradient(-43 * k, -43 * k, 43 * k, 43 * k);
  g.addColorStop(0, "#F3D77A");
  g.addColorStop(0.5, "#D4A936");
  g.addColorStop(1, "#A67C1A");
  x.strokeStyle = g;
  x.lineCap = "round";
  const arco = (r: number, w: number, ini: number, graus: number) => {
    x.lineWidth = w * k;
    x.beginPath();
    x.arc(0, 0, r * k, (ini * Math.PI) / 180, ((ini + graus) * Math.PI) / 180);
    x.stroke();
  };
  arco(40, 6, -60, 293.6);
  arco(25, 5, 120, 275);
  x.fillStyle = "#F4EFE6";
  x.beginPath();
  x.arc(0, 0, 9 * k, 0, Math.PI * 2);
  x.fill();
  return c.toDataURL("image/png");
}

export async function baixarFatura(r: Respostas, pedido: Date) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const o = orcamentoDe(r);
  const f = datasFatura(r, pedido);
  const dom = dominioEfectivo(r);
  const pt = r.pais === "PT";
  const W = 210, M = 18;
  const ouro: [number, number, number] = [166, 124, 26];
  const tinta: [number, number, number] = [24, 24, 27];
  const cinza: [number, number, number] = [110, 110, 118];

  // Cabeçalho
  doc.setFillColor(10, 11, 13);
  doc.rect(0, 0, W, 38, "F");
  doc.addImage(simbolo(240), "PNG", M, 10, 18, 18);
  doc.setTextColor(244, 239, 230);
  doc.setFont("times", "normal");
  doc.setFontSize(15);
  doc.text("A BILONAI GROUP", M + 23, 18.5, { charSpace: 1.2 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(212, 169, 54);
  doc.text(brand.assinatura, M + 23, 24.5);
  doc.setTextColor(244, 239, 230);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("FATURA PRÓ-FORMA", W - M, 18, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`N.º ${f.numero}`, W - M, 24.5, { align: "right" });

  // Datas
  let y = 50;
  const bloco = (x: number, rotulo: string, valor: string) => {
    doc.setFontSize(7.5);
    doc.setTextColor(...cinza);
    doc.text(rotulo.toUpperCase(), x, y, { charSpace: 0.4 });
    doc.setFontSize(10.5);
    doc.setTextColor(...tinta);
    doc.setFont("helvetica", "bold");
    doc.text(valor, x, y + 6);
    doc.setFont("helvetica", "normal");
  };
  bloco(M, "Data do pedido", f.pedidoTxt);
  bloco(M + 45, "Entrega prevista", f.entregaTxt);
  bloco(M + 90, "Válida até", f.vencimentoTxt);
  bloco(M + 135, "Prazo de entrega", complexo(r) ? "48 horas" : "24 horas");

  // De / Para
  y = 70;
  doc.setDrawColor(230, 226, 218);
  doc.line(M, y - 4, W - M, y - 4);
  const coluna = (x: number, titulo: string, linhas: string[]) => {
    doc.setFontSize(7.5);
    doc.setTextColor(...ouro);
    doc.text(titulo.toUpperCase(), x, y + 2, { charSpace: 0.4 });
    doc.setFontSize(9.5);
    linhas.filter(Boolean).forEach((l, i) => {
      doc.setTextColor(...(i === 0 ? tinta : cinza));
      doc.setFont("helvetica", i === 0 ? "bold" : "normal");
      doc.text(doc.splitTextToSize(l, 80)[0], x, y + 8 + i * 5);
    });
    doc.setFont("helvetica", "normal");
  };
  coluna(M, "Emitida por", [brand.nome, brand.cidade, `WhatsApp ${brand.whatsappVisivel}`, brand.email]);
  coluna(W / 2 + 4, "Cliente", [
    r.denominacao.trim() || r.negocio.trim() || r.nome.trim(),
    r.denominacao.trim() && r.negocio.trim() ? r.negocio.trim() : "",
    r.nif.trim() ? `NIF ${r.nif.trim()}` : "",
    r.nome.trim() ? `A/C ${r.nome.trim()}` : "",
    [r.cidade.trim(), r.whatsapp.trim()].filter(Boolean).join(" · "),
  ]);

  // Tabela
  y = 112;
  doc.setFillColor(246, 243, 236);
  doc.rect(M, y, W - 2 * M, 9, "F");
  doc.setFontSize(8);
  doc.setTextColor(...cinza);
  doc.text("DESCRIÇÃO", M + 4, y + 6);
  doc.text("QTD.", W - M - 52, y + 6, { align: "right" });
  doc.text("VALOR", W - M - 4, y + 6, { align: "right" });
  y += 9;
  const domTxt = { vercel: "endereço .vercel.app", com: "domínio .com (1.º ano incluído)", ao: "domínio .ao (1.º ano incluído)" }[dom];
  const linhas: [string, string, string][] = [
    [`${tituloTipo(r.tipo)}${precisaBD(r) ? " com painel de gestão e base de dados" : ""} · ${domTxt}`, "1", formatKz(o.base)],
  ];
  if (precisaBD(r) && r.emails > 0) linhas.push(["Email profissional incluído no plano", "1", formatKz(0)]);
  if (o.emailsExtra > 0) linhas.push(["Emails profissionais adicionais", String(o.emailsExtra), formatKz(o.emailsExtraTotal)]);
  doc.setFontSize(9.5);
  for (const [d, q, v] of linhas) {
    const partes = doc.splitTextToSize(d, 105) as string[];
    doc.setTextColor(...tinta);
    doc.text(partes, M + 4, y + 7);
    doc.text(q, W - M - 52, y + 7, { align: "right" });
    doc.text(v, W - M - 4, y + 7, { align: "right" });
    y += 6 + partes.length * 4.5;
    doc.line(M, y, W - M, y);
  }

  // Total
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(...cinza);
  doc.text("TOTAL A PAGAR", W - M - 60, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...ouro);
  doc.text(formatKz(o.total), W - M - 4, y + 1, { align: "right" });
  doc.setFont("helvetica", "normal");
  if (pt) {
    doc.setFontSize(9);
    doc.setTextColor(...cinza);
    doc.text(`aprox. ${formatEur(kzParaEur(o.total, brand.taxaKzPorEur))} (1 € = ${brand.taxaKzPorEur} Kz)`, W - M - 4, y + 7, { align: "right" });
  }
  if (o.anual.total > 0) {
    doc.setFontSize(8.5);
    doc.setTextColor(...cinza);
    doc.text(`Renovação anual a partir do 2.º ano: ${formatKz(o.anual.total)} (não incluída neste valor).`, M, y + (pt ? 15 : 9));
  }

  // Pagamento
  y += pt ? 24 : 20;
  const p = brand.pagamento;
  const banco = [p.banco && `Banco: ${p.banco}`, p.titular && `Titular: ${p.titular}`, p.iban && `IBAN: ${p.iban}`].filter(Boolean) as string[];
  const altura = 30 + banco.length * 5;
  doc.setDrawColor(...ouro);
  doc.setLineWidth(0.4);
  doc.roundedRect(M, y, W - 2 * M, altura, 3, 3, "S");
  doc.setLineWidth(0.2);
  doc.setFontSize(7.5);
  doc.setTextColor(...ouro);
  doc.text("COMO PAGAR", M + 6, y + 8, { charSpace: 0.4 });
  doc.setFontSize(10);
  doc.setTextColor(...tinta);
  doc.setFont("helvetica", "bold");
  doc.text(`Multicaixa Express: ${p.multicaixaExpress.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`, M + 6, y + 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  banco.forEach((l, i) => doc.text(l, M + 6, y + 21 + i * 5));
  doc.setFontSize(8.5);
  doc.setTextColor(...cinza);
  doc.text(`Indica a referência ${f.numero} e envia o comprovativo pelo WhatsApp ${brand.whatsappVisivel}.`, M + 6, y + altura - 5);

  // Condições
  y += altura + 10;
  doc.setFontSize(7.5);
  doc.setTextColor(...ouro);
  doc.text("CONDIÇÕES", M, y, { charSpace: 0.4 });
  doc.setFontSize(8.5);
  doc.setTextColor(...cinza);
  const cond = [
    "O pagamento é feito só depois da entrega: enviamos o link do projecto pelo WhatsApp e só então pagas.",
    `Prazo de pagamento: ${PRAZO_PAGAMENTO} dias após a entrega (até ${f.vencimentoTxt}, se a entrega for na data prevista), com ${TOLERANCIA} dias de tolerância (até ${f.limiteTxt}). Depois disso o projecto é encerrado.`,
    "A entrega prevista conta a partir da recepção do logótipo, das fotos e das informações necessárias; se a data mudar, o prazo de pagamento acompanha a data real de entrega.",
    "Termos completos em " + brand.url.replace(/^https?:\/\//, "") + "/termos.",
  ];
  y += 5;
  for (const c of cond) {
    const t = doc.splitTextToSize(`•  ${c}`, W - 2 * M) as string[];
    doc.text(t, M, y);
    y += t.length * 4.2 + 1.5;
  }

  // Rodapé
  doc.setFontSize(7.5);
  doc.setTextColor(...cinza);
  doc.text("Documento sem valor fiscal, emitido apenas para informação do valor e dos dados de pagamento.", W / 2, 284, { align: "center" });
  doc.text(`${brand.nome} · ${brand.cidade} · ${brand.email}`, W / 2, 288.5, { align: "center" });

  doc.save(`Fatura-${f.numero}.pdf`);
}
