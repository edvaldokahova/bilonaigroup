import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <Logo size={44} texto={false} />
        <h1 className="h-display mt-8 text-5xl">Esta página não existe.</h1>
        <p className="mt-3 text-cream/65">Mas o teu site pode existir já amanhã.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/comecar" className="btn-gold">Começar o meu projecto</Link>
          <Link href="/" className="btn-ghost">Voltar ao início</Link>
        </div>
      </div>
    </main>
  );
}
