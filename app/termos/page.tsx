import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { brand } from "@/lib/brand";
import { PRECOS, formatKz } from "@/lib/pricing";

export const metadata: Metadata = { title: "Termos do serviço", alternates: { canonical: "/termos" } };

export default function Termos() {
  return (
    <LegalPage titulo="Termos do serviço" actualizado="Outubro de 2026">
      <p>Estes termos aplicam-se aos pedidos de criação de sites, lojas online, blogs e sistemas feitos à {brand.nome} ({brand.cidade}). Ao confirmares que aceitas os termos e enviares o pedido pelo WhatsApp, concordas com o que está abaixo.</p>
      <h2>1. Como funciona o pedido</h2>
      <ul>
        <li>Preenches o formulário no site e vês o orçamento e o prazo calculados na hora.</li>
        <li>O pedido só fica feito quando envias a mensagem pelo WhatsApp para {brand.whatsappVisivel}, com o logótipo e as imagens que queres no site.</li>
        <li>Confirmamos contigo os detalhes pelo WhatsApp antes de começar.</li>
      </ul>
      <h2>2. Prazo de entrega</h2>
      <ul>
        <li>Projectos simples (sem painel de gestão): 24 horas. Projectos com painel de gestão ou mais funcionalidades: 48 horas.</li>
        <li>O prazo conta a partir do momento em que recebemos o logótipo, as imagens e as informações necessárias.</li>
        <li>Se o prazo não puder ser cumprido, um agente entra em contacto contigo para combinar a entrega.</li>
      </ul>
      <h2>3. Preço e pagamento</h2>
      <ul>
        <li>O preço é o que aparece no orçamento do formulário. É um pagamento único pela criação do projecto.</li>
        <li>O pagamento é feito <b>depois</b> da entrega: enviamos-te o link do site pelo WhatsApp e tu envias o comprovativo de pagamento pela mesma conversa.</li>
        <li>Depois da entrega tens 15 dias para pagar, com mais 5 dias de tolerância. Se o pagamento não for feito nesse período, o projecto é encerrado e o site deixa de estar disponível.</li>
        <li>Clientes em Portugal vêem também o valor aproximado em euros (taxa usada: 1 € = {brand.taxaKzPorEur} Kz).</li>
      </ul>
      <h2>4. Renovações</h2>
      <ul>
        <li>A partir do 2.º ano há uma renovação anual: domínio .com {formatKz(PRECOS.anual.dominio.com)}, domínio .ao {formatKz(PRECOS.anual.dominio.ao)} e base de dados {formatKz(PRECOS.anual.baseDados)} (quando o projecto tem painel de gestão).</li>
        <li>Projectos com endereço .vercel.app e sem base de dados não têm renovação anual.</li>
      </ul>
      <h2>5. Conteúdos</h2>
      <ul>
        <li>És responsável pelos textos, imagens e logótipos que nos envias e por teres o direito de os usar.</li>
        <li>Alterações depois da entrega são combinadas pelo WhatsApp.</li>
      </ul>
      <h2>6. Contacto</h2>
      <p>Qualquer dúvida: WhatsApp {brand.whatsappVisivel} ({brand.agente}) ou email <a href={`mailto:${brand.email}`} className="text-gold hover:underline">{brand.email}</a>.</p>
    </LegalPage>
  );
}
