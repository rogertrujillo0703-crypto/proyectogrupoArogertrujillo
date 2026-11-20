/* formacion.js - Formación académica
   DOM: consultar y modificar ATRIBUTOS
        getAttribute / setAttribute / hasAttribute / removeAttribute / dataset */

const img = document.getElementById("certImg");
const info = document.getElementById("infoAttr");

// Muestra en pantalla los atributos actuales de la imagen (consulta de atributos)
function mostrarAtributos() {
    info.innerHTML =
        "<b>src</b> = " + img.getAttribute("src") + "<br>" +
        "<b>alt</b> = " + img.getAttribute("alt") + "<br>" +
        "<b>title</b> = " + (img.hasAttribute("title") ? img.getAttribute("title") : "(no existe)") + "<br>" +
        "<b>data-curso</b> = " + img.getAttribute("data-curso") + "<br>" +
        "<b>data-anio</b> = " + img.dataset.anio + "<br>" +
        "<b>data-zoom</b> = " + (img.hasAttribute("data-zoom") ? "activo" : "(no existe)");
}
mostrarAtributos();

// Cambiar de certificado: setAttribute
document.querySelectorAll(".miniatura").forEach((mini) => {
    mini.addEventListener("click", () => {
        document.querySelectorAll(".miniatura").forEach((m) => m.classList.remove("activa"));
        mini.classList.add("activa");

        img.classList.add("cambiando");
        setTimeout(() => {
            const curso = mini.getAttribute("data-curso");
            img.setAttribute("src", mini.getAttribute("data-src"));
            img.setAttribute("alt", "Certificado de " + curso);
            img.setAttribute("title", curso);
            img.setAttribute("data-curso", curso);
            img.setAttribute("data-anio", mini.getAttribute("data-anio"));
            img.classList.remove("cambiando");
            mostrarAtributos();
        }, 250);
    });
});

// Ampliar: si tiene el atributo data-zoom lo quita, si no lo tiene lo agrega
document.getElementById("btnZoom").addEventListener("click", () => {
    if (img.hasAttribute("data-zoom")) {
        img.removeAttribute("data-zoom");
        img.style.removeProperty("transform");
    } else {
        img.setAttribute("data-zoom", "si");
        img.style.transform = "scale(1.08)";
    }
    mostrarAtributos();
});

// Quitar el atributo title
document.getElementById("btnQuitarTitle").addEventListener("click", () => {
    img.removeAttribute("title");
    mostrarAtributos();
});

// Restaurar valores
document.getElementById("btnRestaurar").addEventListener("click", () => {
    const activa = document.querySelector(".miniatura.activa");
    img.setAttribute("title", activa.getAttribute("data-curso"));
    img.removeAttribute("data-zoom");
    img.style.removeProperty("transform");
    mostrarAtributos();
});
