/* ==========================================================
   Menú de acceso rápido: abre y cierra el desplegable
   Se cierra al elegir una opción, al tocar fuera o con Escape
   ========================================================== */
(() => {
  const btn = document.querySelector(".menu__btn");
  const panel = document.getElementById("menuPanel");
  if (!btn || !panel) return;

  function setOpen(open) {
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  btn.addEventListener("click", () => setOpen(panel.hidden));

  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!panel.hidden && !e.target.closest(".menu")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) {
      setOpen(false);
      btn.focus();
    }
  });
})();