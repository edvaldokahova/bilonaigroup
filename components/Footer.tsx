import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { brand, waLink } from "@/lib/brand";
import Logo from "./Logo";
import WaIcon from "./WaIcon";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[.08] pb-10 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size={34} />
          <p className="mt-5 max-w-xs font-display text-xl italic text-cream/80">{brand.assinatura}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-dim">Sites, lojas online e sistemas para empresas que querem ser levadas a sério.</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-gold">Contacto</p>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-cream/80 transition-colors hover:text-cream">
                <WaIcon size={17} className="text-wa" /> {brand.whatsappVisivel}
              </a>
              <span className="mt-0.5 block pl-[27px] text-xs text-cream-dim">{brand.agentePublico}</span>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2.5 text-cream/80 transition-colors hover:text-cream">
                <Mail size={17} className="text-gold" /> {brand.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-cream-dim"><MapPin size={17} className="text-gold" /> {brand.cidade}</li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-gold">Navegar</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/70">
            <li><Link href="/comecar" className="transition-colors hover:text-cream">Começar projecto</Link></li>
            <li><Link href="/#trabalhos" className="transition-colors hover:text-cream">Trabalhos</Link></li>
            <li><Link href="/#precos" className="transition-colors hover:text-cream">Preços</Link></li>
            <li><Link href="/termos" className="transition-colors hover:text-cream">Termos do serviço</Link></li>
            <li><Link href="/privacidade" className="transition-colors hover:text-cream">Privacidade</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-14 flex flex-col gap-2 border-t border-white/[.06] pt-6 text-xs text-cream-dim/70 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {brand.nome}. Todos os direitos reservados.</p>
        <p>Feito no Huambo, para o mundo.</p>
      </div>
    </footer>
  );
}
