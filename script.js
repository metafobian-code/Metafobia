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

// Pulpo: recorre la lista de arriba abajo y vuelve, en bucle (solo transform)
let start = null;
const CYCLE = 18000; // ms por ida y vuelta
function frame(t) {
  if (start === null) start = t;
  const items = list.children;
  if (items.length) {
    const first = items[0].offsetTop;
    const last = items[items.length - 1].offsetTop + items[items.length - 1].offsetHeight;
    const range = Math.max(0, last - first - octopus.getBoundingClientRect().height * 0.6);
    const phase = ((t - start) % CYCLE) / CYCLE;
    const k = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2); // 0→1→0 suave
    const wobble = Math.sin(t / 900) * 6;                 // deriva orgánica
    octopus.style.transform = `translate(${wobble}px, ${first + k * range}px)`;
  }
  if (!reduceMotion.matches) requestAnimationFrame(frame);
}
function placeStatic() {
  octopus.style.transform = `translate(0, ${list.firstElementChild ? list.firstElementChild.offsetTop : 0}px)`;
}
if (reduceMotion.matches) placeStatic(); else requestAnimationFrame(frame);
reduceMotion.addEventListener?.("change", () => {
  if (reduceMotion.matches) placeStatic(); else { start = null; requestAnimationFrame(frame); }
});
