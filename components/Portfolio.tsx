import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

export default function Portfolio() {
  const comFoto = portfolio.filter((p) => p.img);
  const outros = portfolio.filter((p) => !p.img);
  return (
    <section id="trabalhos" className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">Trabalhos entregues</p>
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">Marcas reais. Sites que já estão a trabalhar.</h2>
          <p className="mt-5 text-cream/65">Alguns dos negócios que confiaram em nós. Cada um com uma identidade própria, nenhum feito a partir de um modelo.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {comFoto.map((p, i) => (
            <Reveal key={p.nome} delay={i * 120}>
              <Tilt className="group">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-night-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 truncate text-xs text-cream-dim">{p.nome.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.img!} alt={`Site ${p.nome}`} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(243,215,122,.18), transparent 60%)" }} />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-2xl">{p.nome}</h3>
                      <p className="mt-1 text-sm text-cream-dim">{p.categoria}</p>
                    </div>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !min-h-[44px] !px-4 text-sm">Ver site <ArrowUpRight size={16} /></a>
                    )}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {outros.map((p, i) => {
            const conteudo = (
              <>
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50" style={{ background: p.cor }} />
                <span className="h-1 w-8 rounded-full" style={{ background: p.cor }} />
                <span>
                  <span className="flex items-center gap-1.5 font-display text-xl sm:text-2xl">{p.nome}{p.url && <ArrowUpRight size={16} className="text-gold" />}</span>
                  <span className="mt-1 block text-xs text-cream-dim sm:text-sm">{p.categoria}</span>
                </span>
              </>
            );
            const cls = "group relative flex h-full min-h-[120px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-night-2 p-5 transition-colors hover:border-gold/40";
            return (
              <Reveal key={p.nome} delay={i * 70}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls}>{conteudo}</a>
                ) : (
                  <div className={cls}>{conteudo}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
