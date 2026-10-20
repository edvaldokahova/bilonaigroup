import Link from "next/link";
import { ArrowRight, ShieldCheck, Timer, Wallet } from "lucide-react";
import GoldField from "./GoldField";
import Device3D from "./Device3D";

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden pb-24 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgba(212,169,54,.16),transparent_70%),radial-gradient(50%_40%_at_10%_90%,rgba(212,169,54,.08),transparent_70%)]" />
      <GoldField />
      <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="animate-rise">
          <p className="kicker">Agência de sites · Huambo, Angola</p>
          <h1 className="h-display mt-6 text-[44px] sm:text-6xl lg:text-[68px]">
            O site que o teu negócio <em className="text-gold-grad animate-shine font-normal italic">merece</em>.
            <span className="mt-3 block text-[.62em] text-cream/75">Pronto em 24 a 48 horas.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-cream/70">
            Descreve o teu negócio em 2 minutos, vê o preço exacto na hora e envia o pedido pelo WhatsApp.
            <span className="text-cream"> Só pagas depois de o site estar pronto.</span>
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/comecar" className="btn-gold text-[16px]">
              Começar o meu projecto <ArrowRight size={18} />
            </Link>
            <a href="#trabalhos" className="btn-ghost">Ver trabalhos</a>
          </div>
          <ul className="mt-9 grid max-w-xl grid-cols-1 gap-3 text-sm text-cream/65 sm:grid-cols-3">
            <li className="flex items-center gap-2"><Timer size={16} className="text-gold" /> 2 minutos</li>
            <li className="flex items-center gap-2"><Wallet size={16} className="text-gold" /> Preço na hora</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold" /> Pagas depois</li>
          </ul>
        </div>
        <div className="relative px-6 pb-10 sm:px-12 lg:pl-6 lg:pr-0">
          <Device3D />
        </div>
      </div>
    </section>
  );
}
