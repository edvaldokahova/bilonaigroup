import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, Newspaper, LayoutDashboard, MousePointerClick, ReceiptText, Send, PackageCheck, ShieldCheck, FileCheck2, Smartphone, Headset, Check } from "lucide-react";
import { PRECOS, formatKz } from "@/lib/pricing";
import { brand, waLink } from "@/lib/brand";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import GoldField from "./GoldField";
import Orbita from "./Orbita";
import Titulo from "./Titulo";
import WaIcon from "./WaIcon";

export function Servicos() {
  const itens = [
    { i: Globe, t: "Sites institucionais", d: "A tua empresa apresentada com autoridade: quem és, o que fazes e um caminho directo até ao contacto." },
    { i: ShoppingBag, t: "Lojas online", d: "Catálogo, preços e pedidos, com painel para gerires os produtos sem depender de ninguém." },
    { i: Newspaper, t: "Blogs e revistas", d: "Publica artigos e notícias num painel simples e ganha visibilidade no Google." },
    { i: LayoutDashboard, t: "Sistemas à medida", d: "Reservas, clientes e gestão interna, desenhados à volta da forma como a tua equipa trabalha." },
  ];
  return (
    <section id="servicos" className="relative border-y border-white/[.06] bg-night-2/40 py-28 sm:py-32">
      <div className="wrap">
        <Titulo n="03" kicker="O que construímos">
          Uma presença digital <span className="text-gold-grad italic">à altura da tua ambição</span>.
        </Titulo>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map(({ i: I, t, d }, k) => (
            <Reveal key={t} delay={k * 90}>
              <Tilt className="h-full" max={6}>
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-night-2 p-7 transition-colors duration-500 hover:border-gold/40">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-night shadow-[0_10px_30px_-10px_rgba(212,169,54,.7)]"><I size={22} /></span>
                  <h3 className="mt-7 font-display text-[26px] leading-tight">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">{d}</p>
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
    { i: MousePointerClick, t: "Descreves o teu negócio", d: "Perguntas objectivas, quase todas de um toque. Vês a prévia do teu site enquanto respondes." },
    { i: ReceiptText, t: "Recebes o orçamento na hora", d: "Preço fechado, o que está incluído e o prazo de entrega. Sem letras pequenas." },
    { i: Send, t: "Confirmas pelo WhatsApp", d: "A mensagem segue já escrita. Só carregas em Enviar e juntas o logótipo e as fotos." },
    { i: PackageCheck, t: "Recebes o site pronto", d: "Em 24 horas (projectos simples) ou 48 horas (com painel). Pagas só depois da entrega." },
  ];
  return (
    <section id="como-funciona" className="relative py-28 sm:py-36">
      <div className="wrap">
        <Titulo n="04" kicker="Como funciona" centro>
          Do primeiro toque ao site no ar, <span className="text-gold-grad italic">em quatro passos</span>.
        </Titulo>
        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block" />
          <div className="absolute bottom-4 left-7 top-4 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent md:hidden" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {passos.map(({ i: I, t, d }, k) => (
              <Reveal key={t} as="li" delay={k * 120} className="relative flex gap-5 md:block md:text-center">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-night text-gold shadow-[0_0_40px_-8px_rgba(212,169,54,.6)] md:mx-auto">
                  <I size={22} />
                  <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-[11px] font-bold text-night">{k + 1}</span>
                </span>
                <div>
                  <h3 className="font-display text-xl md:mt-7 md:text-2xl">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="mt-16 text-center">
          <Link href="/comecar" className="btn-gold">Ver o meu orçamento agora <ArrowRight size={18} /></Link>
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
      d: "Para apresentar a tua empresa com credibilidade e gerar contactos.",
      inc: ["Design exclusivo, à medida da marca", "Pensado primeiro para telemóvel", "WhatsApp com mensagem pronta", "Optimizado para Google e redes sociais", "Entrega em 24 horas"],
      nota: `Com domínio .com: ${formatKz(PRECOS.semBD.com)} · .ao: ${formatKz(PRECOS.semBD.ao)}`,
    },
    {
      t: "Loja, blog ou sistema",
      de: PRECOS.comBD.com,
      d: "Para vender, publicar ou gerir, com painel de gestão próprio.",
      inc: ["Tudo o que inclui o site profissional", "Painel de gestão e base de dados", "Domínio próprio incluído (.com)", `${PRECOS.emailBonusComBD} email profissional incluído`, "Entrega em 48 horas"],
      nota: `Com domínio .ao: ${formatKz(PRECOS.comBD.ao)}`,
      destaque: true,
    },
  ];
  return (
    <section id="precos" className="relative overflow-hidden border-y border-white/[.06] bg-night-2/40 py-28 sm:py-36">
      <GoldField density={0.5} className="opacity-60" />
      <div className="wrap relative">
        <Titulo n="05" kicker="Investimento" centro texto="Pagamento único pela criação do projecto. Só pagas depois da entrega.">
          Preço fechado, <span className="text-gold-grad italic">antes de começares</span>.
        </Titulo>
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
          {planos.map((p, k) => (
            <Reveal key={p.t} delay={k * 120}>
              <div className={`relative h-full rounded-[28px] border p-7 sm:p-9 ${p.destaque ? "border-gold/60 bg-gradient-to-b from-gold/[.12] via-night-2 to-night-2 shadow-[0_40px_100px_-40px_rgba(212,169,54,.7)]" : "border-white/10 bg-night-2"}`}>
                {p.destaque && <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-gold-light to-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-night">Mais completo</span>}
                <h3 className="font-display text-[28px]">{p.t}</h3>
                <p className="mt-1.5 text-sm text-cream-dim">{p.d}</p>
                <p className="mt-7 text-xs uppercase tracking-[.2em] text-cream/50">a partir de</p>
                <p className="mt-1 font-display text-5xl text-gold-grad sm:text-[56px]">{formatKz(p.de)}</p>
                <ul className="mt-7 space-y-3 text-sm text-cream/80">
                  {p.inc.map((x) => (
                    <li key={x} className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-gold" />{x}</li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-white/10 pt-4 text-xs text-cream-dim">{p.nota}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-9 max-w-3xl text-center text-xs leading-relaxed text-cream-dim">
          Emails profissionais extra: {formatKz(PRECOS.emailExtra)} cada. Renovação anual a partir do 2.º ano: domínio .com {formatKz(PRECOS.anual.dominio.com)}, .ao {formatKz(PRECOS.anual.dominio.ao)}; base de dados {formatKz(PRECOS.anual.baseDados)}. Clientes em Portugal vêem também o valor em euros.
        </Reveal>
      </div>
    </section>
  );
}

export function Confianca() {
  const itens = [
    { i: ShieldCheck, t: "Pagamento após a entrega", d: "Construímos primeiro. Só pagas quando o site estiver pronto e entregue." },
    { i: FileCheck2, t: "Preço fechado", d: "O valor do orçamento é o valor final. Tudo por escrito antes de começarmos." },
    { i: Smartphone, t: "Pensado para telemóvel", d: "É de lá que vem a maioria dos teus clientes. Desenhamos para eles primeiro." },
    { i: Headset, t: "Atendimento directo", d: "Falas com quem constrói, pelo WhatsApp ou por email. Sem intermediários." },
  ];
  return (
    <section className="py-28 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <Titulo n="06" kicker="Garantias" texto="Trabalhamos com o modelo pós-pago porque confiamos no que entregamos. Vês o resultado antes de pagar.">
          O risco é nosso. <span className="text-gold-grad italic">Tu pagas depois.</span>
        </Titulo>
        <div className="grid gap-4 sm:grid-cols-2">
          {itens.map(({ i: I, t, d }, k) => (
            <Reveal key={t} delay={k * 90} className="rounded-[28px] border border-white/10 bg-night-2 p-7 transition-colors duration-500 hover:border-gold/30">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/[.08] text-gold"><I size={20} /></span>
              <h3 className="mt-5 font-display text-[22px]">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{d}</p>
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
        <Orbita modo="cta" className="mx-auto -mb-4 aspect-square w-52 sm:w-64" />
        <Reveal>
          <h2 className="h-display mx-auto max-w-5xl text-[40px] sm:text-6xl lg:text-[68px]">
            O teu próximo cliente já está a procurar. <span className="text-gold-grad italic">Garante que te encontra.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-cream/70">2 minutos para descrever. Orçamento na hora. Site no ar em 24 a 48 horas.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/comecar" className="btn-gold text-[17px]">Começar o meu projecto <ArrowRight size={18} /></Link>
            <a href={waLink(`Olá, ${brand.agente.split(" ")[0]}! Tenho uma dúvida sobre um projecto.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WaIcon size={18} className="text-wa" /> Falar com o {brand.agente.split(" ")[0]}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
