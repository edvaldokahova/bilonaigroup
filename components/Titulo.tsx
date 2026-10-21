// Cabeçalho editorial das secções: número, etiqueta, título e texto de apoio.
import Reveal from "./Reveal";

export default function Titulo({ n, kicker, children, texto, centro = false, className = "" }: { n: string; kicker: string; children: React.ReactNode; texto?: string; centro?: boolean; className?: string }) {
  return (
    <Reveal className={`${centro ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className={`kicker flex items-center gap-3 ${centro ? "justify-center" : ""}`}>
        <span className="tabular-nums text-cream/35">{n}</span>
        <span className="h-px w-8 bg-gold/50" />
        {kicker}
      </p>
      <h2 className="h-display mt-5 text-[38px] sm:text-5xl lg:text-[56px]">{children}</h2>
      {texto && <p className="mt-5 text-[16px] leading-relaxed text-cream/65">{texto}</p>}
    </Reveal>
  );
}
