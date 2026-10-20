"use client";
// Poeira dourada em WebGL puro (sem bibliotecas). Leve: ~150 partículas no telemóvel, ~340 no computador.
// Pára quando sai do ecrã ou o separador fica escondido. Sem WebGL → não desenha nada (o fundo CSS continua).
import { useEffect, useRef } from "react";

const VS = `
attribute vec4 a;
uniform float t;
uniform vec2 m;
uniform float dpr;
varying float al;
void main(){
  float z = a.z;
  float sp = 0.006 + a.w * 0.012;
  float y = fract(a.y + t * sp) * 2.4 - 1.2;
  float x = a.x + sin(t * 0.15 + a.w * 6.2831) * 0.04 * z;
  vec2 p = vec2(x, y) + m * (0.02 + z * 0.06);
  gl_Position = vec4(p, 0.0, 1.0);
  gl_PointSize = (1.2 + z * z * 5.5) * dpr;
  float tw = 0.65 + 0.35 * sin(t * (0.6 + a.w) + a.w * 40.0);
  al = (0.18 + 0.82 * z) * tw * smoothstep(-1.2, -0.7, y) * (1.0 - smoothstep(0.75, 1.2, y));
}`;

const FS = `
precision mediump float;
varying float al;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float k = smoothstep(0.5, 0.0, d);
  k *= k;
  vec3 c = mix(vec3(0.65, 0.49, 0.10), vec3(1.0, 0.88, 0.55), k);
  gl_FragColor = vec4(c * k * al, k * al);
}`;

export default function GoldField({ className = "", density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = c.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "low-power" });
    } catch {
      gl = null;
    }
    if (!gl) return;
    const g = gl;

    const mk = (type: number, src: string) => {
      const s = g.createShader(type)!;
      g.shaderSource(s, src);
      g.compileShader(s);
      return s;
    };
    const pr = g.createProgram()!;
    g.attachShader(pr, mk(g.VERTEX_SHADER, VS));
    g.attachShader(pr, mk(g.FRAGMENT_SHADER, FS));
    g.linkProgram(pr);
    if (!g.getProgramParameter(pr, g.LINK_STATUS)) return;
    g.useProgram(pr);

    const mobile = window.innerWidth < 768;
    const N = Math.round((mobile ? 150 : 340) * density);
    const data = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      data[i * 4] = Math.random() * 2.2 - 1.1;
      data[i * 4 + 1] = Math.random();
      data[i * 4 + 2] = Math.pow(Math.random(), 1.6);
      data[i * 4 + 3] = Math.random();
    }
    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, data, g.STATIC_DRAW);
    const loc = g.getAttribLocation(pr, "a");
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 4, g.FLOAT, false, 0, 0);
    const uT = g.getUniformLocation(pr, "t");
    const uM = g.getUniformLocation(pr, "m");
    const uD = g.getUniformLocation(pr, "dpr");
    g.enable(g.BLEND);
    g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);

    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const resize = () => {
      const w = c.clientWidth, h = c.clientHeight;
      c.width = Math.max(1, Math.round(w * dpr));
      c.height = Math.max(1, Math.round(h * dpr));
      g.viewport(0, 0, c.width, c.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      g.uniform1f(uT, reduce ? 12 : (performance.now() - t0) / 1000);
      g.uniform2f(uM, mouse.x, mouse.y);
      g.uniform1f(uD, dpr);
      g.drawArrays(g.POINTS, 0, N);
    };
    const loop = () => {
      draw();
      raf = visible && !document.hidden && !reduce ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(c);
    const onVis = () => { if (!document.hidden) start(); };
    document.addEventListener("visibilitychange", onVis);
    draw();
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      g.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
