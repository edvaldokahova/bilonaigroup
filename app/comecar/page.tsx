import type { Metadata } from "next";
import Fluxo from "@/components/fluxo/Fluxo";

export const metadata: Metadata = {
  title: "Começar o meu projecto",
  description: "Descreve o teu negócio em 2 minutos e recebe o orçamento e o prazo na hora.",
  alternates: { canonical: "/comecar" },
};

export default function Comecar() {
  return (
    <main>
      <Fluxo />
    </main>
  );
}
