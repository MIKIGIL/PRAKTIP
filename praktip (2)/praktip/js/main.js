/* ==========================================================================
   main.js · Lógica común a TODAS las páginas
   - Idioma (euskera / castellano) con memoria en localStorage
   - Helpers: selectores, traducción t(), escape HTML, iconos SVG, formato de números
   - Menú móvil (hamburguesa)
   Requiere data.js (T, IC) cargado antes.
   ========================================================================== */

/* Clave de localStorage donde se guarda el idioma elegido. */
const LS_KEY = 'praktip-lang';

/* Idioma actual; por defecto euskera. */
let lang = 'eu';
try {
  const s = localStorage.getItem(LS_KEY); // idioma guardado en la visita anterior
  if (s && T[s]) lang = s;
} catch (e) {} // localStorage puede fallar (modo privado): se ignora

/* ---------- Helpers ---------- */

/* $ devuelve el primer elemento que cumple el selector; $$ devuelve todos (en array). */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* t('clave') → texto en el idioma actual (si falta, cae al euskera). */
const t = k => T[lang][k] ?? T.eu[k];

/* esc() escapa HTML para poder insertar texto de forma segura con innerHTML. */
const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ic('nombre', tamaño) → <svg> del icono definido en data.js (IC). */
const ic = (n, s = 22) =>
  `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]}"/></svg>`;

/* kk() → 0 si el idioma es euskera, 1 si es castellano (índice en los arrays [eu, es]). */
const kk = () => (lang === 'eu' ? 0 : 1);

/* num(n, decimales) → número con separador de miles y coma decimal («8.819,08»).
   Se usa 'es-ES' para ambos idiomas; 'always' fuerza el punto de miles también en 4 cifras. */
const num = (n, d = 0) =>
  n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });

/* pct(0.25) → «+25,0 %» (porcentaje con signo). */
const pct = (v, d = 1) => (v > 0 ? '+' : '') + num(v * 100, d) + ' %';

/* ---------- Suscripción a cambios de idioma ---------- */

/* Cada script de página registra aquí su función de «pintado»; se ejecuta al cargar y al cambiar de idioma. */
const subs = [];
const onLang = f => subs.push(f);

/* apply(): traduce todos los elementos con data-i18n / data-i18n-ph y avisa a los scripts de página. */
function apply() {
  document.documentElement.lang = lang; // <html lang="..."> correcto para lectores de pantalla
  $$('[data-i18n]').forEach(e => (e.textContent = t(e.dataset.i18n))); // textos
  $$('[data-i18n-ph]').forEach(e => (e.placeholder = t(e.dataset.i18nPh))); // placeholders de inputs
  $$('.sw button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang)); // botón EU/ES activo
  subs.forEach(f => f()); // repinta lo que depende del idioma (testimonios, tablas, gráficos...)
}

/* ---------- Inicio de la página ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Rellena los huecos [data-ic] con su icono SVG (tamaño en data-s).
  $$('[data-ic]').forEach(e => (e.innerHTML = ic(e.dataset.ic, +e.dataset.s || 22)));

  // Botones EU/ES: cambian el idioma, lo guardan y repintan.
  $$('.sw button').forEach(b =>
    b.addEventListener('click', () => {
      lang = b.dataset.lang;
      try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
      apply();
    })
  );

  // Menú móvil: la hamburguesa muestra/oculta el desplegable y cambia el icono (☰ ↔ ✕).
  const bg = $('#burger'), dd = $('#dd');
  if (bg)
    bg.addEventListener('click', () => {
      dd.hidden = !dd.hidden;
      bg.setAttribute('aria-expanded', !dd.hidden);
      bg.innerHTML = ic(dd.hidden ? 'menu' : 'x');
    });

  apply(); // primera traducción/pintado
});
