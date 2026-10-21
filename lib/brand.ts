// Dados públicos da A Bilonai Group. Para mudar o número de WhatsApp ou os textos, edita SÓ aqui.
export const brand = {
  nome: "A Bilonai Group",
  assinatura: "Profissionalismo, confiança e vendas.",
  agente: "Edvaldo Eduardo",
  cidade: "Huambo, Angola",
  whatsapp: "244955968159", // formato internacional, sem "+" nem espaços (usado no wa.me)
  whatsappVisivel: "+244 955 968 159",
  email: "suporte@bilonai.com",
  taxaKzPorEur: 1055, // 1 € = 1055 Kz (clientes de Portugal)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bilonaigroup.vercel.app",
};

export function waLink(texto?: string) {
  return `https://wa.me/${brand.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}
