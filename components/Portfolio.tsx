import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import Titulo from "./Titulo";

export default function Portfolio() {
  return (
    <section id="trabalhos" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(212,169,54,.07),transparent_70%)]" />
      <div className="wrap relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Titulo n="02" kicker="Trabalho entregue" texto="Uma selecção de projectos recentes. Cada um com identidade própria; nenhum nasceu de um modelo pronto.">
            Marcas reais. <span className="text-gold-grad italic">Já no ar.</span>
          </Titulo>
        </div>

        <div className="p3d mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal key={p.nome} delay={i * 120} className={`h-full ${i === 1 ? "lg:translate-y-10" : ""}`}>
              <Tilt className="group h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-night-2 shadow-[0_50px_120px_-50px_rgba(0,0,0,.95)] transition-colors duration-500 group-hover:border-gold/40">
                  <div className="flex items-center gap-1.5 border-b border-white/[.08] bg-night-3/60 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 truncate rounded-full bg-white/[.05] px-3 py-0.5 text-[11px] text-cream-dim">{p.url ? p.url.replace(/^https?:\/\//, "") : p.nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "")}</span>
                  </div>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image src={p.img} alt={`Site ${p.nome}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-2 via-transparent to-transparent opacity-70" />
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(243,215,122,.18), transparent 60%)" }} />
                  </div>
                  <div className="flex flex-1 items-end justify-between gap-4 p-6">
                    <div>
                      <p className="font-display text-sm italic text-gold/80">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-1 font-display text-[24px] leading-tight">{p.nome}</h3>
                      <p className="mt-1 text-sm text-cream-dim">{p.categoria}</p>
                    </div>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver o site ${p.nome}`} title="Ver site" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-cream/80 transition-colors hover:border-gold/60 hover:text-gold"><ArrowUpRight size={18} /></a>
                    )}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
