import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
  areaServed: ["AO", "PT"],
  address: { "@type": "PostalAddress", addressLocality: "Huambo", addressCountry: "AO" },
  description: "Criação de sites, lojas online, blogs e sistemas para empresas.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
