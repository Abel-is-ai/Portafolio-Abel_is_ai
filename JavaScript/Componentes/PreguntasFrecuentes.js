/* ==========================================================
   FAQ: efecto de escritura al abrir una pregunta
   ========================================================== */
(() => {
  const SPEED = 18; // milisegundos por tick (menos = más rápido)
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function type(out, full) {
    const typed = document.createElement("span");
    const rest = document.createElement("span");
    typed.className = "faq__typed";
    rest.className = "faq__rest";   /* texto aún sin escribir: invisible, pero reserva el espacio */
    rest.textContent = full;
    out.textContent = "";
    out.append(typed, rest);
    out.classList.add("is-typing");

    const step = Math.max(1, Math.ceil(full.length / 120)); /* respuestas largas: más letras por tick */
    let i = 0;
    out._timer = setInterval(() => {
      i = Math.min(full.length, i + step);
      typed.textContent = full.slice(0, i);
      rest.textContent = full.slice(i);
      if (i >= full.length) {
        clearInterval(out._timer);
        out.classList.remove("is-typing");
        out.textContent = full;
      }
    }, SPEED);
  }

  document.querySelectorAll(".faq__item").forEach((item) => {
    const out = item.querySelector(".faq__a");
      const full = out.textContent.replace(/\s+/g, " ").trim();
    out.textContent = full;

    item.addEventListener("toggle", () => {
      clearInterval(out._timer);
      out.classList.remove("is-typing");
      out.textContent = full;
      if (item.open && !reduceMotion) type(out, full);
    });
  });
})();