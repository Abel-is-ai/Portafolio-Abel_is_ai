/* ==========================================================
   Formulario de contacto: valida y envía los datos por WhatsApp
   Abre WhatsApp con el mensaje ya escrito; la persona solo lo envía.
   ========================================================== */
(() => {
  const WHATSAPP = "523322412775";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = form.querySelector(".contact__status");
  const count = form.querySelector(".contact__count");
  const mensaje = form.elements.mensaje;

  /* Contador de caracteres */
  mensaje.addEventListener("input", () => {
    count.textContent = `${mensaje.value.length}/${mensaje.maxLength}`;
  });

  /* Reglas: devuelven "" si está bien, o el texto del error */
  const rules = {
    nombre:  (v) => (v.trim().length >= 2 ? "" : "Escribe tu nombre."),
    correo:  (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Escribe un correo válido."),
    tipo:    (v) => (v ? "" : "Selecciona una opción."),
    presupuesto: (v) => (v ? "" : "Selecciona un rango de presupuesto."),
    horario: (v) => (v ? "" : "Selecciona un horario para la cita."),
    mensaje: (v) => (v.trim().length >= 10 ? "" : "Cuéntame un poco más sobre tu proyecto."),
  };

  function validate(name) {
    const input = form.elements[name];
    const field = input.closest(".field");
    const error = rules[name](input.value);
    field.classList.toggle("is-invalid", Boolean(error));
    field.querySelector(".field__error").textContent = error;
    input.setAttribute("aria-invalid", error ? "true" : "false");
    return !error;
  }

  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => validate(name));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("is-invalid")) validate(name);
    });
  });

  /* Envío */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    const results = Object.keys(rules).map(validate);
    if (results.includes(false)) {
      form.querySelector(".is-invalid .field__input").focus();
      return;
    }

    const texto = [
      "Hola Abel, te escribo desde tu página web.",
      "",
      `*Nombre:* ${form.elements.nombre.value.trim()}`,
      `*Correo:* ${form.elements.correo.value.trim()}`,
      `*Tipo de proyecto:* ${form.elements.tipo.value}`,
      `*Presupuesto:* ${form.elements.presupuesto.value}`,
      `*Horario para la cita:* ${form.elements.horario.value}`,
      `*Mi proyecto:* ${form.elements.mensaje.value.trim()}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");

    status.textContent = "Se abrió WhatsApp con tu mensaje listo. Solo falta que lo envíes.";
    form.reset();
    count.textContent = `0/${mensaje.maxLength}`;
  });
})();