/* index.js - Datos personales
   DOM: cambiar contenido (textContent / innerHTML), cambiar estilos CSS,
        y las 3 formas de escuchar eventos. */

const panel = document.getElementById("panelContacto");

const CONTACTOS = {
    correo:    { via: "Correo electrónico", dato: "roger.trujillo@ejemplo.com" },
    telefono:  { via: "Teléfono / WhatsApp", dato: "+591 7000 0000" },
    ubicacion: { via: "Ubicación", dato: "Santa Cruz de la Sierra, Bolivia" }
};

// Cambia el CONTENIDO del panel con innerHTML
function mostrarContacto(tipo) {
    const c = CONTACTOS[tipo];
    panel.innerHTML = `<div class="via">${c.via}</div><div class="fs-5 fw-semibold">${c.dato}</div>`;
    panel.classList.remove("pulso");
    void panel.offsetWidth;            // reinicia la animación
    panel.classList.add("pulso");
}

// FORMA 1: onclick escrito en el HTML  ->  <button onclick="mostrarContacto('correo')">

// FORMA 2: propiedad .onclick
document.getElementById("btnTelefono").onclick = function () {
    mostrarContacto("telefono");
};

// FORMA 3: addEventListener
document.getElementById("btnUbicacion").addEventListener("click", function () {
    mostrarContacto("ubicacion");
});

// Botón limpiar: textContent
document.getElementById("btnLimpiar").addEventListener("click", () => {
    panel.innerHTML = '<div class="via">Elige una opción</div><div class="fs-5 fw-semibold">Pulsa uno de los botones de arriba para ver cómo contactarme.</div>';
});

// Cambiar saludo: modifica textContent y estilos CSS
const saludos = ["Hola, soy", "Bienvenido, soy", "¡Qué gusto verte! Soy", "Hey, soy"];
let iSaludo = 0;
document.getElementById("btnSaludo").addEventListener("click", () => {
    iSaludo = (iSaludo + 1) % saludos.length;
    const etq = document.querySelector(".etiqueta");
    etq.textContent = saludos[iSaludo];
    etq.style.color = ["#b6ff5c", "#22d3ee", "#ff6b9d", "#ff9f43"][iSaludo];
    etq.style.letterSpacing = "0.3em";
    setTimeout(() => etq.style.removeProperty("letter-spacing"), 600);
});

// Efecto máquina de escribir: cambia el textContent del rol cada cierto tiempo
const roles = ["Estudiante de Ingeniería de Sistemas", "Desarrollador web en formación", "Creador de interfaces", "Apasionado por la tecnología"];
const rolEl = document.getElementById("rol");
let r = 0, c = 0, borrando = false;
function escribir() {
    const frase = roles[r];
    c += borrando ? -1 : 1;
    rolEl.textContent = frase.slice(0, c);
    let espera = borrando ? 35 : 70;
    if (!borrando && c === frase.length) { borrando = true; espera = 1600; }
    else if (borrando && c === 0) { borrando = false; r = (r + 1) % roles.length; espera = 350; }
    setTimeout(escribir, espera);
}
escribir();

// Foto: clic cambia estilos CSS y texto
const marco = document.getElementById("fotoMarco");
const pie = document.getElementById("pieFoto");
marco.addEventListener("click", () => {
    marco.classList.toggle("brillo");
    pie.textContent = marco.classList.contains("brillo") ? "✨ ¡Modo brillo activado!" : "Haz clic en la foto 👆";
    marco.style.transform = "rotate(-4deg) scale(1.03)";
    setTimeout(() => (marco.style.transform = ""), 350);
});
