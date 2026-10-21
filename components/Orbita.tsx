"use client";
// Escultura 3D do símbolo da marca (anéis de ouro abertos + pérola creme), em WebGL puro (sem bibliotecas).
// "hero": abre do logótipo plano para um giroscópio de ouro e segue o rato e o scroll.
// "analise": faz o caminho inverso, o giroscópio fecha-se no logótipo à medida que `progresso` vai de 0 a 1.
// "cta": giroscópio livre, mais calmo.
// Corre sempre que o navegador tem WebGL: em telemóveis fracos ou com poupança de dados baixa a qualidade,
// com "movimento reduzido" anda mais devagar. Sem WebGL, o símbolo em SVG gira em CSS (nunca fica parado).
import { useEffect, useRef, useState } from "react";

type Modo = "hero" | "analise" | "cta";

const VS = `
attribute vec3 p;
attribute vec3 n;
uniform mat4 M;
uniform mat3 N;
uniform mat4 VP;
varying vec3 wn;
varying vec3 wp;
void main(){
  vec4 w = M * vec4(p, 1.0);
  wp = w.xyz;
  wn = N * n;
  gl_Position = VP * w;
}`;

// Estúdio escuro com caixas de luz quentes: é o reflexo delas que faz o metal parecer ouro.
const FS = `
precision highp float;
varying vec3 wn;
varying vec3 wp;
uniform vec3 cam;
uniform float kind;
uniform float alpha;
uniform float rot;
vec3 env(vec3 d){
  float c0 = cos(rot), s0 = sin(rot);
  d = vec3(c0 * d.x + s0 * d.z, d.y, -s0 * d.x + c0 * d.z);
  vec3 c = mix(vec3(0.012, 0.010, 0.008), vec3(0.07, 0.055, 0.04), smoothstep(-0.7, 0.7, d.y));
  c += vec3(1.0, 0.90, 0.72) * 2.6 * smoothstep(0.50, 0.85, d.y) * smoothstep(0.85, 0.15, abs(d.x));
  c += vec3(1.0, 0.82, 0.55) * 2.0 * smoothstep(0.70, 0.93, -d.x) * smoothstep(0.75, 0.05, abs(d.y - 0.15));
  c += vec3(0.95, 0.62, 0.25) * 1.5 * smoothstep(0.72, 0.95, d.x) * smoothstep(0.9, 0.0, abs(d.y + 0.1));
  c += vec3(1.0, 0.86, 0.6) * 1.8 * smoothstep(0.90, 0.985, dot(d, normalize(vec3(-0.35, 0.45, 0.82))));
  c += vec3(1.0, 0.78, 0.45) * 0.7 * exp(-pow(d.y * 12.0, 2.0));
  return c;
}
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
void main(){
  vec3 N = normalize(wn);
  vec3 V = normalize(cam - wp);
  if (dot(N, V) < 0.0) N = -N;
  vec3 R = reflect(-V, N);
  float ndv = max(dot(N, V), 0.0);
  vec3 col;
  if (kind < 0.5) {
    vec3 F0 = vec3(1.0, 0.74, 0.30);
    vec3 F = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0);
    col = env(R) * F + F0 * 0.035;
  } else {
    vec3 L = normalize(vec3(-0.4, 0.6, 0.8));
    vec3 base = vec3(0.98, 0.94, 0.86);
    float dif = 0.38 + 0.62 * max(dot(N, L), 0.0);
    float F = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);
    col = base * dif * 0.85 + env(R) * (0.12 + F * 0.6);
  }
  col = pow(aces(col * 1.15), vec3(1.0 / 2.2));
  gl_FragColor = vec4(col * alpha, alpha);
}`;

// ---------- matemática mínima (matrizes 4x4 em coluna, como o WebGL espera) ----------
type M4 = Float32Array;
const m4 = () => { const m = new Float32Array(16); m[0] = m[5] = m[10] = m[15] = 1; return m; };
function mul(a: M4, b: M4): M4 {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
}
function rotX(t: number) { const m = m4(), c = Math.cos(t), s = Math.sin(t); m[5] = c; m[6] = s; m[9] = -s; m[10] = c; return m; }
function rotY(t: number) { const m = m4(), c = Math.cos(t), s = Math.sin(t); m[0] = c; m[2] = -s; m[8] = s; m[10] = c; return m; }
function rotZ(t: number) { const m = m4(), c = Math.cos(t), s = Math.sin(t); m[0] = c; m[1] = s; m[4] = -s; m[5] = c; return m; }
function trans(x: number, y: number, z: number) { const m = m4(); m[12] = x; m[13] = y; m[14] = z; return m; }
function scale(k: number) { const m = m4(); m[0] = m[5] = m[10] = k; return m; }
function persp(fov: number, asp: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2), m = new Float32Array(16);
  m[0] = f / asp; m[5] = f; m[10] = (far + near) / (near - far); m[11] = -1; m[14] = (2 * far * near) / (near - far);
  return m;
}
// Só há rotações e escala uniforme: a matriz das normais é a parte 3x3 da matriz do modelo, normalizada no shader.
function nmat(m: M4) { return new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]); }

// ---------- geometria ----------
interface Malha { pos: Float32Array; nor: Float32Array; idx: Uint16Array }

/** Toro aberto (arco de a0 a a1, em radianos), no plano XY. */
function arco(R: number, r: number, a0: number, a1: number, su: number, sv: number): Malha {
  const pos: number[] = [], nor: number[] = [], idx: number[] = [];
  for (let i = 0; i <= su; i++) {
    const u = a0 + ((a1 - a0) * i) / su, cu = Math.cos(u), snu = Math.sin(u);
    for (let j = 0; j <= sv; j++) {
      const v = (j / sv) * Math.PI * 2, cv = Math.cos(v), sv2 = Math.sin(v);
      nor.push(cu * cv, snu * cv, sv2);
      pos.push((R + r * cv) * cu, (R + r * cv) * snu, r * sv2);
    }
  }
  for (let i = 0; i < su; i++) for (let j = 0; j < sv; j++) {
    const a = i * (sv + 1) + j, b = a + sv + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  return { pos: new Float32Array(pos), nor: new Float32Array(nor), idx: new Uint16Array(idx) };
}

function esfera(su: number, sv: number): Malha {
  const pos: number[] = [], idx: number[] = [];
  for (let i = 0; i <= sv; i++) {
    const th = (i / sv) * Math.PI;
    for (let j = 0; j <= su; j++) {
      const ph = (j / su) * Math.PI * 2;
      pos.push(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph));
    }
  }
  for (let i = 0; i < sv; i++) for (let j = 0; j < su; j++) {
    const a = i * (su + 1) + j, b = a + su + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const p = new Float32Array(pos);
  return { pos: p, nor: p, idx: new Uint16Array(idx) };
}

// Proporções exactas do logótipo (SVG: anel 40/traço 6, anel 25/traço 5, pupila 9).
const DEG = Math.PI / 180;
const ANEIS = [
  { R: 1, r: 0.075, a0: -233.7 * DEG, a1: 60 * DEG },
  { R: 0.625, r: 0.0625, a0: -35 * DEG, a1: 240 * DEG },
];
const PUPILA = 0.225;

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Aparelho modesto (poucos núcleos, pouca memória ou poupança de dados) → menos polígonos e resolução 1x. */
function aparelhoLeve() {
  try {
    const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    return !!n.connection?.saveData || (n.hardwareConcurrency || 4) <= 4 || (n.deviceMemory ?? 4) < 4;
  } catch {
    return true;
  }
}

export default function Orbita({ modo = "hero", progresso = 0, className = "" }: { modo?: Modo; progresso?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const prog = useRef(progresso);
  const [pronto, setPronto] = useState(false);
  prog.current = progresso;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const mobile = window.innerWidth < 768;
    const leve = aparelhoLeve();
    let calmo = false;
    try { calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { /* sem matchMedia */ }
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (c.getContext("webgl", { alpha: true, antialias: !leve, premultipliedAlpha: true, powerPreference: mobile ? "low-power" : "high-performance" }) ||
        c.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: true })) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;
    const g = gl;

    const sh = (t: number, s: string) => {
      const o = g.createShader(t)!;
      g.shaderSource(o, s);
      g.compileShader(o);
      if (!g.getShaderParameter(o, g.COMPILE_STATUS)) console.warn("Orbita: shader", g.getShaderInfoLog(o));
      return o;
    };
    const pr = g.createProgram()!;
    g.attachShader(pr, sh(g.VERTEX_SHADER, VS));
    g.attachShader(pr, sh(g.FRAGMENT_SHADER, FS.replace("precision highp", g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT)?.precision ? "precision highp" : "precision mediump")));
    g.linkProgram(pr);
    if (!g.getProgramParameter(pr, g.LINK_STATUS)) { console.warn("Orbita:", g.getProgramInfoLog(pr)); return; }
    g.useProgram(pr);

    const aP = g.getAttribLocation(pr, "p"), aN = g.getAttribLocation(pr, "n");
    const u = (k: string) => g.getUniformLocation(pr, k);
    const uM = u("M"), uN = u("N"), uVP = u("VP"), uCam = u("cam"), uKind = u("kind"), uAlpha = u("alpha"), uRot = u("rot");

    const subir = (m: Malha) => {
      const vb = g.createBuffer(), nb = g.createBuffer(), ib = g.createBuffer();
      g.bindBuffer(g.ARRAY_BUFFER, vb); g.bufferData(g.ARRAY_BUFFER, m.pos, g.STATIC_DRAW);
      g.bindBuffer(g.ARRAY_BUFFER, nb); g.bufferData(g.ARRAY_BUFFER, m.nor, g.STATIC_DRAW);
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, ib); g.bufferData(g.ELEMENT_ARRAY_BUFFER, m.idx, g.STATIC_DRAW);
      return { vb, nb, ib, n: m.idx.length };
    };
    const q = leve ? 0.45 : mobile ? 0.6 : 1;
    const aneis = ANEIS.map((a) => subir(arco(a.R, a.r, a.a0, a.a1, Math.round(150 * q), Math.round(22 * q))));
    const orbita = subir(arco(1.55, 0.007, 0, Math.PI * 2, Math.round(160 * q), 8));
    const bola = subir(esfera(Math.round(36 * q), Math.round(24 * q)));

    g.enable(g.DEPTH_TEST);
    g.enable(g.BLEND);
    g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);
    g.enableVertexAttribArray(aP);
    g.enableVertexAttribArray(aN);

    const dpr = Math.min(window.devicePixelRatio || 1, leve ? 1 : mobile ? 1.5 : 2);
    let asp = 1;
    const resize = () => {
      const w = c.clientWidth, h = c.clientHeight;
      c.width = Math.max(1, Math.round(w * dpr));
      c.height = Math.max(1, Math.round(h * dpr));
      asp = w / Math.max(1, h);
      g.viewport(0, 0, c.width, c.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const rato = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rato.tx = (e.clientX / window.innerWidth) * 2 - 1;
      rato.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    // No telemóvel: arrastar o dedo sobre a escultura inclina-a; ao largar, volta devagar ao centro.
    const onToque = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const b = c.getBoundingClientRect();
      rato.tx = Math.max(-1, Math.min(1, ((e.clientX - b.left) / b.width) * 2 - 1)) * 1.6;
      rato.ty = Math.max(-1, Math.min(1, ((e.clientY - b.top) / b.height) * 2 - 1));
    };
    const onLargar = (e: PointerEvent) => { if (e.pointerType !== "mouse") { rato.tx = 0; rato.ty = 0; } };
    c.addEventListener("pointermove", onToque, { passive: true });
    c.addEventListener("pointerdown", onToque, { passive: true });
    c.addEventListener("pointerup", onLargar, { passive: true });
    c.addEventListener("pointercancel", onLargar, { passive: true });

    const camZ = 6.4;
    const cam = new Float32Array([0, 0, camZ]);
    let fecho = modo === "analise" ? 0 : 1; // 1 = logótipo plano, 0 = giroscópio aberto

    const desenhar = (m: { vb: WebGLBuffer | null; nb: WebGLBuffer | null; ib: WebGLBuffer | null; n: number }, M: M4, kind: number, alpha: number) => {
      g.bindBuffer(g.ARRAY_BUFFER, m.vb); g.vertexAttribPointer(aP, 3, g.FLOAT, false, 0, 0);
      g.bindBuffer(g.ARRAY_BUFFER, m.nb); g.vertexAttribPointer(aN, 3, g.FLOAT, false, 0, 0);
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, m.ib);
      g.uniformMatrix4fv(uM, false, M);
      g.uniformMatrix3fv(uN, false, nmat(M));
      g.uniform1f(uKind, kind);
      g.uniform1f(uAlpha, alpha);
      g.drawElements(g.TRIANGLES, m.n, g.UNSIGNED_SHORT, 0);
    };

    const t0 = performance.now();
    const frame = () => {
      const t = ((performance.now() - t0) / 1000) * (calmo ? 0.5 : 1);
      rato.x += (rato.tx - rato.x) * 0.05;
      rato.y += (rato.ty - rato.y) * 0.05;

      // Abrir/fechar: o hero começa no logótipo e abre-se; a análise fecha-se no logótipo.
      if (modo === "hero") fecho = 1 - ease((t - 0.35) / 2.2);
      else if (modo === "cta") fecho = 0;
      else fecho += (ease(prog.current) - fecho) * 0.06;
      const k = 1 - fecho;

      const r = c.getBoundingClientRect();
      const sp = modo === "hero" ? Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))) : 0;
      const vel = modo === "cta" ? 0.6 : 1;

      const VP = mul(persp(30 * DEG, asp, 0.1, 50), trans(0, 0, -camZ));
      g.uniformMatrix4fv(uVP, false, VP);
      g.uniform3fv(uCam, cam);
      g.uniform1f(uRot, Math.sin(t * 0.25) * 0.6 + rato.x * 0.4);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);

      const grupo = mul(
        // rotY com t: a escultura roda devagar sobre si própria (efeito "plataforma giratória").
        mul(rotY(k * (t * 0.32 * vel + rato.x * 0.45)), rotX(k * (rato.y * 0.3 + Math.sin(t * 0.17) * 0.12) + sp * 0.9)),
        scale(1 + sp * 0.25 + k * (0.1 + 0.04 * Math.sin(t * 0.6))),
      );
      // Anel exterior e interior em eixos diferentes: o "giroscópio".
      const livre = [
        [1.05 + 0.3 * Math.sin(t * 0.4 * vel), 0.4 * Math.sin(t * 0.3 * vel), t * 0.35 * vel],
        [-0.55 + 0.35 * Math.sin(t * 0.36 * vel + 1), 1.15 + 0.3 * Math.sin(t * 0.26 * vel), -t * 0.5 * vel],
      ];
      ANEIS.forEach((a, i) => {
        const [x, y, z] = livre[i];
        const M = mul(grupo, mul(rotX(x * k), mul(rotY(y * k), rotZ(z * k))));
        desenhar(aneis[i], M, 0, 1);
        for (const ang of [a.a0, a.a1]) desenhar(bola, mul(M, mul(trans(a.R * Math.cos(ang), a.R * Math.sin(ang), 0), scale(a.r))), 0, 1);
      });
      desenhar(bola, mul(grupo, scale(PUPILA * (1 + 0.03 * Math.sin(t * 1.3) * k))), 1, 1);

      if (k > 0.01) {
        const O = mul(grupo, mul(rotX(1.32 + 0.05 * Math.sin(t * 0.2)), mul(rotY(-0.25), mul(rotZ(t * 0.07), scale(0.6 + 0.4 * k)))));
        desenhar(orbita, O, 0, k * 0.9);
        const b = t * 0.55;
        desenhar(bola, mul(O, mul(trans(1.55 * Math.cos(b), 1.55 * Math.sin(b), 0), scale(0.045))), 0, k);
      }
    };

    let visivel = true;
    let raf = 0;
    const loop = () => { frame(); raf = visivel && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel) start(); });
    io.observe(c);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", onVis);
    frame();
    setPronto(true);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointermove", onToque);
      c.removeEventListener("pointerdown", onToque);
      c.removeEventListener("pointerup", onLargar);
      c.removeEventListener("pointercancel", onLargar);
      document.removeEventListener("visibilitychange", onVis);
      g.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [modo]);

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* brilho por trás da escultura (bloom simulado) */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(212,169,54,.32),rgba(212,169,54,.08)_55%,transparent)] blur-2xl" />
      {/* poster: o símbolo estático, visível até o 3D estar pronto (ou para sempre, sem 3D) */}
      <svg viewBox="-50 -50 100 100" fill="none" className={`absolute inset-[13.5%] h-[73%] w-[73%] transition-opacity duration-700 ${pronto ? "opacity-0" : "opacity-100"}`}>
        <defs>
          <linearGradient id="orb-gold" gradientUnits="userSpaceOnUse" x1="-43" y1="-43" x2="43" y2="43">
            <stop offset="0" stopColor="#F3D77A" />
            <stop offset="0.5" stopColor="#D4A936" />
            <stop offset="1" stopColor="#A67C1A" />
          </linearGradient>
        </defs>
        <g className="orb-gira"><circle r="40" stroke="url(#orb-gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray="205 46.33" transform="rotate(-60)" /></g>
        <g className="orb-gira orb-inv"><circle r="25" stroke="url(#orb-gold)" strokeWidth="5" strokeLinecap="round" strokeDasharray="120 37.08" transform="rotate(120)" /></g>
        <circle r="9" fill="#F4EFE6" />
      </svg>
      <canvas ref={ref} className={`absolute inset-0 h-full w-full touch-pan-y transition-opacity duration-700 ${pronto ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
