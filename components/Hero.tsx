import Link from "next/link";
import { ArrowRight, ShieldCheck, Timer, Wallet } from "lucide-react";
import GoldField from "./GoldField";
import Orbita from "./Orbita";

export default function Hero() {
  return (
    <section className="grain relative flex items-center overflow-hidden pb-20 pt-24 sm:pt-28 lg:min-h-[100svh] lg:pb-16 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_72%_45%,rgba(212,169,54,.14),transparent_70%),radial-gradient(50%_40%_at_0%_100%,rgba(212,169,54,.07),transparent_70%)]" />
      <GoldField />
      <div className="wrap relative grid items-center gap-2 lg:grid-cols-[1.08fr_.92fr] lg:gap-6">
        <Orbita modo="hero" className="order-first mx-auto aspect-square w-[min(68vw,270px)] sm:w-[340px] lg:order-last lg:w-full lg:max-w-[600px]" />

        <div className="text-center lg:text-left">
          <p className="kicker animate-rise">Estúdio digital · Huambo, Angola</p>
          <h1 className="h-display mt-5 animate-rise text-[42px] [animation-delay:.08s] sm:text-6xl lg:mt-6 lg:text-[66px] xl:text-[76px]">
            O padrão das grandes marcas, <em className="text-gold-grad animate-shine font-normal italic">no teu negócio</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-rise text-[17px] leading-relaxed text-cream/70 [animation-delay:.16s] sm:text-lg lg:mx-0">
            Sites, lojas online e sistemas com acabamento de agência internacional, entregues em 24 a 48 horas.
            <span className="text-cream"> Orçamento exacto em 2 minutos. Pagamento só depois da entrega.</span>
          </p>
          <div className="mt-9 flex animate-rise flex-col justify-center gap-3 [animation-delay:.24s] sm:flex-row lg:justify-start">
            <Link href="/comecar" className="btn-gold text-[16px]">
              Começar o meu projecto <ArrowRight size={18} />
            </Link>
            <a href="#trabalhos" className="btn-ghost">Ver trabalhos entregues</a>
          </div>
          <ul className="mx-auto mt-9 flex max-w-xl animate-rise flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-cream/60 [animation-delay:.32s] lg:mx-0 lg:justify-start">
            <li className="flex items-center gap-2"><Timer size={16} className="text-gold" /> 2 minutos, sem compromisso</li>
            <li className="flex items-center gap-2"><Wallet size={16} className="text-gold" /> Preço fechado na hora</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold" /> Pagas depois de pronto</li>
          </ul>
        </div>
      </div>
      <a href="#processo" aria-label="Descer" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.3em] text-cream/40 transition-colors hover:text-cream/70 lg:flex">
        Descobrir
        <span className="relative h-10 w-px overflow-hidden bg-white/10"><span className="absolute inset-x-0 top-0 h-1/2 animate-drip bg-gold" /></span>
      </a>
    </section>
  );
}
