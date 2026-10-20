import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacidade", alternates: { canonical: "/privacidade" } };

export default function Privacidade() {
  return (
    <LegalPage titulo="Privacidade" actualizado="Outubro de 2026">
      <p>Levamos a tua privacidade a sério. Esta página explica, de forma simples, o que acontece com as informações que escreves no nosso site.</p>
      <h2>O site não guarda os teus dados</h2>
      <ul>
        <li>O formulário funciona inteiramente no teu navegador. As respostas não são enviadas nem guardadas em nenhum servidor nosso.</li>
        <li>Para não perderes o que já escreveste, o navegador guarda um rascunho temporário que desaparece quando fechas o separador.</li>
      </ul>
      <h2>Quando é que recebemos a informação</h2>
      <ul>
        <li>Só recebemos o teu pedido quando tu decides enviar a mensagem pelo WhatsApp. A partir daí, a conversa e as imagens que anexares ficam no WhatsApp, sujeitas também às regras de privacidade do WhatsApp.</li>
        <li>Usamos essas informações apenas para criar o teu projecto e falar contigo sobre ele. Não vendemos nem partilhamos os teus dados com terceiros.</li>
      </ul>
      <h2>Os teus direitos</h2>
      <p>Podes pedir-nos a qualquer momento que apaguemos a conversa e as informações do teu pedido, pelo WhatsApp {brand.whatsappVisivel}.</p>
    </LegalPage>
  );
}
