import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-night/70 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="A Bilonai Group — início">
          <Logo size={30} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
          <a href="#trabalhos" className="transition-colors hover:text-cream">Trabalhos</a>
          <a href="#como-funciona" className="transition-colors hover:text-cream">Como funciona</a>
          <a href="#precos" className="transition-colors hover:text-cream">Preços</a>
        </nav>
        <Link href="/comecar" className="btn-gold !min-h-[40px] !px-4 text-sm sm:!px-5">
          <span className="hidden sm:inline">Começar projecto</span>
          <span className="sm:hidden">Começar</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}
