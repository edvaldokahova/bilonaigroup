"use client";
// Prévia ao vivo: o mini-site do cliente dentro de um ecrã 3D que acompanha o rato.
import { useRef } from "react";
import MiniSite from "../MiniSite";
import { type Respostas, paletaDe, estiloDe, dominioEfectivo } from "@/lib/fluxo";

export default function Previa({ r, compacta = false }: { r: Respostas; compacta?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = paletaDe(r.paleta);
  const e = estiloDe(r.estilo);
  const slug = (r.negocio.trim() || "o-teu-negocio").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");
  const move = (ev: React.PointerEvent) => {
    if (ev.pointerType !== "mouse" || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    const x = (ev.clientX - b.left) / b.width - 0.5;
    const y = (ev.clientY - b.top) / b.height - 0.5;
    ref.current.style.transform = `rotateY(${-8 + x * 10}deg) rotateX(${6 - y * 8}deg)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div className={`p3d ${compacta ? "" : "py-6"}`} onPointerMove={move} onPointerLeave={leave}>
      <div
        ref={ref}
        className="s3d mx-auto transition-transform duration-500 ease-out [transform:rotateY(-8deg)_rotateX(6deg)]"
      >
        <div className={`relative rounded-2xl bg-gradient-to-b from-[#2a2d34] to-[#121318] p-[1.4%] ring-1 ring-gold/30 ${compacta ? "" : "shadow-[0_50px_120px_-40px_rgba(0,0,0,.95)]"}`}>
          <div className="flex items-center gap-1 px-2 pb-1.5 pt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-2 truncate text-[9px] text-cream-dim">{slug}{{ vercel: ".vercel.app", com: ".com", ao: ".ao" }[dominioEfectivo(r)]}</span>
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-lg transition-colors duration-500">
            <MiniSite nome={r.negocio} ramo={r.ramo} tipo={r.tipo} serif={e.serif} bg={p.bg} fg={p.fg} ac={p.ac} sf={p.sf} funcs={r.funcs} />
          </div>
        </div>
        {!compacta && <div className="mx-auto mt-3 h-6 w-3/4 rounded-[50%] bg-gold/20 blur-2xl" />}
      </div>
    </div>
  );
}
