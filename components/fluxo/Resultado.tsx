"use client";
// Veredito: o projecto montado, a estratégia, as prioridades, o orçamento, os termos e o botão de WhatsApp.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Copy, ExternalLink, Paperclip, PenLine, Send, ShieldCheck, Sparkles } from "lucide-react";
import Logo from "../Logo";
import WaIcon from "../WaIcon";
import Previa from "./Previa";
import { brand } from "@/lib/brand";
import { formatEur, formatKz, kzParaEur } from "@/lib/pricing";
import {
  type Respostas,
  anexosDe,
  dominioEfectivo,
  estrategiaDe,
  nomeProjecto,
  orcamentoDe,
  prazoDe,
  precisaBD,
  prioridadesDe,
  tituloTipo,
} from "@/lib/fluxo";
import { pedidoWhatsApp } from "@/lib/whatsapp";

const eur = (kz: number) => `≈ ${formatEur(kzParaEur(kz, brand.taxaKzPorEur))}`;

export default function Resultado({ r, onEditar }: { r: Respostas; onEditar: () => void }) {
  const o = useMemo(() => orcamentoDe(r), [r]);
  const bd = precisaBD(r);
  const dom = dominioEfectivo(r);
  const pt = r.pais === "PT";
  const prioridades = useMemo(() => prioridadesDe(r), [r]);
  const [aceite, setAceite] = useState<Date | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [barras, setBarras] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setBarras(true), 250);
    return () => clearTimeout(t);
  }, []);

  const pedido = useMemo(() => (aceite ? pedidoWhatsApp(r, aceite) : null), [r, aceite]);

  const copiar = async () => {
    if (!pedido) return;
    try {
      await navigator.clipboard.writeText(pedido.mensagem);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copia a mensagem:", pedido.mensagem);
    }
  };

  const primeiro = r.nome.trim().split(" ")[0];
  const domTxt = { vercel: "endereço .vercel.app", com: "domínio .com", ao: "domínio .ao" }[dom];

  if (enviado && pedido) {
    return (
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_30%,rgba(37,211,102,.16),transparent_70%)]" />
        <div className="relative w-full max-w-md animate-rise text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-wa text-white shadow-[0_0_80px_-10px_rgba(37,211,102,.8)]"><WaIcon size={40} /></span>
          <h1 className="h-display mt-8 text-4xl sm:text-5xl">Falta só 1 passo.</h1>
          <p className="mt-3 text-cream/70">O WhatsApp abriu com o teu pedido já escrito.</p>
          <ol className="mt-8 space-y-3 text-left">
            <li className="flex gap-4 rounded-2xl border border-white/10 bg-night-2 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wa text-white"><Send size={16} /></span>
              <span><b className="block">Carrega em Enviar</b><span className="text-sm text-cream/60">A seta verde, no fundo da conversa.</span></span>
            </li>
            <li className="flex gap-4 rounded-2xl border border-white/10 bg-night-2 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-night"><Paperclip size={16} /></span>
              <span>
                <b className="block">Anexa as imagens no clipe 📎</b>
                <ul className="mt-1 space-y-0.5 text-sm text-cream/60">{anexosDe(r).map((a) => <li key={a}>• {a}</li>)}</ul>
              </span>
            </li>
            <li className="flex gap-4 rounded-2xl border border-white/10 bg-night-2 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"><Clock size={16} /></span>
              <span><b className="block">O {brand.agente.split(" ")[0]} responde-te</b><span className="text-sm text-cream/60">Assim que enviares, confirmamos tudo e começamos.</span></span>
            </li>
          </ol>
          <div className="mt-8 grid gap-3">
            <a href={pedido.link} target="_blank" rel="noopener noreferrer" className="btn-wa"><WaIcon size={22} /> Abrir o WhatsApp de novo</a>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={copiar} className="btn-ghost text-sm">{copiado ? <><Check size={16} /> Copiada</> : <><Copy size={16} /> Copiar texto</>}</button>
              <button type="button" onClick={() => setEnviado(false)} className="btn-ghost text-sm"><ArrowLeft size={16} /> Ver resumo</button>
            </div>
            <p className="text-xs text-cream-dim">Se o WhatsApp não abrir, copia a mensagem e envia para {brand.whatsappVisivel}.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40 lg:pb-20">
      <div className="sticky top-0 z-30 border-b border-white/5 bg-night/80 backdrop-blur-xl">
        <div className="wrap flex h-14 items-center justify-between">
          <Link href="/" aria-label="Início"><Logo size={26} /></Link>
          <button type="button" onClick={onEditar} className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-cream"><PenLine size={15} /> Editar respostas</button>
        </div>
      </div>

      <div className="wrap pt-10 lg:pt-16">
        <div className="animate-rise">
          <p className="kicker flex items-center gap-2"><Sparkles size={14} /> O teu veredito</p>
          <h1 className="h-display mt-4 max-w-3xl text-[38px] sm:text-6xl">
            {primeiro ? `${primeiro}, o` : "O"} teu projecto está <span className="text-gold-grad italic">pronto para começar</span>.
          </h1>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-night-2 p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[.2em] text-cream-dim">Recomendação</p>
                  <h2 className="mt-1 font-display text-3xl">{nomeProjecto(r)}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm text-gold"><Clock size={15} /> {prazoDe(r)}</span>
              </div>
              <div className="mt-4"><Previa r={r} /></div>
              <p className="text-center text-xs text-cream-dim">Ilustração do teu projecto. O design final é feito à tua medida, com o teu logótipo e as tuas fotos.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night-2 p-5 sm:p-8">
              <h3 className="font-display text-2xl">O que vamos construir</h3>
              <ul className="mt-5 space-y-3">
                {estrategiaDe(r).map((x) => (
                  <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-cream/80"><Check size={18} className="mt-1 shrink-0 text-gold" />{x}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night-2 p-5 sm:p-8">
              <h3 className="font-display text-2xl">Prioridades do teu projecto</h3>
              <p className="mt-1 text-sm text-cream-dim">Calculadas a partir das tuas respostas.</p>
              <div className="mt-6 space-y-4">
                {prioridades.map((p, i) => (
                  <div key={p.nome}>
                    <div className="mb-1.5 flex justify-between text-sm"><span>{p.nome}</span><span className="tabular-nums text-cream-dim">{p.v}%</span></div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/[.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-1000 ease-out" style={{ width: barras ? `${p.v}%` : "0%", transitionDelay: `${i * 120}ms` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-gold/50 bg-gradient-to-b from-gold/[.12] via-night-2 to-night-2 p-5 shadow-[0_40px_100px_-40px_rgba(212,169,54,.6)] sm:p-8">
              <p className="text-xs uppercase tracking-[.2em] text-gold">Orçamento</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex justify-between gap-4"><span className="text-cream/75">{tituloTipo(r.tipo)}{bd ? " com painel" : ""} · {domTxt}</span><span className="whitespace-nowrap tabular-nums">{formatKz(o.base)}</span></li>
                {o.emailsExtra > 0 && <li className="flex justify-between gap-4"><span className="text-cream/75">{o.emailsExtra === 1 ? "1 email profissional extra" : `${o.emailsExtra} emails profissionais extra`}</span><span className="whitespace-nowrap tabular-nums">{formatKz(o.emailsExtraTotal)}</span></li>}
                {bd && r.emails > 0 && <li className="flex justify-between gap-4 text-cream-dim"><span>1 email profissional incluído</span><span>0 Kz</span></li>}
              </ul>
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-sm text-cream/70">Total a pagar</p>
                <p className="font-display text-5xl text-gold-grad">{formatKz(o.total)}</p>
                {pt && <p className="mt-1 text-sm text-cream/60">{eur(o.total)}</p>}
                <p className="mt-2 text-xs text-cream-dim">Pagamento único, só depois de o site estar pronto.</p>
              </div>
              {o.anual.total > 0 && (
                <p className="mt-4 rounded-xl bg-white/[.04] p-3 text-xs leading-relaxed text-cream/65">
                  Renovação anual a partir do 2.º ano: <b className="text-cream">{formatKz(o.anual.total)}</b>{pt ? ` (${eur(o.anual.total)})` : ""}
                  {o.anual.dominio > 0 && ` · domínio ${formatKz(o.anual.dominio)}`}{o.anual.baseDados > 0 && ` · base de dados ${formatKz(o.anual.baseDados)}`}
                </p>
              )}

              <div className="mt-6 rounded-2xl border border-white/10 bg-night/60 p-4 text-xs leading-relaxed text-cream/70">
                <p className="flex items-center gap-2 text-sm font-semibold text-cream"><ShieldCheck size={16} className="text-gold" /> Termos, em resumo</p>
                <ul className="mt-2 space-y-1">
                  <li>• Construímos primeiro e enviamos-te o link pelo WhatsApp.</li>
                  <li>• Pagas depois da entrega e envias o comprovativo pelo WhatsApp.</li>
                  <li>• Tens 15 dias para pagar + 5 de tolerância; depois disso o projecto é encerrado.</li>
                  <li>• Prazo: {prazoDe(r)} depois de recebermos o logótipo e as fotos.</li>
                </ul>
                <Link href="/termos" target="_blank" className="mt-2 inline-flex items-center gap-1 text-gold hover:underline">Ler os termos completos <ExternalLink size={12} /></Link>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 p-4 transition-colors has-[:checked]:border-gold/60 has-[:checked]:bg-gold/[.06]">
                <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#D4A936]" checked={!!aceite} onChange={(e) => setAceite(e.target.checked ? new Date() : null)} />
                <span className="text-sm">Li e aceito os termos.</span>
              </label>

              <a
                href={pedido?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!pedido}
                onClick={(e) => {
                  if (!pedido) { e.preventDefault(); return; }
                  window.setTimeout(() => { setEnviado(true); window.scrollTo({ top: 0 }); }, 400);
                }}
                className={`btn-wa mt-5 ${pedido ? "" : "pointer-events-auto cursor-not-allowed opacity-40"}`}
              >
                <WaIcon size={24} /> Enviar o meu pedido no WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-cream-dim">{pedido ? "A mensagem vai pronta. Só carregas em Enviar." : "Aceita os termos para activar o botão."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* barra fixa no telemóvel */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-night/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="wrap flex items-center gap-3 py-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[.18em] text-cream-dim">Total</p>
            <p className="truncate font-display text-xl text-gold-grad">{formatKz(o.total)}</p>
          </div>
          {pedido ? (
            <a href={pedido.link} target="_blank" rel="noopener noreferrer" onClick={() => window.setTimeout(() => { setEnviado(true); window.scrollTo({ top: 0 }); }, 400)} className="btn-wa !min-h-[52px] flex-1 !text-[15px]">
              <WaIcon size={20} /> Enviar pedido
            </a>
          ) : (
            <button type="button" onClick={() => document.querySelector("input[type=checkbox]")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="btn-gold flex-1 text-[15px]">
              Aceitar e enviar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
