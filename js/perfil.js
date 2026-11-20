/* perfil.js - Perfil profesional
   DOM: agregar/quitar/alternar clases, estilos CSS, atributos data-*,
        crear elementos (paleta de colores). */

// ---- Leer más / menos: classList.toggle ----
const btnLeer = document.getElementById("btnLeer");
const bioExtra = document.getElementById("bioExtra");
btnLeer.addEventListener("click", () => {
    const oculto = bioExtra.classList.toggle("oculto");
    btnLeer.textContent = oculto ? "Leer más" : "Leer menos";
});

// ---- Tamaño de letra: modifica el estilo CSS (style.fontSize) ----
document.getElementById("rangoLetra").addEventListener("input", (e) => {
    document.getElementById("bio").style.fontSize = e.target.value + "px";
    bioExtra.style.fontSize = e.target.value + "px";
});

// ---- Paleta: se CREAN los botones de color con createElement ----
const paleta = document.getElementById("paleta");
Object.entries(ACENTOS).forEach(([nombre, hex]) => {
    const b = document.createElement("button");
    b.className = "btn btn-fantasma btn-sm";
    b.textContent = nombre;
    b.style.borderColor = hex;
    b.style.color = hex;
    b.setAttribute("data-color", hex);
    b.addEventListener("click", () => {
        aplicarAcento(hex);
        paleta.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        b.style.background = hex + "22";
        paleta.querySelectorAll("button:not(.active)").forEach((x) => (x.style.background = ""));
    });
    paleta.appendChild(b);
});

// ---- Barras de habilidades: leen data-nivel (dataset) y cambian style.width ----
function animarBarras() {
    document.querySelectorAll("#habilidades .progress-bar").forEach((barra) => {
        const nivel = barra.dataset.nivel;                      // atributo data-nivel
        const etiqueta = barra.parentElement.previousElementSibling.querySelector(".valor");
        barra.style.width = "0%";
        etiqueta.textContent = "0%";
        setTimeout(() => {
            barra.style.width = nivel + "%";
            etiqueta.textContent = nivel + "%";
        }, 80);
    });
}
document.getElementById("btnAnimar").addEventListener("click", animarBarras);
// Se anima la primera vez cuando la sección se ve en pantalla
new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting) { animarBarras(); o.disconnect(); }
}, { threshold: 0.3 }).observe(document.getElementById("habilidades"));

// ---- Atributos: getAttribute / setAttribute / hasAttribute / removeAttribute ----
const bio = document.getElementById("bio");
bio.setAttribute("data-revisado", "si");
bio.setAttribute("title", "Texto editable desde JavaScript");
document.getElementById("estadoAttr").textContent =
    "data-revisado = " + bio.getAttribute("data-revisado") +
    " · ¿tiene title? " + (bio.hasAttribute("title") ? "sí" : "no");

// ---- Crear un elemento nuevo en la lista de fortalezas al abrir el acordeón ----
document.getElementById("c2").addEventListener("shown.bs.collapse", () => {
    const ul = document.getElementById("listaFortalezas");
    if (!ul.querySelector(".nueva")) {
        const li = document.createElement("li");
        li.className = "nueva";
        li.textContent = "Creatividad para resolver problemas";
        ul.appendChild(li);
    }
});
