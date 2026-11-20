/* proyectos.js - Proyectos
   DOM: createElement, appendChild, prepend, insertBefore,
        remove y removeChild. */

const lista = document.getElementById("listaProy");
const total = document.getElementById("totalProy");
const vacio = document.getElementById("vacio");
const msg = document.getElementById("msgProy");

function actualizar() {
    const n = lista.querySelectorAll(".item-proyecto").length;
    total.textContent = n;
    vacio.classList.toggle("oculto", n > 0);
}

// Construye una tarjeta nueva con createElement
function crearTarjeta() {
    const nombre = document.getElementById("pNombre");
    if (!nombre.value.trim()) {
        msg.textContent = "⚠ Escribe el nombre del proyecto.";
        msg.style.color = "var(--rosa)";
        nombre.classList.add("campo-error");
        return null;
    }
    nombre.classList.remove("campo-error");

    const col = document.createElement("div");
    col.className = "col-md-6 col-xl-4 item-proyecto";

    const card = document.createElement("div");
    card.className = "glass proy-card proy-nuevo";

    const imagen = document.createElement("img");
    imagen.src = "img/proy-nuevo.svg";
    imagen.alt = nombre.value.trim();

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const tec = document.createElement("span");
    tec.className = "insignia-tec";
    tec.textContent = document.getElementById("pTec").value.trim() || "Web";

    const h3 = document.createElement("h3");
    h3.className = "card-title";
    h3.textContent = nombre.value.trim();

    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = document.getElementById("pDesc").value.trim() || "Proyecto sin descripción todavía.";

    const btn = document.createElement("button");
    btn.className = "btn btn-fantasma btn-sm btn-quitar";
    btn.textContent = "Quitar";

    cuerpo.append(tec, h3, p, btn);
    card.append(imagen, cuerpo);
    col.appendChild(card);

    document.getElementById("formProy").reset();
    msg.textContent = "✔ Proyecto agregado.";
    msg.style.color = "var(--acento-3)";
    return col;
}

// Al final: appendChild
document.getElementById("formProy").addEventListener("submit", (e) => {
    e.preventDefault();
    const t = crearTarjeta();
    if (t) { lista.appendChild(t); actualizar(); }
});

// Al inicio: prepend
document.getElementById("btnPrimero").addEventListener("click", () => {
    const t = crearTarjeta();
    if (t) { lista.prepend(t); actualizar(); }
});

// En medio: insertBefore (antes del 2.º hijo)
document.getElementById("btnEntre").addEventListener("click", () => {
    const t = crearTarjeta();
    if (!t) return;
    const segundo = lista.children[1] || null;
    lista.insertBefore(t, segundo);
    actualizar();
});

// Quitar el último: removeChild
document.getElementById("btnQuitarUltimo").addEventListener("click", () => {
    const ultimo = lista.lastElementChild;
    if (ultimo) {
        lista.removeChild(ultimo);
        msg.textContent = "Se quitó el último proyecto.";
        msg.style.color = "var(--suave)";
        actualizar();
    }
});

// Quitar uno concreto: remove()
lista.addEventListener("click", (e) => {
    const b = e.target.closest(".btn-quitar");
    if (!b) return;
    b.closest(".item-proyecto").remove();
    actualizar();
});
