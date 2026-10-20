// Trabalhos reais já entregues pela A Bilonai Group (aparecem na secção "Trabalhos entregues").
// img = captura do site (em /public/portfolio). url = link público ("" enquanto não houver; o cartão fica sem botão).
export interface Trabalho {
  nome: string;
  categoria: string;
  img: string;
  url: string;
}

export const portfolio: Trabalho[] = [
  { nome: "LampTech", categoria: "Loja de TV Box · Angola", img: "/portfolio/lamptech.webp", url: "" }, // PREENCHER url
  { nome: "Gídia", categoria: "Comunicação e marketing · Lubango", img: "/portfolio/gidia.webp", url: "" }, // PREENCHER url
  { nome: "Angola Business Academy", categoria: "Consultoria e formação · Luanda", img: "/portfolio/aba.webp", url: "https://aba-opal.vercel.app" },
];
