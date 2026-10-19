/* ==========================================================
   Carrusel "Tipos de páginas": flechas, teclado y avance automático
   ========================================================== */
(() => {
  const root = document.querySelector(".carousel");
  if (!root) return;

  const DURATION = 6000; // milisegundos que dura cada slide
  const TICK = 100;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slides = [...root.querySelectorAll(".carousel__slide")];
  const fill = root.querySelector(".carousel__fill");
  const loading = root.querySelector(".carousel__loading");
  let index = 0, elapsed = 0, paused = false;

  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => { s.hidden = i !== index; });
    elapsed = 0;
    fill.style.width = "0%";
  }

  root.querySelector(".carousel__arrow--prev").addEventListener("click", () => show(index - 1));
  root.querySelector(".carousel__arrow--next").addEventListener("click", () => show(index + 1));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  root.addEventListener("pointerenter", () => { paused = true; });
  root.addEventListener("pointerleave", () => { paused = false; });

  if (reduceMotion) {
    loading.hidden = true;   // sin avance automático
  } else {
    setInterval(() => {
      if (paused) return;
      elapsed += TICK;
      fill.style.width = (elapsed / DURATION) * 100 + "%";
      if (elapsed >= DURATION) show(index + 1);
    }, TICK);
  }

  show(0);
})();