"use client";
// Animação de "análise" (~5 s, pode saltar). Os textos descrevem o que realmente acontece:
// as respostas do cliente são transformadas em estrutura, orçamento e prazo.
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import GoldField from "../GoldField";
import Orbita from "../Orbita";
import { type Respostas } from "@/lib/fluxo";

export default function Analise({ r, onFim }: { r: Respostas; onFim: () => void }) {
  const nome = r.negocio.trim() || "o teu negócio";
  const passos = [
    `A organizar as respostas de ${nome}…`,
    "A desenhar a estrutura do site…",
    "A escolher o estilo e as cores…",
    "A calcular o orçamento e o prazo…",
  ];
  const [k, setK] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const passo = reduce ? 350 : 1150;
    const ids = passos.map((_, i) => window.setTimeout(() => setK(i + 1), passo * (i + 1)));
    const fim = window.setTimeout(onFim, passo * passos.length + 500);
    return () => { ids.forEach(clearTimeout); clearTimeout(fim); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((k / passos.length) * 100);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16">
      <GoldField density={1.2} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_45%,rgba(212,169,54,.18),transparent_70%)]" />

      <Orbita modo="analise" progresso={k / passos.length} className="aspect-square w-64 sm:w-80" />
      <p className="relative -mt-2 font-display text-5xl tabular-nums text-gold-grad">{pct}%</p>
      <p className="relative mt-2 text-xs uppercase tracking-[.3em] text-cream-dim">A preparar a tua proposta</p>

      <ul className="relative mt-10 w-full max-w-sm space-y-3" aria-live="polite">
        {passos.map((t, i) => (
          <li key={t} className={`flex items-center gap-3 text-[15px] transition-all duration-500 ${i < k ? "text-cream" : i === k ? "text-cream/80" : "text-cream/25"}`}>
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${i < k ? "border-gold bg-gold text-night" : "border-white/20"}`}>
              {i < k ? <Check size={13} strokeWidth={3} /> : i === k ? <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> : null}
            </span>
            {t}
          </li>
        ))}
      </ul>

      <button type="button" onClick={onFim} className="relative mt-10 text-sm text-cream-dim underline-offset-4 hover:text-cream hover:underline">Saltar</button>
    </div>
  );
}
