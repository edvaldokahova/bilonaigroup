// Motor de preços — A Bilonai Group. Fonte única de verdade (usada no formulário, veredito, contrato e fatura).
// Todos os valores em Kz. Para mudar preços, edita SÓ este objecto.

export const PRECOS = {
  semBD: { vercel: 13997, com: 26997, ao: 39997 },
  comBD: { com: 34700, ao: 46700 }, // domínio personalizado é obrigatório
  emailExtra: 2500, // cada email profissional além do bónus
  emailBonusComBD: 1,
  anual: { baseDados: 6000, dominio: { com: 16900, ao: 35000 } }, // a partir do 2.º ano
} as const;

export type Dominio = "vercel" | "com" | "ao";

export interface Escolha {
  comBaseDados: boolean;
  dominio: Dominio; // com BD, "vercel" não é permitido
  emailsProfissionais: number; // total pretendido
}

export interface Orcamento {
  base: number;
  emailsExtra: number;
  emailsExtraTotal: number;
  total: number;
  anual: { baseDados: number; dominio: number; total: number };
  erro?: string;
}

export function calcularOrcamento(e: Escolha): Orcamento {
  const vazio = { baseDados: 0, dominio: 0, total: 0 };
  if (e.comBaseDados && e.dominio === "vercel") {
    return { base: 0, emailsExtra: 0, emailsExtraTotal: 0, total: 0, anual: vazio, erro: "Sistemas com base de dados exigem domínio próprio (.com ou .ao)." };
  }
  const base = e.comBaseDados ? PRECOS.comBD[e.dominio as "com" | "ao"] : PRECOS.semBD[e.dominio];
  const emails = e.dominio === "vercel" ? 0 : Math.max(0, e.emailsProfissionais);
  const bonus = e.comBaseDados ? PRECOS.emailBonusComBD : 0;
  const emailsExtra = Math.max(0, emails - bonus);
  const emailsExtraTotal = emailsExtra * PRECOS.emailExtra;
  const anualBD = e.comBaseDados ? PRECOS.anual.baseDados : 0;
  const anualDom = e.dominio === "vercel" ? 0 : PRECOS.anual.dominio[e.dominio];
  return {
    base,
    emailsExtra,
    emailsExtraTotal,
    total: base + emailsExtraTotal,
    anual: { baseDados: anualBD, dominio: anualDom, total: anualBD + anualDom },
  };
}

export function kzParaEur(kz: number, taxa: number) {
  return Math.round((kz / taxa) * 100) / 100; // taxa = Kz por 1 €
}

// Formatação manual (13.997 Kz) para ser igual no servidor e no navegador.
export function formatKz(v: number) {
  return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz";
}

export function formatEur(v: number) {
  const [i, d] = v.toFixed(2).split(".");
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + d + " €";
}
