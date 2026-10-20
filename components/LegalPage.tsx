import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import Footer from "./Footer";

export default function LegalPage({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-white/5">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/"><Logo size={28} /></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-cream"><ArrowLeft size={16} /> Início</Link>
        </div>
      </header>
      <main className="wrap max-w-3xl py-16">
        <h1 className="h-display text-4xl sm:text-5xl">{titulo}</h1>
        <p className="mt-3 text-sm text-cream-dim">Última actualização: {actualizado}</p>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-cream/75 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-cream [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
