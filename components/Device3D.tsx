"use client";
// Portátil + telemóvel em 3D (CSS 3D, sem bibliotecas). Roda suavemente com o rato e com o scroll.
// No ecrã passam trabalhos reais da agência e uma demonstração do "teu" site.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Clock } from "lucide-react";
import MiniSite from "./MiniSite";
import WaIcon from "./WaIcon";

const SLIDES = [
  { d: "/portfolio/lamptech.webp", m: "/portfolio/lamptech-m.webp", nome: "LampTech" },
  { d: "/portfolio/gidia.webp", m: "/portfolio/gidia-m.webp", nome: "Gídia" },
  { demo: true, nome: "O teu negócio" },
] as const;

export default function Device3D() {
  const rig = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = reduce ? 0 : window.setInterval(() => setI((x) => (x + 1) % SLIDES.length), 3800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = rig.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = { x: 0, y: 0, tx: 0, ty: 0, sc: 0 };
    let raf = 0;
    const apply = () => {
      s.x += (s.tx - s.x) * 0.06;
      s.y += (s.ty - s.y) * 0.06;
      const rx = 10 - s.y * 7 + s.sc * 16;
      const ry = -20 + s.x * 14 + s.sc * 10;
      el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
      if (Math.abs(s.tx - s.x) > 0.001 || Math.abs(s.ty - s.y) > 0.001) raf = requestAnimationFrame(apply);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      s.tx = (e.clientX / window.innerWidth) * 2 - 1;
      s.ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const onScroll = () => {
      s.sc = Math.min(1, window.scrollY / window.innerHeight);
      kick();
    };
    apply();
    if (reduce) return;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="p3d relative mx-auto w-full max-w-[620px] select-none" aria-hidden>
      {/* brilho de chão */}
      <div className="absolute -bottom-10 left-1/2 h-24 w-[90%] -translate-x-1/2 rounded-[50%] bg-gold/25 blur-3xl" />
      <div ref={rig} className="s3d relative" style={{ transform: "rotateX(10deg) rotateY(-20deg)" }}>
        {/* anéis do símbolo, ao fundo */}
        <div className="absolute left-1/2 top-[38%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2" style={{ transform: "translateZ(-180px)" }}>
          <svg viewBox="-50 -50 100 100" className="h-full w-full opacity-45">
            <circle r="46" fill="none" stroke="#D4A936" strokeWidth=".5" strokeDasharray="230 59" className="origin-center animate-spin3" />
            <circle r="34" fill="none" stroke="#F3D77A" strokeWidth=".35" strokeDasharray="160 54" className="origin-center animate-spin3-rev" />
          </svg>
        </div>

        {/* portátil */}
        <div className="s3d relative">
          <div className="relative rounded-[18px] bg-gradient-to-b from-[#2a2d34] to-[#121318] p-[1.6%] shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] ring-1 ring-white/10">
            <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-gold/30" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-night">
              {SLIDES.map((sl, k) => (
                <div key={sl.nome} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: k === i ? 1 : 0 }}>
                  {"demo" in sl ? (
                    <MiniSite nome="O teu negócio" ramo="O teu ramo" tipo="loja" serif bg="#0B0C0F" fg="#F4EFE6" ac="#D4A936" sf="#17191F" />
                  ) : (
                    <Image src={sl.d} alt="" fill sizes="(max-width: 768px) 90vw, 600px" className="object-cover object-top" priority={k === 0} />
                  )}
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[.04] to-white/10" />
            </div>
          </div>
          {/* base do portátil */}
          <div className="absolute left-[-7%] top-full h-[46%] w-[114%] origin-top rounded-b-[22px] bg-gradient-to-b from-[#3a3d45] via-[#1c1e23] to-[#0d0e11] ring-1 ring-white/10" style={{ transform: "rotateX(76deg)" }}>
            <div className="mx-auto mt-[6%] h-[58%] w-[86%] rounded-lg bg-black/40" />
          </div>
        </div>

        {/* telemóvel */}
        <div className="absolute -bottom-[16%] right-[-4%] w-[27%] sm:right-[-8%]" style={{ transform: "translateZ(110px) rotateY(-6deg)" }}>
          <div className="rounded-[22px] bg-gradient-to-b from-[#34373f] to-[#111216] p-[5%] shadow-[0_30px_80px_-20px_rgba(0,0,0,.95)] ring-1 ring-gold/30">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[16px] bg-night">
              {SLIDES.map((sl, k) => (
                <div key={sl.nome} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: k === i ? 1 : 0 }}>
                  {"demo" in sl ? (
                    <div className="flex h-full flex-col justify-end gap-2 bg-[radial-gradient(120%_70%_at_50%_10%,rgba(212,169,54,.5),#0B0C0F_70%)] p-3">
                      <div className="font-display text-[13px] leading-tight text-cream">O teu negócio<span className="text-gold">.</span></div>
                      <div className="h-1.5 w-3/4 rounded bg-white/15" />
                      <div className="mt-1 rounded-full bg-gold py-1.5 text-center text-[8px] font-bold text-night">Fazer pedido</div>
                    </div>
                  ) : (
                    <Image src={sl.m} alt="" fill sizes="160px" className="object-cover object-top" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* cartões flutuantes */}
        <div className="glass absolute left-[-2%] top-[4%] flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-2xl sm:-left-[8%]" style={{ transform: "translateZ(150px)" }}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-wa text-white"><WaIcon size={18} /></span>
          <span className="text-[11px] leading-tight sm:text-xs">
            <b className="block text-cream">Novo pedido</b>
            <span className="text-cream-dim">via WhatsApp</span>
          </span>
        </div>
        <div className="glass absolute -left-[2%] bottom-[2%] hidden items-center gap-2 rounded-2xl px-3 py-2.5 shadow-2xl sm:flex" style={{ transform: "translateZ(90px)" }}>
          <Clock size={16} className="text-gold" />
          <span className="text-xs text-cream">Pronto em 24–48 h</span>
        </div>
        <div className="glass absolute right-[14%] -top-[8%] flex items-center gap-2 rounded-full px-3 py-2 shadow-2xl" style={{ transform: "translateZ(60px)" }}>
          <Check size={14} className="text-gold" />
          <span className="text-[11px] text-cream sm:text-xs">{SLIDES[i].nome}</span>
        </div>
      </div>
    </div>
  );
}
