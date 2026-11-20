/* experiencia.js - Experiencia laboral
   DOM: classList (add/remove/toggle/contains), crear elementos (createElement),
        insertar (prepend / appendChild), eliminar (remove). */

const linea = document.getElementById("lineaTiempo");
const total = document.getElementById("totalExp");

function contar() {
    total.textContent = linea.querySelectorAll(".exp-item:not(.oculto)").length;
}

// ---- Abrir/cerrar detalle: delegación de eventos ----
linea.addEventListener("click", (e) => {
    const btnBorrar = e.target.closest(".btn-borrar");
    if (btnBorrar) {                                   // ELIMINAR elemento
        const item = btnBorrar.closest(".exp-item");
        item.style.opacity = "0";
        item.style.transform = "translateX(40px)";
        setTimeout(() => { item.remove(); contar(); }, 300);
        return;
    }
    const item = e.target.closest(".exp-item");
    if (item) item.classList.toggle("abierta");
});

// ---- Filtros: add / remove de clases ----
document.getElementById("filtros").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll("#filtros .chip").forEach((c) => c.classList.remove("activo"));
    chip.classList.add("activo");
    const filtro = chip.dataset.filtro;
    linea.querySelectorAll(".exp-item").forEach((it) => {
        const mostrar = filtro === "todos" || it.dataset.tipo === filtro;
        it.classList.toggle("oculto", !mostrar);
    });
    contar();
});

// ---- Crear un elemento nuevo ----
function crearExperiencia() {
    const titulo = document.getElementById("expTitulo");
    const lugar = document.getElementById("expLugar");
    const msg = document.getElementById("msgExp");
    if (!titulo.value.trim() || !lugar.value.trim()) {
        msg.textContent = "⚠ El cargo y el lugar son obligatorios.";
        msg.style.color = "var(--rosa)";
        titulo.classList.toggle("campo-error", !titulo.value.trim());
        lugar.classList.toggle("campo-error", !lugar.value.trim());
        return null;
    }
    titulo.classList.remove("campo-error");
    lugar.classList.remove("campo-error");

    const art = document.createElement("article");              // createElement
    art.className = "exp-item glass p-4 proy-nuevo";
    art.dataset.tipo = document.getElementById("expTipo").value;

    const fila = document.createElement("div");
    fila.className = "d-flex justify-content-between gap-3";
    const izq = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.className = "h5 mb-1";
    h3.textContent = titulo.value.trim();
    const sub = document.createElement("div");
    sub.className = "text-suave small";
    sub.textContent = lugar.value.trim() + " · " + (document.getElementById("expFecha").value.trim() || "2026");
    izq.append(h3, sub);
    const fl = document.createElement("span");
    fl.className = "flecha text-suave";
    fl.textContent = "▼";
    fila.append(izq, fl);

    const det = document.createElement("div");
    det.className = "detalle";
    const p = document.createElement("p");
    p.className = "mb-2 text-suave";
    p.textContent = document.getElementById("expDetalle").value.trim() || "Sin descripción.";
    const bb = document.createElement("button");
    bb.className = "btn btn-fantasma btn-sm btn-borrar";
    bb.textContent = "Eliminar";
    det.append(p, bb);

    art.append(fila, det);
    document.getElementById("formExp").reset();
    msg.textContent = "✔ Experiencia agregada.";
    msg.style.color = "var(--acento-3)";
    return art;
}

document.getElementById("formExp").addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevo = crearExperiencia();
    if (nuevo) { linea.prepend(nuevo); contar(); }         // INSERTAR al inicio
});
document.getElementById("btnAlFinal").addEventListener("click", () => {
    const nuevo = crearExperiencia();
    if (nuevo) { linea.appendChild(nuevo); contar(); }     // INSERTAR al final
});

// ---- Cursos electivos: al abrir el modal se cambian src, alt y el título ----
document.getElementById("modalCert").addEventListener("show.bs.modal", (e) => {
    const b = e.relatedTarget;
    const im = document.getElementById("modalImg");
    im.setAttribute("src", b.getAttribute("data-src"));
    im.setAttribute("alt", "Certificado: " + b.dataset.titulo);
    document.getElementById("modalTitulo").textContent = b.dataset.titulo;
});
