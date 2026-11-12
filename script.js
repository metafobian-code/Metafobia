// Edita este arreglo para añadir, quitar o modificar proyectos.
const projects = [
  { name: "Horizonte", url: "https://metafobian-code.github.io/horizontes/" },
  { name: "Luz rubia", url: "https://metafobian-code.github.io/-Short/" },
  { name: "El significado de las cosas", url: "https://metafobian-code.github.io/signos/" },
  { name: "Nada sostiene", url: "https://metafobian-code.github.io/poema-ascii.html/" },
  { name: "Entropía", url: "https://metafobian-code.github.io/schho/" },
  { name: "Canek, Markov, Tracery y compañía", url: "https://consola.canekzapata.net/de/metafora-404" },
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
  { name: "RGB", url: "https://metafobian-code.github.io/rgb/" },
  { name: "无为", url: "https://metafobian-code.github.io/chong/" },
  { name: "Tenemos un problema", url: "https://metafobian-code.github.io/problemas/" },
  { name: "Altazor 2.0", url: "https://metafobian-code.github.io/altazor2.0/" },
  { name: "[Π.Π]", url: "https://metafobian-code.github.io/Script/" },
  { name: "PROMPT: Jardín", url:"https://metafobian-code.github.io/-jardin/"},
  { name: "Bloc_notas", url:"https://metafobian-code.github.io/rr/"},
  { name: "Glitch", url:"https://metafobian-code.github.io/Glitch/"}

];

// Secciones: aparecen como un enlace bajo el título (arriba, al centro de la página).
// Al entrar, muestran su propia lista de enlaces. La última línea de cada arreglo NO lleva coma.
const sections = [
  {
    name: "Ilustraciones, IA y absurdos",
    children: [
      { name: "Ilustración", url: "https://metafobian-code.github.io/Ilustracion/" },
      { name: "Sur", url: "https://metafobian-code.github.io/Sur/" },
      { name: "Ilustración 18", url: "https://metafobian-code.github.io/Nio/" },
      { name: "Antiprisma", url: "https://metafobian-code.github.io/antiprisma/" },
      { name: "Varios", url: "https://metafobian-code.github.io/Varios/" },
      { name: "Varios II", url: "https://metafobian-code.github.io/mas/" },
      { name: "GIFs", url: "https://metafobian-code.github.io/Gifs/" },
      { name: "Colaboración audiovisual", url: "https://vt.tiktok.com/ZSpJyAWkr" },
      { name: "Angel", url: "https://metafobian-code.github.io/Cursor/" },
      { name: "Neón Ne", url: "https://metafobian-code.github.io/infiernol/aureola-infiernol.html" },
      { name: "Ansible: la ilusión de cercanía", url: "https://metafobian-code.github.io/-ansibles/ansible-animacion-v5.html" },
      { name: "Texto animado (editable)", url: "https://metafobian-code.github.io/-editable/" }
    ]
  }
];
const FADE_MS = 700;
const list = document.getElementById("projectList");
const wrap = document.getElementById("listWrap");
const cat = document.getElementById("cat");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------- Listado, secciones y navegación ----------
const slug = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function makeItem(name, href, sectionId, n) {
  const li = document.createElement("li");
  li.className = "item";
  if (n) {
    const num = document.createElement("span");
    num.className = "num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(n).padStart(2, "0");
    li.appendChild(num);
  }
  const a = document.createElement("a");
  a.className = "link";
  a.textContent = name;
  a.href = href;
  if (sectionId !== undefined) a.dataset.section = sectionId;
  li.appendChild(a);
  return li;
}

// Enlaces de sección, bajo el título
const gates = document.createElement("div");
gates.className = "gates";
document.querySelector(".head").appendChild(gates);
sections.forEach(sec => {
  const a = document.createElement("a");
  a.className = "link gate";
  a.textContent = sec.name;
  a.href = "#" + slug(sec.name);
  a.dataset.section = slug(sec.name);
  gates.appendChild(a);
});

function render(items, title) {
  list.replaceChildren();
  if (title) {
    const li = document.createElement("li");
    const h = document.createElement("p");
    h.className = "subtitle";
    h.textContent = title;
    li.appendChild(h);
    list.appendChild(li);
    list.appendChild(makeItem("← volver", "#", ""));
  }
  items.forEach((p, i) => list.appendChild(makeItem(p.name, p.url, undefined, i + 1)));
  observeReveal();
}

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  const sec = sections.find(x => slug(x.name) === id);
  gates.querySelectorAll(".leaving").forEach(a => a.classList.remove("leaving"));
  gates.hidden = !!sec;
  if (sec) render(sec.children, sec.name); else render(projects);
  if (!reduceMotion.matches && list.animate) list.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: "ease" });
  window.scrollTo(0, 0);
  resetCat();
}
window.addEventListener("hashchange", route);

function goTo(id) {
  if (id) location.hash = id;
  else { history.pushState(null, "", location.pathname + location.search); route(); }
}

// Clic: desenfoque + desvanecimiento, luego navegar (enlace externo o sección)
function handleClick(e) {
  const a = e.target.closest("a.link");
  if (!a) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  if (a.classList.contains("leaving")) return;
  a.classList.add("leaving");
  if (!reduceMotion.matches) dissolve(a);
  const wait = reduceMotion.matches ? 0 : FADE_MS;
  if ("section" in a.dataset) {
    const id = a.dataset.section;
    setTimeout(() => goTo(id), wait);
  } else {
    const url = a.href;
    setTimeout(() => { window.location.href = url; }, wait);
  }
}
list.addEventListener("click", handleClick);
gates.addEventListener("click", handleClick);
// Si el usuario vuelve con "atrás", restaurar los enlaces
window.addEventListener("pageshow", () => {
  document.querySelectorAll(".leaving").forEach(a => a.classList.remove("leaving"));
  fxParts.length = 0;
});

// ---------- Efecto glitch al pasar el ratón ----------
// Las letras se mezclan con signos al azar y vuelven a ordenarse.
const GLYPHS = "░▒▓█<>/\\|_-=+*#%&$@01{}[]";
function scramble(a) {
  if (reduceMotion.matches || a.dataset.busy) return;
  const text = a.dataset.text || (a.dataset.text = a.textContent);
  a.dataset.busy = "1";
  a.setAttribute("aria-label", text);
  a.style.minWidth = a.getBoundingClientRect().width + "px";
  const start = performance.now(), D = 420;
  function tick(now) {
    const k = (now - start) / D;
    if (k >= 1) {
      a.textContent = text; a.style.minWidth = ""; delete a.dataset.busy;
      return;
    }
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " " || i / text.length < k * 1.15 - 0.1) out += ch;
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    a.textContent = out;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.addEventListener("mouseover", e => {
  const a = e.target.closest && e.target.closest("a.link");
  if (a && !a.contains(e.relatedTarget)) scramble(a);
});
document.addEventListener("focusin", e => {
  if (e.target.matches && e.target.matches("a.link")) scramble(e.target);
});

// ---------- Disolver en píxeles al hacer clic ----------
// Se dibuja el título en un lienzo oculto y cada píxel encendido
// se convierte en una partícula que se lleva el viento.
const fxCanvas = document.createElement("canvas");
fxCanvas.className = "fx";
fxCanvas.setAttribute("aria-hidden", "true");
document.body.appendChild(fxCanvas);
const fctx = fxCanvas.getContext("2d");
const fxParts = [];
let fxRunning = false, fxLast = 0;
function sizeFx() {
  const d = Math.min(2, window.devicePixelRatio || 1);
  fxCanvas.width = innerWidth * d; fxCanvas.height = innerHeight * d;
  fxCanvas.style.width = innerWidth + "px"; fxCanvas.style.height = innerHeight + "px";
  fctx.setTransform(d, 0, 0, d, 0, 0);
}
sizeFx();
window.addEventListener("resize", sizeFx);

function dissolve(a) {
  const r = a.getBoundingClientRect();
  const cs = getComputedStyle(a);
  const w = Math.ceil(r.width) + 4, h = Math.ceil(r.height) + 4;
  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const o = off.getContext("2d");
  o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  if ("letterSpacing" in o) o.letterSpacing = cs.letterSpacing;
  o.textBaseline = "middle";
  o.fillStyle = "#fff";
  o.fillText(a.dataset.text || a.textContent, 0, h / 2);
  const data = o.getImageData(0, 0, w, h).data;
  const STEP = 2;
  for (let y = 0; y < h; y += STEP) {
    for (let x = 0; x < w; x += STEP) {
      if (data[(y * w + x) * 4 + 3] > 120) {
        const delay = (x / w) * 0.35 + Math.random() * 0.12; // de izquierda a derecha
        fxParts.push({
          x: r.left + x, y: r.top + y - 2, vx: 30 + Math.random() * 70, vy: -20 - Math.random() * 40,
          s: Math.random() < 0.8 ? 2 : 3, age: -delay, life: 0.5 + Math.random() * 0.4
        });
      }
    }
  }
  if (!fxRunning) { fxRunning = true; fxLast = performance.now(); requestAnimationFrame(fxFrame); }
}
function fxFrame(now) {
  const dt = Math.min(0.05, (now - fxLast) / 1000); fxLast = now;
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = fxParts.length - 1; i >= 0; i--) {
    const p = fxParts[i];
    p.age += dt;
    if (p.age >= p.life) { fxParts.splice(i, 1); continue; }
    let x = p.x, y = p.y, k = 1;
    if (p.age > 0) {
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= 10 * dt;
      x = p.x + Math.sin(p.age * 18 + p.y) * 1.5; y = p.y;
      k = 1 - p.age / p.life;
    }
    fctx.fillStyle = `rgba(255,255,255,${(k * 0.95).toFixed(3)})`;
    fctx.fillRect(Math.round(x / p.s) * p.s, Math.round(y / p.s) * p.s, p.s, p.s);
  }
  if (fxParts.length) requestAnimationFrame(fxFrame);
  else { fxRunning = false; fctx.clearRect(0, 0, innerWidth, innerHeight); }
}

// ---------- Aparición escalonada al desplazarse ----------
let revealIO = null;
function observeReveal() {
  const items = [...list.children];
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach(li => li.classList.add("in")); return;
  }
  if (revealIO) revealIO.disconnect();
  revealIO = new IntersectionObserver(entries => {
    let n = 0;
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.style.transitionDelay = (n++ * 70) + "ms";
      en.target.classList.add("in");
      revealIO.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(li => { li.classList.add("reveal"); revealIO.observe(li); });
}

// ---------- Gato ----------
// Camina sobre la parte superior de cada título, a veces se sienta,
// y salta al siguiente renglón dejando una estela de polvo de píxeles.
const catPos = document.getElementById("catPos");
const catBody = document.getElementById("catBody");
const catHead = document.getElementById("catHead");
const tail = document.getElementById("tail");
const legs = [...document.querySelectorAll("#legs line")];
const dust = document.getElementById("dust");
const dctx = dust.getContext("2d");
const PAD = 40; // margen del lienzo alrededor de la lista

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = x => x * x * (3 - 2 * x);
const lerp = (a, b, k) => a + (b - a) * k;
const rnd = (a, b) => a + Math.random() * (b - a);

let lines = [], sc = 1, dpr = 1;
function measure() {
  const w = wrap.getBoundingClientRect();
  lines = [...list.querySelectorAll(".link")].map(a => {
    const r = a.getBoundingClientRect();
    return { top: r.top - w.top + 1, left: r.left - w.left, right: r.right - w.left };
  });
  sc = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--s")) || 1;
  if (idx >= lines.length) idx = Math.max(0, lines.length - 1);
  dpr = Math.min(2, window.devicePixelRatio || 1);
  const cw = Math.ceil(w.width + PAD * 2), ch = Math.ceil(w.height + PAD * 2);
  if (dust.width !== cw * dpr || dust.height !== ch * dpr) {
    dust.width = cw * dpr; dust.height = ch * dpr;
    dust.style.width = cw + "px"; dust.style.height = ch + "px";
  }
}

// Estados: walk → (sit) → crouch → jump → land → walk
let idx = 0, dv = 1, phase = "walk", pt = 0, gait = 0;
let fx = 0, fy = 0, face = 1, x0 = 0, x1 = 0, dur = 2, sitFor = 0;
let jx0 = 0, jy0 = 0, jx1 = 0, jy1 = 0, jdur = 0.7, jh = 18;
let ready = false, dustAcc = 0;
const CROUCH = 0.24, LAND = 0.2;

function planWalk() {
  if (idx + dv < 0 || idx + dv >= lines.length) dv = -dv;
  const L = lines[idx], nx = lines[idx + dv] || L;
  let lo = Math.max(L.left, nx.left) + 16, hi = Math.min(L.right, nx.right) - 16;
  if (hi < lo) lo = hi = clamp((L.left + L.right) / 2, nx.left + 6, nx.right - 6);
  x0 = clamp(fx, Math.min(lo, L.right - 10), Math.max(hi, L.left + 10));
  x1 = (x0 - lo > hi - x0) ? lo : hi;
  if (Math.abs(x1 - x0) < 30) x1 = (x0 - lo < hi - x0) ? hi : lo;
  dur = Math.max(1.2, Math.abs(x1 - x0) / 42);
  face = Math.sign(x1 - x0) || face;
}
function planJump() {
  const L = lines[idx], nx = lines[idx + dv];
  jx0 = fx; jy0 = L.top;
  jx1 = clamp(fx + face * 22 * sc, nx.left + 10, nx.right - 10);
  jy1 = nx.top;
  const gap = Math.abs(jy1 - jy0);
  jdur = 0.5 + gap / 260;
  jh = (jy1 > jy0 ? 14 : 22 + gap * 0.25) * sc;
}

// ---- Polvo de píxeles ----
const parts = [];
const COLORS = ["255,255,255", "255,255,255", "255,255,255", "190,235,255", "255,200,230"];
function emit(x, y, n, spread, life, up) {
  for (let i = 0; i < n && parts.length < 900; i++) {
    parts.push({
      x: x + rnd(-spread, spread), y: y + rnd(-spread * 0.6, spread * 0.6),
      vx: rnd(-12, 12) - face * rnd(0, 14), vy: rnd(-up, up * 0.4),
      s: Math.random() < 0.7 ? 2 : 3, life: rnd(life * 0.6, life), age: 0,
      c: COLORS[(Math.random() * COLORS.length) | 0]
    });
  }
}
function stepDust(dt) {
  dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  dctx.clearRect(0, 0, dust.width, dust.height);
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.age += dt;
    if (p.age >= p.life) { parts.splice(i, 1); continue; }
    p.vy += 14 * dt; p.vx *= 0.985;
    p.x += p.vx * dt; p.y += p.vy * dt;
    const k = 1 - p.age / p.life;
    // cuantizado a la rejilla del píxel: aspecto de polvo digital
    const gx = Math.round((p.x + PAD) / p.s) * p.s, gy = Math.round((p.y + PAD) / p.s) * p.s;
    dctx.fillStyle = `rgba(${p.c},${(k * k * 0.9).toFixed(3)})`;
    dctx.fillRect(gx, gy, p.s, p.s);
  }
}

// ---- Dibujo del gato (coordenadas locales: patas en y=0, mira a la derecha) ----
function draw(t) {
  let squash = 1, lift = 0, legMode = "walk";
  if (phase === "sit") legMode = "sit";
  if (phase === "crouch") { squash = 1 - 0.22 * ease(clamp(pt / CROUCH, 0, 1)); legMode = "sit"; }
  if (phase === "jump") legMode = "jump";
  if (phase === "land") { squash = 1 - 0.18 * Math.sin(clamp(pt / LAND, 0, 1) * Math.PI); }

  // patas: [cadera x, desfase de paso]
  const L4 = [[7, 0], [5, 0.5], [-6, 0.5], [-8, 0]];
  L4.forEach(([hx, off], i) => {
    let px = hx, py = 0;
    if (legMode === "walk") {
      const ph = (gait + off) % 1;
      px = hx + Math.sin(ph * Math.PI * 2) * 3.2;
      py = -Math.max(0, Math.cos(ph * Math.PI * 2)) * 2.4;
    } else if (legMode === "sit") {
      px = hx + (hx < 0 ? 3 : 0); py = 0;
    } else { // salto: delanteras estiradas, traseras atrás
      px = hx + (hx > 0 ? 5 : -5); py = -2;
    }
    const l = legs[i];
    l.setAttribute("x1", hx); l.setAttribute("y1", (-7 * squash).toFixed(1));
    l.setAttribute("x2", px.toFixed(1)); l.setAttribute("y2", py.toFixed(1));
  });

  // cola: ondula; erguida cuando se sienta
  const sway = Math.sin(t / (phase === "sit" ? 520 : 260)) * (phase === "sit" ? 4 : 2.5);
  const tipY = phase === "jump" ? -14 : phase === "sit" ? -26 : -23;
  const tipX = phase === "jump" ? -24 : -17 + sway;
  tail.setAttribute("d", `M-10 -11 Q${(-20 + sway * 0.5).toFixed(1)} -13 ${tipX.toFixed(1)} ${tipY.toFixed(1)}`);

  const bob = phase === "walk" ? Math.abs(Math.sin(gait * Math.PI * 2)) * -0.8 : 0;
  const tiltJ = phase === "jump" ? (jy1 > jy0 ? 1 : -1) * Math.cos(clamp(pt / jdur, 0, 1) * Math.PI) * -14 : 0;
  catBody.setAttribute("transform", `translate(0 ${(bob - lift).toFixed(2)}) rotate(${tiltJ.toFixed(1)} 0 -8) scale(1 ${squash.toFixed(3)})`);
  const look = phase === "sit" ? Math.sin(t / 900) * 8 : 0;
  catHead.setAttribute("transform", `rotate(${look.toFixed(1)} 12 -15)`);
  catPos.setAttribute("transform", `translate(${fx.toFixed(1)} ${fy.toFixed(1)}) scale(${face * sc} ${sc})`);
}

let last = null;
function frame(t) {
  if (!ready) { last = null; requestAnimationFrame(frame); return; }
  const dt = last === null ? 0 : Math.min(0.05, (t - last) / 1000);
  last = t; pt += dt;
  const L = lines[idx];

  if (phase === "walk") {
    const prev = fx;
    fx = lerp(x0, x1, ease(clamp(pt / dur, 0, 1)));
    gait += Math.abs(fx - prev) / (16 * sc);
    fy = L.top;
    dustAcc += dt;
    if (dustAcc > 0.14 && Math.abs(fx - prev) > 0.05) { dustAcc = 0; emit(fx - face * 8 * sc, fy - 1, 1, 2, 0.7, 6); }
    if (pt >= dur) {
      if (Math.random() < 0.35) { phase = "sit"; sitFor = rnd(0.9, 2.2); }
      else phase = "crouch";
      pt = 0;
    }
  } else if (phase === "sit") {
    fy = L.top;
    if (pt >= sitFor) { phase = "crouch"; pt = 0; }
  } else if (phase === "crouch") {
    fy = L.top;
    if (pt >= CROUCH) { planJump(); phase = "jump"; pt = 0; emit(fx, fy - 2, 8, 6, 0.9, 18); }
  } else if (phase === "jump") {
    const q = clamp(pt / jdur, 0, 1);
    fx = lerp(jx0, jx1, q);
    fy = lerp(jy0, jy1, q) - Math.sin(q * Math.PI) * jh;
    // estela: más densa al bajar
    const n = jy1 > jy0 ? 5 : 2;
    emit(fx - face * 6 * sc, fy - 9 * sc, n, 5 * sc, jy1 > jy0 ? 2.2 : 1.3, 10);
    if (q >= 1) {
      idx += dv; fy = lines[idx].top; phase = "land"; pt = 0;
      emit(fx, fy - 1, 14, 9, 1.1, 22);
    }
  } else { // land
    fy = L.top;
    if (pt >= LAND) { phase = "walk"; pt = 0; planWalk(); }
  }
  draw(t);
  stepDust(dt);
  requestAnimationFrame(frame);
}

function resetCat() {
  ready = false;
  measure();
  if (!lines.length) return;
  idx = 0; dv = 1; phase = "walk"; pt = 0; gait = 0; last = null;
  parts.length = 0;
  fx = (lines[0].left + lines[0].right) / 2;
  fy = lines[0].top;
  planWalk();
  if (reduceMotion.matches) { phase = "sit"; draw(0); stepDust(0); return; }
  ready = true;
}
if (window.ResizeObserver) new ResizeObserver(() => { measure(); }).observe(list);
window.addEventListener("resize", measure);
window.addEventListener("load", measure);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

route();
if (!reduceMotion.matches) requestAnimationFrame(frame);
