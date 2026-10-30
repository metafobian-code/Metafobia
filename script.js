// Edita este arreglo para añadir, quitar o modificar proyectos.
const projects = [
  { name: "Luz rubia", url: "https://metafobian-code.github.io/-Short/" },
  { name: "El significado de las cosas", url: "https://metafobian-code.github.io/signos/" },
  { name: "Nada sostiene", url: "https://metafobian-code.github.io/poema-ascii.html/" },
  { name: "Entropía", url: "https://metafobian-code.github.io/schho/" },
  { name: "Q0", url: "https://online.fliphtml5.com/vogqc/awym/?fbclid=IwY2xjawU_OsdleHRuA2FlbQIxMQBwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHm_Xq2fKe3KqErYhhmFPK7PDdmOm-2yhHWiw0hkSH03Td0bIOfsbwkJu7Jtf_aem_y8FjoofX5Eq40AQEidEFlg#p=12" },
  { name: "Verso del delirio", url: "https://online.fliphtml5.com/vogqc/yjdf/?fbclid=IwY2xjawU_PnRleHRuA2FlbQIxMQBwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHk7SfZQQ8E31jZ3zesDBNvJ9hd9NjmWym-hPcyTyxsBbo6QusaQ5reK6dwUL_aem_3WCunQdTKhdWBy95731CkA#p=1" },
  { name: "Mi delirio tiene referencias", url: "https://metafobian-code.github.io/-xicos/" },
  { name: "JSON del Kernel Aristotélico", url: "https://metafobian-code.github.io/poetrycode/" },
  { name: "Huésped", url: "https://metafobian-code.github.io/host-detected/" },
  { name: "Otro orden", url: "https://metafobian-code.github.io/Test/" },
  { name: "Segmentos", url: "https://metafobian-code.github.io/Intercode/" },
  { name: "El significante en el sueño", url: "https://metafobian-code.github.io/Sue-o.html/" },
  { name: "Reflejos del día a día", url: "https://metafobian-code.github.io/index.html/" },
  { name: "Cristales en tus ojos", url: "https://metafobian-code.github.io/cystal.index.html/" },
  { name: "Memoria perdida", url: "https://metafobian-code.github.io/memory-lost/" },
  { name: "Navíos, música de R. Reyes", url: "https://metafobian-code.github.io/Navrr/" },
  { name: "Narración persistente", url: "https://metafobian-code.github.io/exec-0/payload/" },
  { name: "Horizonte", url: "https://metafobian-code.github.io/horizontes/" }
];
const FADE_MS = 700;
const list = document.getElementById("projectList");
const wrap = document.getElementById("listWrap");
const octopus = document.getElementById("octopus");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Generar listado
projects.forEach(p => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "link";
  a.href = p.url;
  a.textContent = p.name;
  li.appendChild(a);
  list.appendChild(li);
});

// Clic: desenfoque + desvanecimiento, luego navegar
list.addEventListener("click", e => {
  const a = e.target.closest("a.link");
  if (!a) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  if (a.classList.contains("leaving")) return;
  const url = a.href;
  a.classList.add("leaving");
  setTimeout(() => { window.location.href = url; }, reduceMotion.matches ? 0 : FADE_MS);
});
// Si el usuario vuelve con "atrás", restaurar los enlaces
window.addEventListener("pageshow", () => {
  list.querySelectorAll(".leaving").forEach(a => a.classList.remove("leaving"));
});

// ---------- Pulpo ----------
// Pequeño; camina sobre la parte superior de cada título y baja/sube
// estirando los tentáculos hasta agarrar el siguiente renglón.
const octoPos = document.getElementById("octoPos");
const octoHead = document.getElementById("octoHead");
const tentGroup = document.getElementById("tentacles");
const NS = "http://www.w3.org/2000/svg";
const N = 8;
const tents = [];
for (let i = 0; i < N; i++) {
  const el = document.createElementNS(NS, "path");
  tentGroup.appendChild(el);
  tents.push({ el, bx: (i - 3.5) * 3.4, rest: (i - 3.5) * 5.5 });
}
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = x => x * x * (3 - 2 * x);
const lerp = (a, b, k) => a + (b - a) * k;

let lines = [], sc = 1;
function measure() {
  const w = wrap.getBoundingClientRect();
  lines = [...list.querySelectorAll(".link")].map(a => {
    const r = a.getBoundingClientRect();
    return { top: r.top - w.top + 3, left: r.left - w.left, right: r.right - w.left };
  });
  sc = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--s")) || 1;
}

let idx = 0, dv = 1, phase = "walk", pt = 0, gait = 0;
let fx = 0, fy = 0, face = 1, x0 = 0, x1 = 0, dur = 2;
let cur = tents.map(T => ({ x: T.rest, y: 0 }));
let from = cur.map(p => ({ ...p }));
let ready = false;

function planWalk() {
  if (idx + dv < 0 || idx + dv >= lines.length) dv = -dv;
  const L = lines[idx], nx = lines[idx + dv] || L;
  let lo = Math.max(L.left, nx.left) + 12, hi = Math.min(L.right, nx.right) - 12;
  if (hi < lo) lo = hi = clamp((L.left + L.right) / 2, nx.left + 4, nx.right - 4);
  x0 = clamp(fx, lo, hi);
  x1 = (x0 - lo > hi - x0) ? lo : hi;
  if (Math.abs(x1 - x0) < 30) x1 = (x0 - lo < hi - x0) ? hi : lo;
  dur = Math.max(1.4, Math.abs(x1 - x0) / 38);
  face = Math.sign(x1 - x0) || face;
}
function setPhase(p) { phase = p; pt = 0; from = cur.map(q => ({ ...q })); }

function wantTips(t) {
  const L = lines[idx], nx = lines[idx + dv] || L;
  const out = [];
  for (let i = 0; i < N; i++) {
    const T = tents[i];
    const target = () => {
      const wx = clamp(fx + T.rest * 0.7 * sc, nx.left + 3, nx.right - 3);
      return { x: (wx - fx) / (sc * face), y: (nx.top - fy) / sc, wx };
    };
    if (phase === "walk") {
      const ph = (gait + (i % 2) * 0.5 + i * 0.04) % 1, S = 7;
      if (ph < 0.6) out.push({ x: T.rest + S - (ph / 0.6) * 2 * S, y: 0 });
      else { const q = (ph - 0.6) / 0.4; out.push({ x: T.rest - S + 2 * S * q, y: -Math.sin(q * Math.PI) * 7 }); }
    } else if (phase === "reach") {
      const g = target();
      const ri = ease(clamp((pt / REACH - i * 0.05) / 0.6, 0, 1));
      out.push({ x: lerp(T.rest, g.x, ri) + Math.sin(ri * Math.PI) * Math.sign(T.bx) * 5, y: lerp(0, g.y, ri) });
    } else { // pull: puntas ancladas al renglón de destino
      const wx = clamp(pullAnchor[i], nx.left + 3, nx.right - 3);
      out.push({ x: (wx - fx) / (sc * face), y: (nx.top - fy) / sc });
    }
  }
  return out;
}
const REACH = 1.2, PULL = 1.5;
let pullAnchor = [];

function draw(t) {
  const want = wantTips(t);
  const b = ease(clamp(pt / 0.25, 0, 1));
  for (let i = 0; i < N; i++) {
    const T = tents[i];
    const p = cur[i] = { x: lerp(from[i].x, want[i].x, b), y: lerp(from[i].y, want[i].y, b) };
    const by = -12, dx = p.x - T.bx, dy = p.y - by, d = Math.hypot(dx, dy);
    const slack = Math.max(0, 46 - d);
    const side = T.bx < 0 ? -1 : 1;
    const off = Math.min(12, slack * 0.35) * side + Math.sin(t / 300 + i) * 1.5;
    const cx = (T.bx + p.x) / 2 + off, cy = (by + p.y) / 2;
    T.el.setAttribute("d", `M${T.bx.toFixed(1)} ${by} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  const bob = phase === "walk" ? Math.sin(t / 130) * 0.9 : 0;
  const rot = Math.sin(t / 600) * 3 + (phase === "pull" ? 5 : 0);
  octoHead.setAttribute("transform", `translate(0 ${bob.toFixed(2)}) rotate(${rot.toFixed(2)} 0 -12)`);
  octoPos.setAttribute("transform", `translate(${fx.toFixed(1)} ${fy.toFixed(1)}) scale(${face * sc} ${sc})`);
}

let last = null;
function frame(t) {
  if (!ready) { requestAnimationFrame(frame); return; }
  const dt = last === null ? 0 : Math.min(0.05, (t - last) / 1000);
  last = t; pt += dt;
  const L = lines[idx], nx = lines[idx + dv] || L;
  if (phase === "walk") {
    const prev = fx;
    fx = lerp(x0, x1, ease(clamp(pt / dur, 0, 1)));
    gait += Math.abs(fx - prev) / (20 * sc) + dt * 0.12;
    fy = L.top;
    if (pt >= dur) {
      setPhase("reach");
      pullAnchor = tents.map(T => fx + T.rest * 0.7 * sc);
    }
  } else if (phase === "reach") {
    fy = L.top;
    if (pt >= REACH) setPhase("pull");
  } else {
    fy = lerp(L.top, nx.top, ease(clamp(pt / PULL, 0, 1)));
    if (pt >= PULL) { idx += dv; fy = lines[idx].top; setPhase("walk"); planWalk(); }
  }
  draw(t);
  requestAnimationFrame(frame);
}

function init() {
  measure();
  if (!lines.length) return;
  idx = Math.min(idx, lines.length - 1);
  if (!ready) { fx = (lines[0].left + lines[0].right) / 2; fy = lines[0].top; planWalk(); }
  ready = true;
  if (reduceMotion.matches) { phase = "walk"; fy = lines[idx].top; draw(0); }
}
if (window.ResizeObserver) new ResizeObserver(() => { measure(); }).observe(list);
window.addEventListener("resize", measure);
window.addEventListener("load", init);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
init();
if (!reduceMotion.matches) requestAnimationFrame(frame);
