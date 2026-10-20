// Mini-site desenhado em HTML/CSS que muda com as respostas do cliente.
// Usado na prévia ao vivo do formulário e no ecrã do dispositivo 3D da página inicial.
// Escala sozinho com a largura do contentor (unidades cqw).
import type { Tipo } from "@/lib/fluxo";

export interface MiniSiteProps {
  nome: string;
  ramo?: string | null;
  tipo: Tipo | null;
  serif: boolean;
  bg: string;
  fg: string;
  ac: string;
  sf: string;
  funcs?: string[];
}

function iniciais(n: string) {
  const p = n.trim().split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "S") + (p[1]?.[0] ?? "")).toUpperCase();
}

export default function MiniSite({ nome, ramo, tipo, serif, bg, fg, ac, sf, funcs = [] }: MiniSiteProps) {
  const titulo = nome.trim() || "O teu negócio";
  const ff = serif ? "var(--font-display), Georgia, serif" : "var(--font-sans), system-ui, sans-serif";
  const mute = `color-mix(in srgb, ${fg} 55%, transparent)`;
  const line = `color-mix(in srgb, ${fg} 12%, transparent)`;
  const cta = tipo === "loja" ? "Ver produtos" : tipo === "blog" ? "Ler artigos" : tipo === "sistema" ? "Entrar" : "Falar connosco";

  return (
    <div className="h-full w-full overflow-hidden" style={{ containerType: "inline-size", background: bg, color: fg }}>
      <div style={{ padding: "2.6cqw 4cqw", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.4cqw" }}>
          <div style={{ width: "4.2cqw", height: "4.2cqw", borderRadius: "50%", background: ac, color: bg, display: "grid", placeItems: "center", fontSize: "1.7cqw", fontWeight: 700 }}>{iniciais(titulo)}</div>
          <span style={{ fontFamily: ff, fontSize: "2.2cqw", fontWeight: 600, whiteSpace: "nowrap", maxWidth: "34cqw", overflow: "hidden", textOverflow: "ellipsis" }}>{titulo}</span>
        </div>
        <div style={{ display: "flex", gap: "2.4cqw", alignItems: "center" }}>
          {["Início", "Sobre", tipo === "loja" ? "Loja" : "Serviços"].map((x) => (
            <span key={x} style={{ fontSize: "1.45cqw", color: mute }}>{x}</span>
          ))}
          <span style={{ fontSize: "1.4cqw", background: ac, color: bg, padding: ".8cqw 1.8cqw", borderRadius: "9cqw", fontWeight: 600 }}>{tipo === "loja" ? "Carrinho" : "Contacto"}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "4cqw", padding: "5cqw 4cqw 3.5cqw", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "1.3cqw", letterSpacing: ".3em", textTransform: "uppercase", color: ac, fontWeight: 600 }}>{ramo || "O teu ramo"}</div>
          <div style={{ fontFamily: ff, fontSize: "5.4cqw", lineHeight: 1.02, marginTop: "1.6cqw", fontWeight: serif ? 400 : 700, letterSpacing: "-.02em" }}>
            {titulo}
            <span style={{ color: ac }}>.</span>
          </div>
          <div style={{ marginTop: "2cqw", display: "grid", gap: "1cqw" }}>
            <div style={{ height: "1cqw", width: "85%", borderRadius: 9, background: line }} />
            <div style={{ height: "1cqw", width: "62%", borderRadius: 9, background: line }} />
          </div>
          <div style={{ display: "flex", gap: "1.4cqw", marginTop: "3cqw" }}>
            <span style={{ fontSize: "1.55cqw", background: ac, color: bg, padding: "1.3cqw 2.6cqw", borderRadius: "9cqw", fontWeight: 700 }}>{cta}</span>
            <span style={{ fontSize: "1.55cqw", border: `1px solid ${line}`, padding: "1.3cqw 2.6cqw", borderRadius: "9cqw" }}>WhatsApp</span>
          </div>
        </div>
        <div style={{ position: "relative", aspectRatio: "4/3.4", borderRadius: "2.4cqw", overflow: "hidden", background: `radial-gradient(120% 90% at 70% 20%, color-mix(in srgb, ${ac} 70%, transparent), ${sf} 70%)` }}>
          <div style={{ position: "absolute", left: "10%", bottom: "12%", right: "10%", height: "18%", borderRadius: "1.6cqw", background: `color-mix(in srgb, ${bg} 70%, transparent)`, backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: "1.4cqw", padding: "0 2cqw" }}>
            <div style={{ width: "3.2cqw", height: "3.2cqw", borderRadius: "50%", background: ac }} />
            <div style={{ flex: 1, display: "grid", gap: ".7cqw" }}>
              <div style={{ height: ".8cqw", width: "70%", borderRadius: 9, background: `color-mix(in srgb, ${fg} 35%, transparent)` }} />
              <div style={{ height: ".8cqw", width: "45%", borderRadius: 9, background: line }} />
            </div>
          </div>
          <div style={{ position: "absolute", top: "14%", left: "14%", width: "34%", aspectRatio: "1", borderRadius: "50%", border: `0.5cqw solid color-mix(in srgb, ${fg} 30%, transparent)` }} />
        </div>
      </div>

      <div style={{ padding: "0 4cqw 4cqw" }}>
        {tipo === "loja" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.8cqw" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ background: sf, borderRadius: "1.6cqw", padding: "1.2cqw" }}>
                <div style={{ aspectRatio: "1", borderRadius: "1.1cqw", background: `linear-gradient(${140 + i * 30}deg, color-mix(in srgb, ${ac} ${40 + i * 10}%, ${sf}), ${sf})` }} />
                <div style={{ height: ".8cqw", width: "70%", borderRadius: 9, background: line, marginTop: "1.2cqw" }} />
                <div style={{ fontSize: "1.4cqw", fontWeight: 700, marginTop: ".9cqw", color: ac }}>{(12 + i * 7) * 1000} Kz</div>
              </div>
            ))}
          </div>
        ) : tipo === "blog" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2cqw" }}>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div style={{ aspectRatio: "16/10", borderRadius: "1.4cqw", background: `linear-gradient(${120 + i * 40}deg, color-mix(in srgb, ${ac} 55%, ${sf}), ${sf})` }} />
                <div style={{ fontFamily: ff, fontSize: "1.7cqw", marginTop: "1.2cqw", fontWeight: 600 }}>Artigo {i + 1}</div>
                <div style={{ height: ".8cqw", width: "90%", borderRadius: 9, background: line, marginTop: ".8cqw" }} />
              </div>
            ))}
          </div>
        ) : tipo === "sistema" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.6fr", gap: "1.8cqw" }}>
            {["Clientes", "Reservas", "Receita"].map((k, i) => (
              <div key={k} style={{ background: sf, borderRadius: "1.6cqw", padding: "1.8cqw" }}>
                <div style={{ fontSize: "1.2cqw", color: mute }}>{k}</div>
                <div style={{ fontSize: "2.8cqw", fontWeight: 700, marginTop: ".6cqw", fontFamily: ff }}>{[128, 46, "92%"][i]}</div>
              </div>
            ))}
            <div style={{ background: sf, borderRadius: "1.6cqw", padding: "1.8cqw", display: "flex", alignItems: "flex-end", gap: "1cqw" }}>
              {[40, 65, 50, 80, 70, 95].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h * 0.08}cqw`, borderRadius: ".6cqw", background: i === 5 ? ac : line }} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2cqw" }}>
            {(funcs.length ? funcs.slice(0, 3) : ["a", "b", "c"]).map((f, i) => (
              <div key={f + i} style={{ background: sf, borderRadius: "1.6cqw", padding: "2cqw" }}>
                <div style={{ width: "3.6cqw", height: "3.6cqw", borderRadius: "1cqw", background: `color-mix(in srgb, ${ac} 25%, transparent)`, border: `1px solid color-mix(in srgb, ${ac} 60%, transparent)` }} />
                <div style={{ height: ".9cqw", width: "75%", borderRadius: 9, background: `color-mix(in srgb, ${fg} 30%, transparent)`, marginTop: "1.6cqw" }} />
                <div style={{ height: ".8cqw", width: "55%", borderRadius: 9, background: line, marginTop: ".8cqw" }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
