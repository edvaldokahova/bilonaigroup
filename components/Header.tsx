"use client";
// Cabeçalho transparente sobre o hero; ganha vidro escuro e linha dourada assim que a página desce.
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  ["#processo", "Método"],
  ["#trabalhos", "Trabalhos"],
  ["#servicos", "Serviços"],
  ["#precos", "Preços"],
] as const;

export default function Header() {
  const [desceu, setDesceu] = useState(false);
  useEffect(() => {
    const on = () => setDesceu(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${desceu ? "border-b border-white/[.06] bg-night/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent"}`}>
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="A Bilonai Group — início">
          <Logo size={30} />
        </Link>
        <nav className="hidden items-center gap-9 text-[13px] tracking-wide text-cream/65 md:flex" aria-label="Principal">
          {LINKS.map(([href, t]) => (
            <a key={href} href={href} className="group relative py-2 transition-colors hover:text-cream">
              {t}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <Link href="/comecar" className="btn-gold !min-h-[42px] !px-4 text-sm sm:!px-5">
          <span className="hidden sm:inline">Começar projecto</span>
          <span className="sm:hidden">Começar</span>
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-500 ${desceu ? "opacity-100" : "opacity-0"}`} />
    </header>
  );
}
