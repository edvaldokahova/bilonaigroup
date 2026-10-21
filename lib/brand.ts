// Dados públicos da A Bilonai Group. Para mudar o número de WhatsApp ou os textos, edita SÓ aqui.
export const brand = {
  nome: "A Bilonai Group",
  assinatura: "Profissionalismo, confiança e vendas.",
  agente: "Edvaldo Eduardo", // nome usado só nas páginas legais (termos e privacidade)
  agentePublico: "Agente oficial", // como o agente aparece no resto do site
  cidade: "Huambo, Angola",
  whatsapp: "244955968159", // formato internacional, sem "+" nem espaços (usado no wa.me)
  whatsappVisivel: "+244 955 968 159",
  email: "suporte@bilonai.com",
  taxaKzPorEur: 1055, // 1 € = 1055 Kz (clientes de Portugal)
  // Dados de pagamento que aparecem na fatura pró-forma (descarregada no fim do pedido).
  pagamento: {
    multicaixaExpress: "923220191",
    titular: "Edvaldo Eugénio Cahova Eduardo",
    banco: "BAI — Banco Angolano de Investimentos",
    iban: "AO06 0040 0000 8147 0835 1018 0",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bilonaigroup.vercel.app",
};

export function waLink(texto?: string) {
  return `https://wa.me/${brand.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}
