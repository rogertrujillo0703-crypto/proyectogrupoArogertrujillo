/* =========================================================
   comun.js  -  se carga en las 6 páginas
   DOM usado aquí: createElement, appendChild, classList,
   style.setProperty, querySelector(All), addEventListener
   ========================================================= */

// 1) Fondo aurora: se CREA con JS y se inserta en el body
(function crearFondo() {
    const aurora = document.createElement("div");
    aurora.className = "aurora";
    aurora.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 3; i++) aurora.appendChild(document.createElement("span"));
    document.body.prepend(aurora);
})();

// 2) Brillo de las tarjetas "glass" siguiendo el mouse (modifica variables CSS)
document.addEventListener("mousemove", (e) => {
    const tarjeta = e.target.closest ? e.target.closest(".glass") : null;
    if (!tarjeta) return;
    const r = tarjeta.getBoundingClientRect();
    tarjeta.style.setProperty("--mx", e.clientX - r.left + "px");
    tarjeta.style.setProperty("--my", e.clientY - r.top + "px");
});

// 3) Aparición al hacer scroll (agrega la clase "visible")
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
        if (en.isIntersecting) {
            en.target.classList.add("visible");
            observador.unobserve(en.target);
        }
    });
}, { threshold: 0.12 });
function observarReveal(contenedor = document) {
    contenedor.querySelectorAll(".reveal:not(.visible)").forEach((el) => observador.observe(el));
}
observarReveal();

// 4) Marca el enlace activo del menú según la página actual
(function marcarMenu() {
    const actual = (location.pathname.split("/").pop() || "index").replace(".html", "");
    document.querySelectorAll(".navbar .nav-link").forEach((a) => {
        const activo = a.getAttribute("href").replace(".html", "") === actual;
        a.classList.toggle("active", activo);
        if (activo) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
    });
})();

// 5) Color de acento guardado (localStorage) - se aplica en todas las páginas
const ACENTOS = { violeta: "#7c5cff", cian: "#22d3ee", lima: "#b6ff5c", rosa: "#ff6b9d", naranja: "#ff9f43" };
function aplicarAcento(hex) {
    document.documentElement.style.setProperty("--acento", hex);
    try { localStorage.setItem("acento", hex); } catch (e) { /* sin almacenamiento */ }
}
(function cargarAcento() {
    try {
        const g = localStorage.getItem("acento");
        if (g) document.documentElement.style.setProperty("--acento", g);
    } catch (e) { /* nada */ }
})();

// 6) Año del pie de página
document.querySelectorAll(".anio").forEach((el) => (el.textContent = new Date().getFullYear()));
