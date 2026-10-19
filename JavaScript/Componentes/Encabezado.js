/* ==========================================================
   Encabezado: se muestra al pasar el banner principal
   ========================================================== */
(() => {
  const bar = document.querySelector(".topbar");
  const banner = document.querySelector(".banner");
  if (!bar || !banner) return;

  const observer = new IntersectionObserver(
    ([entry]) => bar.classList.toggle("is-visible", !entry.isIntersecting),
    { rootMargin: "-64px 0px 0px 0px" } // aparece cuando el banner ya quedó atrás
  );
  observer.observe(banner);
})();