/* ==========================================================
   Glitch: dispara el efecto "reveal" cuando el texto entra en pantalla
   ========================================================== */
(() => {
  const items = document.querySelectorAll(".glitch--reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-glitching");
      obs.unobserve(entry.target);   // solo una vez
    });
  }, { threshold: 0.6 });

  items.forEach((el) => observer.observe(el));
})();

/* ==========================================================
   Glitch en el fondo: cuadros de colores al azar
   Funciona con cada elemento .glitch-bg (banner y/o toda la página)
   Opciones por elemento: data-cell, data-min-wait, data-max-wait
   ========================================================== */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const COLORS = ["cyan", "purple", "white"];   // colores disponibles
  const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function startBackground(layer) {
    const CELL = Number(layer.dataset.cell) || 40;               // cuadrícula (px)
    const MIN_WAIT = Number(layer.dataset.minWait) || 1500;      // entre ráfagas (ms)
    const MAX_WAIT = Number(layer.dataset.maxWait) || 4000;
    let visible = true;

    /* Una ráfaga: 2 a 5 cuadros agrupados en una zona */
    function burst() {
      const cols = Math.floor(layer.clientWidth / CELL);
      const rows = Math.floor(layer.clientHeight / CELL);
      if (cols < 1 || rows < 1) return;

      const baseX = rnd(0, cols - 1);
      const baseY = rnd(0, rows - 1);

      for (let i = 0; i < rnd(2, 5); i++) {
        const block = document.createElement("span");
        const x = Math.min(cols - 1, Math.max(0, baseX + rnd(-3, 3))) * CELL;
        const y = Math.min(rows - 1, Math.max(0, baseY + rnd(-2, 2))) * CELL;

        block.className = "glitch-bg__block glitch-bg__block--" + COLORS[rnd(0, COLORS.length - 1)];
        block.style.cssText =
          `left:${x}px;top:${y}px;width:${rnd(1, 3) * CELL}px;height:${rnd(1, 2) * CELL}px;` +
          `animation-delay:${rnd(0, 120)}ms`;
        block.addEventListener("animationend", () => block.remove());
        layer.append(block);
      }
    }

    function schedule() {
      setTimeout(() => {
        if (visible && !document.hidden) burst();
        schedule();
      }, rnd(MIN_WAIT, MAX_WAIT));
    }

    /* No gasta recursos cuando la capa no se ve */
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(layer);
    schedule();
  }

  document.querySelectorAll(".glitch-bg").forEach(startBackground);
})();