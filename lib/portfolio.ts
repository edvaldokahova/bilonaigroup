// Trabalhos reais já entregues pela A Bilonai Group.
// img = captura do site (em /public/portfolio). Sem captura, o cartão mostra só o nome.
// url = link público. Deixa "" enquanto não tiveres o link final (o cartão fica sem botão).
export interface Trabalho {
  nome: string;
  categoria: string;
  img?: string;
  imgMobile?: string;
  url: string;
  cor: string; // cor de destaque do cartão
}

export const portfolio: Trabalho[] = [
  { nome: "LampTech", categoria: "Loja de TV Box · Angola", img: "/portfolio/lamptech.webp", imgMobile: "/portfolio/lamptech-m.webp", url: "", cor: "#F3C14B" }, // PREENCHER url
  { nome: "Gídia", categoria: "Comunicação e marketing · Lubango", img: "/portfolio/gidia.webp", imgMobile: "/portfolio/gidia-m.webp", url: "", cor: "#D4A936" }, // PREENCHER url
  { nome: "Eddie Velor", categoria: "Loja de relógios premium", url: "https://www.eddievelor.com", cor: "#C9B48A" },
  { nome: "NK Luzindalalu", categoria: "Agência de viagens · Luanda", url: "", cor: "#2E8F86" }, // PREENCHER url
  { nome: "REDE 29", categoria: "Electricidade e automação", url: "", cor: "#E2A23B" }, // PREENCHER url
  { nome: "ABA", categoria: "Site institucional", url: "", cor: "#8FA7FF" }, // PREENCHER url
  { nome: "Benerluzi", categoria: "Imobiliário", url: "", cor: "#C98B5A" }, // PREENCHER url
  { nome: "FisioUíge", categoria: "Clínica de fisioterapia · Uíge", url: "", cor: "#4FB3A5" }, // PREENCHER url
];
