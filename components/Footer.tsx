import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import Logo from "./Logo";
import WaIcon from "./WaIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo size={32} />
          <p className="mt-4 text-sm text-cream-dim">{brand.assinatura}</p>
          <p className="mt-1 text-sm text-cream-dim">{brand.cidade}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream">
            <WaIcon size={18} className="text-wa" /> {brand.whatsappVisivel} · {brand.agente}
          </a>
          <div className="flex gap-5 text-cream-dim">
            <Link href="/termos" className="hover:text-cream">Termos</Link>
            <Link href="/privacidade" className="hover:text-cream">Privacidade</Link>
          </div>
          <p className="text-xs text-cream-dim/70">© {new Date().getFullYear()} {brand.nome}</p>
        </div>
      </div>
    </footer>
  );
}
