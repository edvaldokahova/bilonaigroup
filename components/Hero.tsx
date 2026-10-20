import Link from "next/link";
import { ArrowRight, ShieldCheck, Timer, Wallet } from "lucide-react";
import GoldField from "./GoldField";

export default function Hero() {
  return (
    <section className="grain relative flex items-center overflow-hidden pb-24 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_40%,rgba(212,169,54,.16),transparent_70%),radial-gradient(50%_40%_at_10%_90%,rgba(212,169,54,.08),transparent_70%)]" />
      <GoldField />
      <div className="wrap relative">
        <div className="mx-auto max-w-4xl animate-rise text-center">
          <p className="kicker">Agência de sites · Huambo, Angola</p>
          <h1 className="h-display mt-6 text-[44px] sm:text-6xl lg:text-[84px]">
            O site que o teu negócio <em className="text-gold-grad animate-shine font-normal italic">merece</em>.
            <span className="mt-3 block text-[.62em] text-cream/75">Pronto em 24 a 48 horas.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/70 sm:text-lg">
            Descreve o teu negócio em 2 minutos, vê o preço exacto na hora e envia o pedido pelo WhatsApp.
            <span className="text-cream"> Só pagas depois de o site estar pronto.</span>
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/comecar" className="btn-gold text-[16px]">
              Começar o meu projecto <ArrowRight size={18} />
            </Link>
            <a href="#trabalhos" className="btn-ghost">Ver trabalhos</a>
          </div>
          <ul className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-3 text-sm text-cream/65 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-2"><Timer size={16} className="text-gold" /> 2 minutos</li>
            <li className="flex items-center gap-2"><Wallet size={16} className="text-gold" /> Preço na hora</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold" /> Pagas depois</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
