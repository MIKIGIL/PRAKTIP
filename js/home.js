/* ==========================================================================
   home.js · Página de inicio (landing)
   - Testimonios en carrusel infinito (marquesina)
   - Pasos del agente inteligente
   - Mapa real interactivo de empresas (initMap, ver map.js)
   ========================================================================== */

/* Se vuelve a ejecutar cada vez que cambia el idioma. */
onLang(() => {
  const k = kk(), row = [...TS, ...TS]; // la lista se duplica para que la marquesina se repita sin saltos

  // Tarjetas de testimonios. La segunda copia (j >= TS.length) se oculta a lectores de pantalla.
  $('#testi').innerHTML = row
    .map(
      (s, j) =>
        `<figure class="tc g"${j >= TS.length ? ' aria-hidden="true"' : ''}><p>“${esc(s[2][k])}”</p><b>${esc(s[0])}</b><div class="who">${esc(s[1][k])}</div></figure>`
    )
    .join('');

  // Los 3 pasos del agente (subir CV, configurar búsqueda, dejar trabajar al agente).
  $('#steps').innerHTML = t('st')
    .map(
      (s, i) =>
        `<div class="step g lift"><i>${ic(['file', 'search', 'spark'][i])}</i><div><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p>${
          i === 2 ? '<div class="sk" aria-hidden="true"><span></span><span></span><span></span></div>' : ''
        }</div></div>`
    )
    .join('');

  // Sección «Gure GJH helburuak»: 3 tarjetas con la imagen oficial de cada ODS (5, 8 y 10).
  const ODS = [5, 8, 10]; // números de los ODS que trabaja PRAKTIP
  $('#gj-grid').innerHTML = t('gj')
    .map(
      (g, i) =>
        `<article class="gj-card g lift"><img src="img/gjh/gjh-${ODS[i]}.png" width="150" height="150" loading="lazy" alt="${esc(t('gjP'))} ${ODS[i]}: ${esc(g[0])}"><h3>${esc(t('gjP'))} ${ODS[i]} · ${esc(g[0])}</h3><p>${esc(g[1])}</p></article>`
    )
    .join('');
});

/* Mapa de la landing (contenedor #map-home). */
initMap($('#map-home'), false);
