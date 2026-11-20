/* referencias.js - Referencias laborales
   DOM: eventos variados - mouseover, mouseout, dblclick, input/keyup,
        focus, blur, change y submit. */

const estado = document.getElementById("estadoRef");

// ---- mouseover / mouseout: resaltan la referencia ----
document.querySelectorAll(".ref-item").forEach((item) => {
    item.addEventListener("mouseover", () => {
        item.classList.add("resaltada");
        estado.textContent = "Referencia: " + item.querySelector(".fw-semibold").textContent;
    });
    item.addEventListener("mouseout", () => {
        item.classList.remove("resaltada");
        estado.textContent = "Pasa el mouse por una referencia.";
    });
    // ---- dblclick: muestra/oculta el contacto ----
    item.addEventListener("dblclick", () => item.classList.toggle("abierta"));
});

// ---- input: contador de caracteres en vivo ----
const texto = document.getElementById("mTexto");
const cont = document.getElementById("contChars");
texto.addEventListener("input", () => {
    cont.textContent = texto.value.length;
    cont.style.color = texto.value.length > 120 ? "var(--rosa)" : "";
});

// ---- focus / blur: resalta el campo activo ----
document.querySelectorAll("#formMsg .form-control, #formMsg .form-select").forEach((campo) => {
    campo.addEventListener("focus", () => campo.classList.add("campo-activo"));
    campo.addEventListener("blur", () => campo.classList.remove("campo-activo"));
});

// ---- change: cambia el texto de ayuda según el motivo ----
const ayuda = { oferta: "Cuéntame el puesto y la empresa.", proyecto: "Describe la idea del proyecto.", consulta: "¿Qué quieres saber?" };
document.getElementById("mMotivo").addEventListener("change", (e) => {
    texto.placeholder = ayuda[e.target.value];
});

// ---- submit: valida y muestra una alerta de Bootstrap creada con JS ----
document.getElementById("formMsg").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("mNombre");
    const out = document.getElementById("resultadoMsg");
    const ok = nombre.value.trim() && texto.value.trim();
    nombre.classList.toggle("campo-error", !nombre.value.trim());
    texto.classList.toggle("campo-error", !texto.value.trim());

    const alerta = document.createElement("div");
    alerta.className = "alert " + (ok ? "alert-success" : "alert-danger") + " mb-0";
    alerta.textContent = ok
        ? "¡Gracias " + nombre.value.trim() + "! Tu mensaje fue registrado (demo, no se envía)."
        : "Completa tu nombre y el mensaje.";
    out.replaceChildren(alerta);
    if (ok) { e.target.reset(); cont.textContent = "0"; }
});
