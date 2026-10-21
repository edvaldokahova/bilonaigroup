// Faixa contínua com o que construímos, logo a seguir ao hero.
const ITENS = [
  "Sites institucionais",
  "Lojas online",
  "Sistemas de reservas",
  "Blogs e revistas",
  "Painéis de gestão",
  "Domínios .ao e .com",
  "Emails profissionais",
  "SEO e partilha nas redes",
];

export default function Faixa() {
  const linha = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {ITENS.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-xl italic text-cream/55 sm:text-2xl">
          {t}
          <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/[.06] bg-night-2/50 py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="O que construímos">
      <div className="flex w-max animate-marquee">
        {linha}
        <div aria-hidden className="flex">{linha}</div>
      </div>
    </div>
  );
}
