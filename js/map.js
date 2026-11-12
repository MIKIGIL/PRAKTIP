/* ==========================================================================
   map.js · MAPA REAL INTERACTIVO (Leaflet + teselas de OpenStreetMap/CARTO)
   Sustituye al mapa dibujado enteramente con código SVG.
   - Se dibuja el mapa real de Euskadi (arrastrar, zoom con botones / Ctrl+rueda / pellizco).
   - Cada empresa hipotética de CP (data.js) es un marcador de color según su sector.
   - Al pulsar un marcador se abre una ventana con nombre, localidad y sector.
   Requiere: Leaflet (CSS+JS cargados en el HTML), data.js (CP, SEC) y main.js (t, esc, kk, onLang).
   initMap(el, big): el = contenedor; big = true para la versión grande de «Prácticas».
   ========================================================================== */

/* Colores de los marcadores, uno por sector (mismo orden que SEC en data.js). */
const SECTOR_CLASSES = ['sc0', 'sc1', 'sc2', 'sc3', 'sc4', 'sc5']; // las clases definen --pc en el CSS

function initMap(el, big) {
  // Prepara el contenedor con el aspecto de tarjeta de cristal (.map.g); .bg2 = versión grande.
  el.className = 'map g' + (big ? ' bg2' : '');

  // Si Leaflet no se ha cargado (p. ej. sin conexión a internet) se muestra un aviso en lugar del mapa.
  if (typeof L === 'undefined') {
    el.innerHTML = '<p class="muted" style="padding:20px">Mapa no disponible sin conexión a internet.</p>';
    return null;
  }

  // 1) Crear el mapa. scrollWheelZoom desactivado para no «secuestrar» el scroll de la página;
  //    el zoom con rueda se activa solo con Ctrl/⌘ (ver más abajo). En móvil se desactiva el arrastre
  //    con un dedo para poder seguir haciendo scroll; el pellizco con dos dedos sí funciona.
  const map = L.map(el, {
    zoomControl: false,
    scrollWheelZoom: false,
    zoomSnap: 0.5,
    minZoom: 7,
    maxZoom: 18,
    dragging: !L.Browser.mobile,
  });
  L.control.zoom({ position: 'topright' }).addTo(map); // botones + / − arriba a la derecha

  // 2) Capa base: teselas «Voyager» de CARTO sobre datos de OpenStreetMap (atribución obligatoria).
  //    Alternativa 100 % OpenStreetMap: https://tile.openstreetmap.org/{z}/{x}/{y}.png
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  // 3) Contenido de la ventana emergente de una empresa (se vuelve a generar al cambiar de idioma).
  const popHTML = p =>
    `<div class="pu"><h3>${esc(p[2])}</h3>` +
    `<p><span class="sec-dot ${SECTOR_CLASSES[p[4]]}"></span>${esc(t('sector'))}: ${esc(SEC[p[4]][kk()])}</p>` +
    `<p>${esc(t('town'))}: ${esc(p[3])}</p>` +
    `<p class="md">${esc(t('md'))}</p></div>`;

  // 4) Un marcador por empresa. El icono es un divIcon (HTML + CSS) en lugar de la imagen por defecto.
  const markers = CP.map(p => {
    const icon = L.divIcon({
      className: 'pin-wrap',
      html: `<span class="pin-dot ${SECTOR_CLASSES[p[4]]}"></span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14], // el centro del punto queda sobre la coordenada
      popupAnchor: [0, -14], // el popup se abre justo encima del punto
    });
    return L.marker([p[0], p[1]], { icon, title: p[2], alt: p[2], keyboard: true })
      .bindPopup(popHTML(p), { maxWidth: 260 })
      .addTo(map);
  });

  // 5) Encuadre inicial: que se vean todas las empresas; y límite de desplazamiento alrededor de Euskadi.
  const bounds = L.latLngBounds(CP.map(p => [p[0], p[1]]));
  map.fitBounds(bounds, { padding: [30, 30] });
  map.setMaxBounds(bounds.pad(1.5));

  // 6) Zoom con rueda del ratón SOLO si se mantiene Ctrl (o ⌘ en Mac), como en la versión anterior.
  el.addEventListener(
    'wheel',
    e => {
      if (!(e.ctrlKey || e.metaKey)) return; // sin Ctrl, la rueda sigue haciendo scroll de la página
      e.preventDefault();
      map.setZoom(map.getZoom() + (e.deltaY < 0 ? 0.5 : -0.5));
    },
    { passive: false }
  );

  // 7) Aviso «Arrastra el mapa. Zoom: Ctrl + rueda o + / −» (texto traducido por data-i18n).
  const hint = document.createElement('span');
  hint.className = 'mh g';
  hint.dataset.i18n = 'mh';
  el.appendChild(hint);

  // 8) Al cambiar de idioma se actualizan los textos de todas las ventanas emergentes.
  onLang(() => markers.forEach((m, i) => m.setPopupContent(popHTML(CP[i]))));

  // 9) Recalcula el tamaño cuando la página termina de cargar (fuentes/imágenes pueden cambiar el layout).
  window.addEventListener('load', () => map.invalidateSize());
  return map;
}
