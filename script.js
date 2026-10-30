// Edita este arreglo para añadir, quitar o modificar proyectos.
const projects = [
  { name: "Luz rubia", url: "https://metafobian-code.github.io/-Short/" },
  { name: "El significado de las cosas", url: "https://metafobian-code.github.io/signos/" },
  { name: "Nada sostiene", url: "https://metafobian-code.github.io/poema-ascii.html/" },
  { name: "Entropía", url: "https://metafobian-code.github.io/schho/" },
  { name: "Proyecto sin título (nombre provisional)", url: "https://metafobian-code.github.io/program6/" },
  { name: "Q0", url: "https://online.fliphtml5.com/vogqc/awym/?fbclid=IwY2xjawU_OsdleHRuA2FlbQIxMQBwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHm_Xq2fKe3KqErYhhmFPK7PDdmOm-2yhHWiw0hkSH03Td0bIOfsbwkJu7Jtf_aem_y8FjoofX5Eq40AQEidEFlg#p=12" },
  { name: "Verso del delirio", url: "https://online.fliphtml5.com/vogqc/yjdf/?fbclid=IwY2xjawU_PnRleHRuA2FlbQIxMQBwZG9mBXNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHk7SfZQQ8E31jZ3zesDBNvJ9hd9NjmWym-hPcyTyxsBbo6QusaQ5reK6dwUL_aem_3WCunQdTKhdWBy95731CkA#p=1" },
  { name: "Mi delirio tiene referencias", url: "https://metafobian-code.github.io/-xicos/" }
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

// Pulpo caminante: recorre la lista subiendo y bajando; cada tentáculo
// se agarra y avanza por turnos (marcha), tanto al bajar como al subir.
const octoBody = document.getElementById("octoBody");
const tentGroup = document.getElementById("tentacles");
const NS = "http://www.w3.org/2000/svg";
const N = 8;
const tents = [];
for (let i = 0; i < N; i++) {
  const p = document.createElementNS(NS, "path");
  tentGroup.appendChild(p);
  const u = i / (N - 1) - 0.5;                 // -0.5 .. 0.5
  tents.push({ el: p, bx: 60 + u * 56, side: u < 0 ? -1 : 1, u });
}
const CYCLE = 20000;       // ms por ida y vuelta
const STRIDE_PX = 70;      // distancia recorrida por ciclo de paso
let t0 = null, lastY = null, gait = 0, dir = 1, dirS = 1;

function drawTentacles(t, moving) {
  tents.forEach((T, i) => {
    const ph = (gait + i * 0.37) % 1;          // fase desfasada: se alternan
    let s, lift;
    if (ph < 0.6) { s = 1 - (ph / 0.6) * 2; lift = 0; }                // agarrado: se desliza hacia atrás
    else { const q = (ph - 0.6) / 0.4; s = -1 + q * 2; lift = Math.sin(q * Math.PI); } // se suelta y alcanza adelante
    const k = moving;                           // 0 en reposo, 1 en marcha
    const restX = T.bx + T.u * 26, restY = 146;
    const wave = Math.sin(t / 420 + i * 0.9);
    const tx = restX + T.side * lift * 14 * k + wave * 3 * (1 - k * 0.5);
    const ty = restY + dirS * s * 20 * k - lift * 10 * k + (1 - k) * wave * 3;
    const by = 74;
    const cx = (T.bx + tx) / 2 + T.side * (8 + 6 * wave) - dirS * s * 4 * k;
    const cy = (by + ty) / 2 + Math.cos(t / 500 + i) * 3;
    T.el.setAttribute("d", `M${T.bx.toFixed(1)} ${by} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`);
  });
}

function frame(t) {
  if (t0 === null) t0 = t;
  const items = list.children;
  if (items.length) {
    const first = items[0].offsetTop;
    const last = items[items.length - 1].offsetTop + items[items.length - 1].offsetHeight;
    const h = octopus.getBoundingClientRect().height;
    const range = Math.max(0, last - first - h * 0.55);
    const phase = ((t - t0) % CYCLE) / CYCLE;
    const k = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
    const y = first + k * range;
    const vy = lastY === null ? 0 : y - lastY;
    lastY = y;
    if (Math.abs(vy) > 0.02) dir = Math.sign(vy);
    dirS += (dir - dirS) * 0.08;
    const speed = Math.min(1, Math.abs(vy) / 1.2);
    gait += Math.abs(vy) / STRIDE_PX + 0.0015;
    const move = 0.15 + 0.85 * speed;           // sigue "respirando" al detenerse
    const wob = Math.sin(t / 900) * 5;
    const rot = Math.sin(t / 700) * 4 + dirS * speed * 5;
    octopus.style.transform = `translate(${wob}px, ${y}px)`;
    octoBody.setAttribute("transform", `rotate(${rot.toFixed(2)} 60 60)`);
    drawTentacles(t, move);
  }
  requestAnimationFrame(frame);
}
if (reduceMotion.matches) {
  octopus.style.transform = "translate(0,0)";
  drawTentacles(0, 0);
} else {
  requestAnimationFrame(frame);
}
