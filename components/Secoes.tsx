import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, Newspaper, LayoutDashboard, MousePointerClick, ReceiptText, Send, PackageCheck, ShieldCheck, FileCheck2, Smartphone, Zap, Check } from "lucide-react";
import { PRECOS, formatKz } from "@/lib/pricing";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import GoldField from "./GoldField";

export function Servicos() {
  const itens = [
    { i: Globe, t: "Sites profissionais", d: "A tua montra digital: quem és, o que fazes e um botão para te contactarem." },
    { i: ShoppingBag, t: "Lojas online", d: "Catálogo, preços e pedidos, com painel para gerires os teus produtos." },
    { i: Newspaper, t: "Blogs e revistas", d: "Publica artigos e notícias e aparece no Google." },
    { i: LayoutDashboard, t: "Sistemas à medida", d: "Reservas, clientes, gestão interna. Feito para o teu processo." },
  ];
  return (
    <section className="relative border-y border-white/5 bg-night-2/40 py-24 sm:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">O que construímos</p>
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">Uma presença digital à altura do teu negócio.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map(({ i: I, t, d }, k) => (
            <Reveal key={t} delay={k * 90}>
              <Tilt className="h-full" max={6}>
                <div className="group h-full rounded-3xl border border-white/10 bg-night-2 p-6 transition-colors hover:border-gold/40">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-night shadow-[0_10px_30px_-10px_rgba(212,169,54,.7)]"><I size={22} /></span>
                  <h3 className="mt-6 font-display text-2xl">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{d}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComoFunciona() {
  const passos = [
    { i: MousePointerClick, t: "Descreves o teu negócio", d: "Perguntas simples, quase tudo com um toque. Vês o teu site a nascer enquanto respondes." },
    { i: ReceiptText, t: "Recebes o preço na hora", d: "Orçamento exacto, o que inclui e o prazo. Sem surpresas e sem esperar." },
    { i: Send, t: "Envias pelo WhatsApp", d: "A mensagem já vai pronta. Só carregas em Enviar e juntas o logótipo e as fotos." },
    { i: PackageCheck, t: "Recebes o site pronto", d: "Em 24 horas (simples) ou 48 horas (com painel). Pagas só depois de veres o site." },
  ];
  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">Como funciona</p>
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">Do primeiro toque ao site no ar, em 4 passos.</h2>
        </Reveal>
        <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block" />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {passos.map(({ i: I, t, d }, k) => (
            <Reveal key={t} as="li" delay={k * 120} className="relative flex gap-5 md:block md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-night text-gold shadow-[0_0_40px_-8px_rgba(212,169,54,.6)] md:mx-auto">
                <I size={22} />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-[11px] font-bold text-night">{k + 1}</span>
              </span>
              <div>
                <h3 className="font-display text-xl md:mt-6 md:text-2xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        </div>
        <Reveal className="mt-14 text-center">
          <Link href="/comecar" className="btn-gold">Começar agora <ArrowRight size={18} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Precos() {
  const planos = [
    {
      t: "Site profissional",
      de: PRECOS.semBD.vercel,
      d: "Para apresentar o teu negócio e receber contactos.",
      inc: ["Design premium à medida", "Optimizado para telemóvel", "Botões de WhatsApp com mensagem pronta", "Google e partilha nas redes", "Pronto em 24 horas"],
      nota: `Com domínio .com: ${formatKz(PRECOS.semBD.com)} · .ao: ${formatKz(PRECOS.semBD.ao)}`,
    },
    {
      t: "Loja, blog ou sistema",
      de: PRECOS.comBD.com,
      d: "Com painel para gerires tudo sozinho.",
      inc: ["Tudo do site profissional", "Painel de gestão e base de dados", "Domínio próprio incluído (.com)", `${PRECOS.emailBonusComBD} email profissional incluído`, "Pronto em 48 horas"],
      nota: `Com domínio .ao: ${formatKz(PRECOS.comBD.ao)}`,
      destaque: true,
    },
  ];
  return (
    <section id="precos" className="relative overflow-hidden border-y border-white/5 bg-night-2/40 py-24 sm:py-32">
      <GoldField density={0.5} className="opacity-60" />
      <div className="wrap relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">Preços transparentes</p>
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">Sabes quanto pagas antes de pedir.</h2>
          <p className="mt-5 text-cream/65">Pagamento único. Pagas só depois de o site estar pronto.</p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {planos.map((p, k) => (
            <Reveal key={p.t} delay={k * 120}>
              <div className={`relative h-full rounded-3xl border p-7 sm:p-8 ${p.destaque ? "border-gold/60 bg-gradient-to-b from-gold/10 to-night-2 shadow-[0_30px_90px_-40px_rgba(212,169,54,.7)]" : "border-white/10 bg-night-2"}`}>
                {p.destaque && <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-night">Mais completo</span>}
                <h3 className="font-display text-2xl">{p.t}</h3>
                <p className="mt-1 text-sm text-cream-dim">{p.d}</p>
                <p className="mt-6 text-sm text-cream/60">a partir de</p>
                <p className="font-display text-5xl text-gold-grad">{formatKz(p.de)}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-cream/80">
                  {p.inc.map((x) => (
                    <li key={x} className="flex gap-2.5"><Check size={17} className="mt-0.5 shrink-0 text-gold" />{x}</li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-xs text-cream-dim">{p.nota}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-cream-dim">
          Emails profissionais extra: {formatKz(PRECOS.emailExtra)} cada. Renovação anual a partir do 2.º ano: domínio .com {formatKz(PRECOS.anual.dominio.com)}, .ao {formatKz(PRECOS.anual.dominio.ao)}; base de dados {formatKz(PRECOS.anual.baseDados)}. Clientes em Portugal vêem o valor também em euros.
        </Reveal>
      </div>
    </section>
  );
}

export function Confianca() {
  const itens = [
    { i: ShieldCheck, t: "Pagas depois", d: "Construímos primeiro. Só pagas quando o site estiver pronto e entregue." },
    { i: FileCheck2, t: "Termos claros", d: "O preço que vês é o preço que pagas. Tudo escrito antes de começarmos." },
    { i: Smartphone, t: "Feito para telemóvel", d: "A maioria dos teus clientes chega pelo telemóvel. Desenhamos para eles primeiro." },
    { i: Zap, t: "Atendimento directo", d: "Falas com quem constrói, pelo WhatsApp. Sem intermediários." },
  ];
  return (
    <section className="py-24 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <Reveal>
          <p className="kicker">Sem risco para ti</p>
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">Confiança primeiro. Pagamento depois.</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {itens.map(({ i: I, t, d }, k) => (
            <Reveal key={t} delay={k * 90} className="rounded-3xl border border-white/10 bg-night-2 p-6">
              <I size={22} className="text-gold" />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/65">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(212,169,54,.22),transparent_70%)]" />
      <GoldField density={0.7} />
      <div className="wrap relative text-center">
        <Reveal>
          <h2 className="h-display mx-auto max-w-3xl text-5xl sm:text-7xl">
            O teu próximo cliente está a procurar-te. <span className="text-gold-grad italic">Faz com que te encontre.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/70">2 minutos para descrever, preço na hora, site pronto em 24 a 48 horas.</p>
          <Link href="/comecar" className="btn-gold mt-10 text-[17px]">Começar o meu projecto <ArrowRight size={18} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
