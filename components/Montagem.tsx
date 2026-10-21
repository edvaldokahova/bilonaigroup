"use client";
// "O ouro a tornar-se site": ao fazer scroll, o site desmonta-se em 5 camadas 3D e volta a montar-se.
import { useEffect, useRef, useState } from "react";
import { Compass, Palette, PenLine, Code, Rocket } from "lucide-react";

const CAMADAS = [
  { icon: Compass, t: "Estratégia", d: "Antes do design, o negócio: quem é o teu cliente, o que o faz comprar e o que te distingue." },
  { icon: Palette, t: "Design", d: "Direcção visual exclusiva para a tua marca, desenhada primeiro para o ecrã do telemóvel." },
  { icon: PenLine, t: "Conteúdo", d: "Textos escritos para vender e imagens tratadas com rigor, secção a secção." },
  { icon: Code, t: "Tecnologia", d: "Carregamento rápido mesmo com rede fraca, segurança e optimização para o Google." },
  { icon: Rocket, t: "Conversão", d: "Cada página termina numa acção: um pedido, uma reserva, uma conversa no WhatsApp." },
];

function Camada({ k }: { k: number }) {
  // Cada camada ocupa a sua zona: montadas, formam um site completo; separadas, mostram o processo.
  if (k === 0)
    return (
      <div className="absolute inset-0">
        <div className="flex items-center justify-between border-b border-white/10 px-[5%] py-[3.5%]">
          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gold" /><span className="h-1.5 w-14 rounded bg-white/30" /></div>
          <div className="flex gap-3"><span className="h-1.5 w-8 rounded bg-white/15" /><span className="h-1.5 w-8 rounded bg-white/15" /><span className="h-1.5 w-8 rounded bg-white/15" /></div>
        </div>
        <div className="absolute inset-x-[5%] bottom-[6%] grid grid-cols-3 gap-[3%]">
          {[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-lg border border-dashed border-gold/35 sm:h-14" />)}
        </div>
      </div>
    );
  if (k === 1)
    return (
      <div className="absolute inset-0">
        <div className="absolute right-[5%] top-[20%] h-[44%] w-[40%] rounded-xl bg-[radial-gradient(circle_at_60%_30%,#F3D77A,#A67C1A_55%,#2a2010)]" />
        <div className="absolute left-[5%] top-[19%] flex gap-1.5">
          {["#D4A936", "#F4EFE6", "#A67C1A"].map((c) => <span key={c} className="h-3 w-3 rounded-full ring-1 ring-white/20" style={{ background: c }} />)}
        </div>
      </div>
    );
  if (k === 2)
    return (
      <div className="absolute left-[5%] top-[28%] w-[48%] space-y-2.5">
        <div className="font-display text-xl leading-none text-cream sm:text-3xl">O teu negócio<span className="text-gold">.</span></div>
        <div className="h-1.5 w-5/6 rounded bg-white/25" />
        <div className="h-1.5 w-3/5 rounded bg-white/15" />
      </div>
    );
  if (k === 3)
    return (
      <div className="absolute right-[7%] top-[23%] flex gap-1 font-mono text-[9px] text-gold sm:text-[10px]">
        {["SEO", "RÁPIDO", "SEGURO"].map((x) => <span key={x} className="rounded border border-gold/40 bg-night/60 px-1.5 py-0.5">{x}</span>)}
      </div>
    );
  return (
    <div className="absolute left-[5%] top-[56%] flex gap-2">
      <span className="rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold text-night sm:px-4 sm:text-xs">Fazer pedido</span>
      <span className="rounded-full bg-wa px-3 py-1.5 text-[10px] font-bold text-white sm:px-4 sm:text-xs">WhatsApp</span>
    </div>
  );
}

export default function Montagem() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [ativa, setAtiva] = useState(0);

  useEffect(() => {
    const s = sec.current, st = stage.current;
    if (!s || !st) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = s.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      // e: 0 = montado, 1 = totalmente separado (sobe e desce como um arco)
      const e = reduce ? 0.6 : Math.sin(Math.min(1, p * 1.08) * Math.PI);
      st.style.setProperty("--e", e.toFixed(3));
      setAtiva(Math.min(CAMADAS.length - 1, Math.floor(p * CAMADAS.length)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  return (
    <section ref={sec} id="processo" className="relative h-[320vh]" aria-label="Como construímos o teu site">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_60%_55%,rgba(212,169,54,.12),transparent_70%)]" />
        <div className="wrap relative grid w-full items-center gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
          <div className="relative z-10">
            <p className="kicker flex items-center gap-3"><span className="tabular-nums text-cream/35">01</span><span className="h-px w-8 bg-gold/50" />O método</p>
            <h2 className="h-display mt-4 text-[30px] sm:text-5xl lg:mt-5">
              Cada site é lapidado <span className="text-gold-grad italic">camada a camada</span>.
            </h2>
            <ol className="mt-6 space-y-2.5 lg:mt-8">
              {CAMADAS.map((c, k) => {
                const I = c.icon;
                const on = k === ativa;
                return (
                  <li key={c.t} className={`gap-4 rounded-2xl border p-3.5 transition-all duration-500 ${on ? "flex border-gold/40 bg-gold/10" : "hidden border-transparent opacity-45 lg:flex"}`}>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${on ? "bg-gold text-night" : "bg-white/5 text-gold"}`}><I size={18} /></span>
                    <span>
                      <b className="block text-[15px] font-semibold">{c.t}</b>
                      <span className={`block text-sm leading-snug text-cream/65 transition-all duration-500 ${on ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:max-h-20 lg:opacity-100"}`}>{c.d}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 flex gap-1.5 lg:hidden" aria-hidden>
              {CAMADAS.map((c, k) => <span key={c.t} className={`h-1 rounded-full transition-all duration-500 ${k === ativa ? "w-8 bg-gold" : "w-3 bg-white/20"}`} />)}
            </div>
          </div>

          <div className="p3d relative mx-auto aspect-[16/11] w-[86%] max-w-[560px] lg:w-full" aria-hidden>
            <div
              ref={stage}
              className="s3d absolute inset-0"
              style={{ transform: "rotateX(calc(var(--e,0) * 52deg)) rotateZ(calc(var(--e,0) * -28deg)) scale(calc(1 - var(--e,0) * .22))" } as React.CSSProperties}
            >
              {CAMADAS.map((c, k) => (
                <div
                  key={c.t}
                  className={`absolute inset-0 overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-500 ${k === ativa ? "border-gold/70 shadow-[0_0_60px_-10px_rgba(212,169,54,.6)]" : k === 0 ? "border-white/10" : "border-white/[.06]"}`}
                  style={{
                    transform: `translateZ(calc(var(--e,0) * ${(k - 2) * 95}px))`,
                    background: k === 0 ? "#0D0E12" : "rgba(17,19,23,calc(var(--e,0) * .45))",
                  }}
                >
                  <Camada k={k} />
                  <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[.25em] text-gold/70" style={{ opacity: "var(--e,0)" } as React.CSSProperties}>{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
