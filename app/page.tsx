import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Faixa from "@/components/Faixa";
import Montagem from "@/components/Montagem";
import Portfolio from "@/components/Portfolio";
import { Servicos, ComoFunciona, Precos, Confianca, CtaFinal } from "@/components/Secoes";
import Footer from "@/components/Footer";
import { brand } from "@/lib/brand";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.nome,
  url: brand.url,
  telephone: brand.whatsappVisivel,
  email: brand.email,
  areaServed: ["AO", "PT"],
  address: { "@type": "PostalAddress", addressLocality: "Huambo", addressCountry: "AO" },
  description: "Estúdio digital: criação de sites, lojas online, blogs e sistemas para empresas, entregues em 24 a 48 horas.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Faixa />
        <Montagem />
        <Portfolio />
        <Servicos />
        <ComoFunciona />
        <Precos />
        <Confianca />
        <CtaFinal />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
