/* ==========================================================================
   blog.js · Página «Blog»: lista de entradas con filtro por categoría
   ========================================================================== */

/* Categoría seleccionada: -1 = todas; 0..3 = índice de la entrada/categoría. */
let cat = -1;

/* Fechas de ejemplo de las 4 entradas (mismo orden que T.ps en data.js). */
const D = ['2026-10-14', '2026-10-02', '2026-09-21', '2026-09-08'];

/* Pinta los chips de categorías y las tarjetas de entradas (según el filtro y el idioma). */
function render() {
  const P = t('ps'); // entradas del idioma actual: [categoría, título, resumen]

  // Chips: «Todas» + una por categoría. aria-pressed marca la activa.
  $('#cats').innerHTML = [t('all'), ...P.map(p => p[0])]
    .map((n, i) => `<button class="chip" data-c="${i - 1}" aria-pressed="${cat === i - 1}">${esc(n)}</button>`)
    .join('');

  // Tarjetas: solo las de la categoría elegida (o todas si cat = -1).
  $('#posts').innerHTML = P.map((p, i) =>
    cat < 0 || cat === i
      ? `<article class="g lift"><div class="tb t${i}" aria-hidden="true"></div><div class="bb"><span class="tag card">${esc(p[0])}</span><h3>${esc(p[1])}</h3><p>${esc(p[2])}</p><small>${esc(
          new Date(D[i]).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })
        )}, ${esc(t('demo'))}</small></div></article>`
      : ''
  ).join('');
}

/* Clic en un chip → cambia el filtro y repinta. */
$('#cats').addEventListener('click', e => {
  const b = e.target.closest('.chip');
  if (b) { cat = +b.dataset.c; render(); }
});

onLang(render); // repintar también al cambiar de idioma
