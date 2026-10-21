"use client";
// Fluxo de conversão: 8 perguntas rápidas → análise → veredito com preço → WhatsApp com a mensagem pronta.
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Globe, ShoppingBag, Newspaper, LayoutDashboard, Minus, Plus, Sparkles, X } from "lucide-react";
import Logo from "../Logo";
import Previa from "./Previa";
import Analise from "./Analise";
import Resultado from "./Resultado";
import {
  RESPOSTAS_INICIAIS,
  TIPOS,
  RAMOS,
  ESTILOS,
  PALETAS,
  FUNCS,
  type Respostas,
  type Tipo,
  orcamentoDe,
  precisaBD,
  dominioEfectivo,
  clausulasPara,
  textoClausula,
} from "@/lib/fluxo";
import { PRECOS, calcularOrcamento, formatKz } from "@/lib/pricing";
import type { Dominio } from "@/lib/pricing";

const CHAVE = "bilonai-pedido-v2";
const TOTAL = 9;
const ICONE_TIPO: Record<Tipo, typeof Globe> = { site: Globe, loja: ShoppingBag, blog: Newspaper, sistema: LayoutDashboard };

type Fase = "perguntas" | "analise" | "resultado";

export default function Fluxo() {
  const [r, setR] = useState<Respostas>(RESPOSTAS_INICIAIS);
  const [passo, setPasso] = useState(0);
  const [fase, setFase] = useState<Fase>("perguntas");
  const [dir, setDir] = useState(1);
  const carregado = useRef(false);
  const topo = useRef<HTMLDivElement>(null);

  // Retoma o rascunho (se o cliente sair e voltar).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHAVE);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.r) setR({ ...RESPOSTAS_INICIAIS, ...d.r });
        if (typeof d.passo === "number") setPasso(Math.min(TOTAL - 1, Math.max(0, d.passo)));
        if (d.fase === "resultado") setFase("resultado");
      }
    } catch {
      /* sem armazenamento: segue sem rascunho */
    }
    carregado.current = true;
  }, []);

  useEffect(() => {
    if (!carregado.current) return;
    try {
      sessionStorage.setItem(CHAVE, JSON.stringify({ r, passo, fase: fase === "analise" ? "perguntas" : fase }));
    } catch {
      /* ignora */
    }
  }, [r, passo, fase]);

  const set = <K extends keyof Respostas>(k: K, v: Respostas[K]) => setR((x) => ({ ...x, [k]: v }));
  const orc = useMemo(() => orcamentoDe(r), [r]);
  const bd = precisaBD(r);

  const valido = [
    r.nome.trim().length > 1 && r.negocio.trim().length > 1,
    !!r.tipo,
    !!r.ramo,
    true,
    true,
    true,
    true,
    true,
    !!r.trafego,
  ][passo];

  // Passos opcionais: o botão diz "Saltar" enquanto estiverem vazios.
  const vazio =
    (passo === 6 && !r.whatsapp && !r.instagram && !r.facebook && !r.cidade) ||
    (passo === 7 && !r.denominacao && !r.nif && !r.termos.length && !r.notasTermos);
  const clausulas = clausulasPara(r);

  const irPara = (n: number) => {
    setDir(n > passo ? 1 : -1);
    setPasso(n);
    requestAnimationFrame(() => topo.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const seguinte = () => {
    if (!valido) return;
    if (passo < TOTAL - 1) irPara(passo + 1);
    else {
      setFase("analise");
      window.scrollTo({ top: 0 });
    }
  };
  const anterior = () => (passo > 0 ? irPara(passo - 1) : undefined);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault();
      seguinte();
    }
  };

  if (fase === "analise") return <Analise r={r} onFim={() => setFase("resultado")} />;
  if (fase === "resultado")
    return (
      <Resultado
        r={r}
        onEditar={() => {
          setFase("perguntas");
          irPara(0);
        }}
      />
    );

  const primeiro = r.nome.trim().split(" ")[0];

  return (
    <div className="min-h-[100svh] pb-32 lg:pb-16">
      {/* topo */}
      <div className="sticky top-0 z-30 border-b border-white/5 bg-night/80 backdrop-blur-xl">
        <div className="wrap flex h-14 items-center justify-between gap-4">
          <Link href="/" aria-label="Voltar ao início"><Logo size={26} texto={false} /></Link>
          <div className="flex flex-1 items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-500" style={{ width: `${((passo + 1) / TOTAL) * 100}%` }} />
            </div>
            <span className="w-12 text-right text-xs tabular-nums text-cream-dim">{passo + 1}/{TOTAL}</span>
          </div>
          <Link href="/" className="grid h-9 w-9 place-items-center rounded-full text-cream-dim hover:bg-white/5 hover:text-cream" aria-label="Sair"><X size={18} /></Link>
        </div>
      </div>

      <div ref={topo} className="wrap grid scroll-mt-14 gap-8 pt-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-14">
        {/* prévia: no telemóvel fica compacta em cima; no computador, à direita */}
        <aside className="order-first lg:order-last">
          <div className="lg:sticky lg:top-24">
            <div className="mx-auto max-w-[340px] lg:max-w-none">
              <Previa r={r} compacta />
            </div>
            <div className="mt-6 hidden items-center justify-between rounded-2xl border border-white/10 bg-night-2 p-5 lg:flex">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-cream-dim">Estimativa ao vivo</p>
                <p className="mt-1 text-sm text-cream/70">{r.tipo ? `${bd ? "Com painel de gestão" : "Sem painel"} · ${{ vercel: ".vercel.app", com: ".com", ao: ".ao" }[dominioEfectivo(r)]}` : "Escolhe o tipo de projecto"}</p>
              </div>
              <p className="font-display text-3xl text-gold-grad">{r.tipo ? formatKz(orc.total) : "—"}</p>
            </div>
            <p className="mt-3 hidden text-center text-xs text-cream-dim lg:block">A prévia muda enquanto respondes. É uma ilustração, o design final é feito à tua medida.</p>
          </div>
        </aside>

        <div onKeyDown={onKey}>
          <div key={passo} className="animate-rise" style={{ animationDuration: dir > 0 ? ".5s" : ".4s" }}>
            {passo === 0 && (
              <Bloco t="Vamos começar." s="Em 2 minutos recebes um orçamento fechado. Primeiro, apresenta-te.">
                <label className="block">
                  <span className="mb-2 block text-sm text-cream/70">O teu nome</span>
                  <input className="field" value={r.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex.: Ana Silva" autoComplete="name" autoFocus maxLength={60} />
                </label>
                <label className="mt-4 block">
                  <span className="mb-2 block text-sm text-cream/70">Nome do teu negócio</span>
                  <input className="field" value={r.negocio} onChange={(e) => set("negocio", e.target.value)} placeholder="Ex.: Doces da Ana" autoComplete="organization" maxLength={60} />
                </label>
                <p className="mb-2 mt-6 text-sm text-cream/70">Onde fica o teu negócio?</p>
                <div className="grid grid-cols-3 gap-2">
                  {([["AO", "Angola"], ["PT", "Portugal"], ["outro", "Outro país"]] as const).map(([id, n]) => (
                    <button key={id} type="button" aria-pressed={r.pais === id} onClick={() => set("pais", id)} className="chip justify-center">{n}</button>
                  ))}
                </div>
              </Bloco>
            )}

            {passo === 1 && (
              <Bloco t={`${primeiro ? `${primeiro}, o` : "O"} que precisas?`} s="Escolhe o que melhor descreve o teu projecto.">
                <div className="grid gap-3">
                  {TIPOS.map((t) => {
                    const I = ICONE_TIPO[t.id];
                    const desde = t.id === "site" ? PRECOS.semBD.vercel : PRECOS.comBD.com;
                    return (
                      <button key={t.id} type="button" aria-pressed={r.tipo === t.id} onClick={() => { set("tipo", t.id); }} className="chip items-start gap-4 py-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold"><I size={20} /></span>
                        <span className="flex-1">
                          <b className="block text-[16px] font-semibold text-cream">{t.titulo}</b>
                          <span className="mt-0.5 block text-sm leading-snug text-cream/60">{t.desc}</span>
                          <span className="mt-2 block text-xs text-gold">desde {formatKz(desde)}</span>
                        </span>
                        <Marca on={r.tipo === t.id} />
                      </button>
                    );
                  })}
                </div>
              </Bloco>
            )}

            {passo === 2 && (
              <Bloco t="Em que ramo trabalhas?" s="Assim adaptamos a estratégia ao teu cliente ideal.">
                <div className="grid grid-cols-2 gap-2">
                  {RAMOS.map((x) => (
                    <button key={x} type="button" aria-pressed={r.ramo === x} onClick={() => set("ramo", x)} className="chip text-sm">{x}</button>
                  ))}
                </div>
                <label className="mt-6 block">
                  <span className="mb-2 block text-sm text-cream/70">Numa frase, o que vendes ou ofereces? <span className="text-cream-dim">(opcional)</span></span>
                  <input className="field" value={r.oferta} onChange={(e) => set("oferta", e.target.value)} placeholder="Ex.: bolos de aniversário e encomendas para eventos" maxLength={160} />
                </label>
              </Bloco>
            )}

            {passo === 3 && (
              <Bloco t="Que estilo combina contigo?" s="Repara na prévia a mudar. Afinamos tudo contigo antes da entrega.">
                <div className="grid grid-cols-2 gap-2">
                  {ESTILOS.map((e) => (
                    <button key={e.id} type="button" aria-pressed={r.estilo === e.id} onClick={() => set("estilo", e.id)} className="chip flex-col items-start gap-1 py-4">
                      <span className={`text-3xl text-cream ${e.serif ? "font-display" : "font-sans font-bold"}`}>Aa</span>
                      <b className="text-[15px] text-cream">{e.titulo}</b>
                      <span className="text-xs text-cream/55">{e.desc}</span>
                    </button>
                  ))}
                </div>
                <p className="mb-3 mt-7 text-sm text-cream/70">Cores</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {PALETAS.map((p) => (
                    <button key={p.id} type="button" aria-pressed={r.paleta === p.id} onClick={() => set("paleta", p.id)} className="chip flex-col items-start gap-2 py-3">
                      <span className="flex">
                        {[p.bg, p.ac, p.fg].map((c, k) => (
                          <span key={k} className="-mr-1.5 h-6 w-6 rounded-full ring-2 ring-night-2" style={{ background: p.id === "logo" ? `conic-gradient(#f87171,#facc15,#4ade80,#60a5fa,#c084fc,#f87171)` : c }} />
                        ))}
                      </span>
                      <span className="text-xs leading-tight">{p.nome}</span>
                    </button>
                  ))}
                </div>
              </Bloco>
            )}

            {passo === 4 && (
              <Bloco t="O que o teu site deve ter?" s="Escolhe tudo o que precisares. Os itens com «painel» incluem gestão própria.">
                <div className="grid gap-2 sm:grid-cols-2">
                  {FUNCS.map((f) => {
                    const on = r.funcs.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => set("funcs", on ? r.funcs.filter((x) => x !== f.id) : [...r.funcs, f.id])}
                        className="chip justify-between text-sm"
                      >
                        <span>
                          {f.titulo}
                          {f.bd && <span className="ml-2 rounded-full border border-gold/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-gold">painel</span>}
                        </span>
                        <Marca on={on} />
                      </button>
                    );
                  })}
                </div>
              </Bloco>
            )}

            {passo === 5 && (
              <Bloco t="Endereço e emails." s="O endereço é como os clientes te encontram (ex.: doces-da-ana.ao).">
                <div className="grid gap-3">
                  {(["vercel", "com", "ao"] as Dominio[]).map((d) => {
                    const bloqueado = bd && d === "vercel";
                    const preco = bloqueado ? null : calcularOrcamento({ comBaseDados: bd, dominio: d, emailsProfissionais: 0 }).base;
                    const on = dominioEfectivo(r) === d;
                    return (
                      <button key={d} type="button" disabled={bloqueado} aria-pressed={on} onClick={() => set("dominio", d)} className="chip justify-between py-4 disabled:cursor-not-allowed disabled:opacity-40">
                        <span>
                          <b className="block text-[15px] text-cream">{{ vercel: "Endereço .vercel.app", com: "Domínio .com", ao: "Domínio .ao (Angola)" }[d]}</b>
                          <span className="mt-0.5 block text-xs text-cream/55">
                            {bloqueado ? "Lojas, blogs e sistemas precisam de domínio próprio" : { vercel: "Para começar já, sem domínio próprio", com: "O mais usado no mundo", ao: "Mostra que és angolano. Mais confiança local" }[d]}
                          </span>
                        </span>
                        <span className="flex items-center gap-3">
                          {preco !== null && <span className="whitespace-nowrap text-sm font-semibold text-gold">{formatKz(preco)}</span>}
                          <Marca on={on} />
                        </span>
                      </button>
                    );
                  })}
                </div>
                {dominioEfectivo(r) !== "vercel" && (
                  <>
                    <label className="mt-5 block">
                      <span className="mb-2 block text-sm text-cream/70">Que nome queres? <span className="text-cream-dim">(opcional, confirmamos se está livre)</span></span>
                      <input className="field" value={r.dominioNome} onChange={(e) => set("dominioNome", e.target.value.replace(/\s+/g, "").toLowerCase())} placeholder={`ex.: ${(r.negocio || "meunegocio").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "")}.${dominioEfectivo(r)}`} maxLength={60} inputMode="url" autoCapitalize="none" />
                    </label>
                    <div className="mt-5 flex items-center justify-between rounded-2xl border border-line bg-night-2 p-4">
                      <span>
                        <b className="block text-[15px]">Emails profissionais</b>
                        <span className="text-xs text-cream/55">ex.: geral@{(r.negocio || "negocio").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "")}.{dominioEfectivo(r)} · {formatKz(PRECOS.emailExtra)} cada{bd ? " · 1 incluído" : ""}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <button type="button" aria-label="Menos um email" onClick={() => set("emails", Math.max(0, r.emails - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-gold/50"><Minus size={16} /></button>
                        <span className="w-6 text-center text-lg tabular-nums">{r.emails}</span>
                        <button type="button" aria-label="Mais um email" onClick={() => set("emails", Math.min(10, r.emails + 1))} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-gold/50"><Plus size={16} /></button>
                      </span>
                    </div>
                  </>
                )}
              </Bloco>
            )}

            {passo === 6 && (
              <Bloco t="Onde te encontram hoje?" s="Para ligarmos o site às tuas redes. Este passo é opcional.">
                <div className="grid gap-3">
                  <input className="field" value={r.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="WhatsApp do negócio (ex.: 923 000 000)" inputMode="tel" autoComplete="tel" maxLength={25} />
                  <input className="field" value={r.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="Instagram (ex.: @docesdaana)" autoCapitalize="none" maxLength={40} />
                  <input className="field" value={r.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="Facebook (nome ou link da página)" autoCapitalize="none" maxLength={60} />
                  <input className="field" value={r.cidade} onChange={(e) => set("cidade", e.target.value)} placeholder="Cidade / bairro (ex.: Huambo, Cidade Alta)" autoComplete="address-level2" maxLength={40} />
                </div>
              </Bloco>
            )}

            {passo === 7 && (
              <Bloco t="Dados legais do teu negócio." s="Opcional. Usamos estes dados no rodapé e na página de termos do teu site.">
                <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
                  <label className="block">
                    <span className="mb-2 block text-sm text-cream/70">Denominação social <span className="text-cream-dim">(se tiveres)</span></span>
                    <input className="field" value={r.denominacao} onChange={(e) => set("denominacao", e.target.value)} placeholder="Ex.: Doces da Ana, Lda." autoComplete="organization" maxLength={80} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-cream/70">NIF</span>
                    <input className="field" value={r.nif} onChange={(e) => set("nif", e.target.value.replace(/\s+/g, "").toUpperCase())} placeholder="Ex.: 5417000000" autoCapitalize="characters" maxLength={20} />
                  </label>
                </div>

                <div className="mb-3 mt-8 flex items-end justify-between gap-4">
                  <span>
                    <b className="block text-[15px] text-cream">Termos de serviço do teu site</b>
                    <span className="text-sm text-cream/60">Marca as regras que se aplicam ao teu negócio. Nós redigimos a página completa.</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => set("termos", clausulas.every((c) => r.termos.includes(c.id)) ? [] : clausulas.map((c) => c.id))}
                    className="shrink-0 rounded-full border border-line px-3 py-2 text-xs text-cream/75 transition-colors hover:border-gold/50 hover:text-cream"
                  >
                    {clausulas.every((c) => r.termos.includes(c.id)) ? "Limpar" : "Marcar todas"}
                  </button>
                </div>
                <div className="grid gap-2">
                  {clausulas.map((c) => {
                    const on = r.termos.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => set("termos", on ? r.termos.filter((x) => x !== c.id) : [...r.termos, c.id])}
                        className="chip items-start justify-between gap-4 py-3.5 text-sm leading-snug"
                      >
                        <span>{textoClausula(c, r)}</span>
                        <Marca on={on} />
                      </button>
                    );
                  })}
                </div>

                <label className="mt-6 block">
                  <span className="mb-2 block text-sm text-cream/70">Notas finais <span className="text-cream-dim">(opcional)</span></span>
                  <textarea className="field min-h-[96px] resize-y" value={r.notasTermos} onChange={(e) => set("notasTermos", e.target.value)} placeholder="Ex.: entregas só no Huambo; pagamento na entrega aceite." maxLength={240} />
                </label>
              </Bloco>
            )}

            {passo === 8 && (
              <Bloco t="Queres mais clientes com anúncios?" s="Facebook, Instagram e Google, num contrato à parte. Não muda o preço do site.">
                <div className="grid gap-3">
                  {([["sim", "Sim, quero vender mais", "Preparamos o site para anúncios desde o primeiro dia."], ["talvez", "Talvez, quero saber mais", "Explicamos-te como funciona, sem compromisso."], ["nao", "Agora não", "Começamos só com o site."]] as const).map(([id, t, d]) => (
                    <button key={id} type="button" aria-pressed={r.trafego === id} onClick={() => set("trafego", id)} className="chip justify-between py-4">
                      <span>
                        <b className="block text-[15px] text-cream">{t}</b>
                        <span className="mt-0.5 block text-xs text-cream/55">{d}</span>
                      </span>
                      <Marca on={r.trafego === id} />
                    </button>
                  ))}
                </div>
              </Bloco>
            )}
          </div>

          {/* navegação no computador */}
          <div className="mt-10 hidden items-center justify-between lg:flex">
            <button type="button" onClick={anterior} disabled={passo === 0} className="btn-ghost disabled:invisible"><ArrowLeft size={18} /> Voltar</button>
            <button type="button" onClick={seguinte} disabled={!valido} className="btn-gold min-w-[220px]">
              {passo === TOTAL - 1 ? (<><Sparkles size={18} /> Ver o meu orçamento</>) : vazio ? "Saltar" : (<>Continuar <ArrowRight size={18} /></>)}
            </button>
          </div>
        </div>
      </div>

      {/* barra fixa no telemóvel */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-night/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="wrap flex items-center gap-3 py-3">
          <button type="button" onClick={anterior} disabled={passo === 0} aria-label="Voltar" className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-line disabled:opacity-30"><ArrowLeft size={18} /></button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[.18em] text-cream-dim">Estimativa</p>
            <p className="truncate font-display text-xl text-gold-grad">{r.tipo ? formatKz(orc.total) : "—"}</p>
          </div>
          <button type="button" onClick={seguinte} disabled={!valido} className="btn-gold !px-5 text-[15px]">
            {passo === TOTAL - 1 ? "Ver orçamento" : vazio ? "Saltar" : "Continuar"} <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Bloco({ t, s, children }: { t: string; s: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="h-display text-[34px] sm:text-5xl">{t}</h1>
      <p className="mb-7 mt-3 text-[15px] text-cream/65">{s}</p>
      {children}
    </div>
  );
}

function Marca({ on }: { on: boolean }) {
  return (
    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${on ? "border-gold bg-gold text-night" : "border-white/20"}`}>
      {on && <Check size={14} strokeWidth={3} />}
    </span>
  );
}
