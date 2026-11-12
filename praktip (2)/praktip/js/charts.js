/* ==========================================================================
   charts.js · Mini-librería de gráficos SVG (sin dependencias externas)
   Dibuja tres tipos de gráfico a partir de datos:
     - barChart  → barras agrupadas (comparar dos series, p. ej. año 1 vs año 2)
     - donutChart→ gráfico de anillo (reparto por categorías)
     - areaChart → línea con área (evolución en el tiempo)
   Cada función devuelve una función «redraw» para repintar (cambio de idioma).
   Los gráficos se adaptan al ancho del contenedor (ResizeObserver) y llevan
   <title> en cada elemento, así que muestran un tooltip nativo al pasar el ratón
   y son legibles para lectores de pantalla.
   Los colores se definen en styles.css (.chart .c1, .c2, .sl-0 ...).
   ========================================================================== */

/* ---------- Utilidades ---------- */

/* niceScale(max): calcula un «paso» redondo (1, 2, 2.5, 5 × 10^n) y el máximo del eje Y,
   de modo que las líneas guía caigan en números bonitos (0, 1000, 2000...). */
function niceScale(max, ticks = 4) {
  const raw = max / ticks;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  return { step, max: step * Math.ceil(max / step) };
}

/* mount(el, draw): pinta el gráfico y lo repinta si cambia el ancho del contenedor.
   draw(ancho) debe devolver el HTML del <svg>. */
function mount(el, draw) {
  const paint = () => {
    const w = Math.max(240, Math.floor(el.clientWidth)); // ancho mínimo para que no se deforme
    el.innerHTML = draw(w);
  };
  paint();
  if (window.ResizeObserver) {
    let last = el.clientWidth;
    new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - last) > 1) { // solo si el ANCHO cambia (evita bucles)
        last = el.clientWidth;
        paint();
      }
    }).observe(el);
  }
  return paint; // se devuelve para poder repintar manualmente
}

/* ---------- Gráfico de barras agrupadas ----------
   cfg() → { labels:[...], series:[{name, cls, values:[...]}], fmt:(v)=>string, h:altura } */
function barChart(el, cfg) {
  return mount(el, w => {
    const { labels, series, fmt, h = 280 } = cfg();
    const m = { l: 58, r: 8, t: 10, b: 28 }; // márgenes internos (izq., der., arriba, abajo)
    const iw = w - m.l - m.r, ih = h - m.t - m.b; // área útil del gráfico
    const top = Math.max(...series.flatMap(s => s.values));
    const sc = niceScale(top); // escala del eje Y
    const y = v => m.t + ih - (v / sc.max) * ih; // valor → coordenada Y
    const band = iw / labels.length; // ancho reservado a cada grupo de barras
    const gw = band * 0.78; // ancho del grupo (deja hueco entre grupos)
    const bw = gw / series.length; // ancho de cada barra
    let s = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(cfg().title || '')}">`;

    // Líneas guía horizontales y etiquetas del eje Y.
    for (let v = 0; v <= sc.max + 1e-9; v += sc.step) {
      s += `<line class="ax" x1="${m.l}" x2="${w - m.r}" y1="${y(v)}" y2="${y(v)}"/>`;
      s += `<text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${esc(num(v))}</text>`;
    }

    // Barras: una por serie dentro de cada grupo.
    labels.forEach((lab, i) => {
      const x0 = m.l + i * band + (band - gw) / 2;
      series.forEach((se, j) => {
        const v = se.values[i], bh = (v / sc.max) * ih;
        s += `<rect class="bar ${se.cls}" x="${x0 + j * bw + 1}" y="${y(v)}" width="${Math.max(1, bw - 2)}" height="${bh}" rx="3"><title>${esc(lab)} · ${esc(se.name)}: ${esc(fmt(v))}</title></rect>`;
      });
      // Etiqueta del eje X (si hay poco ancho, solo se muestra una de cada dos).
      if (band >= 34 || i % 2 === 0)
        s += `<text x="${m.l + i * band + band / 2}" y="${h - 8}" text-anchor="middle">${esc(lab)}</text>`;
    });
    return s + '</svg>';
  });
}

/* ---------- Gráfico de anillo (donut) ----------
   cfg() → { labels:[...], values:[...], fmt:(v)=>string, center:string, sub:string } */
function donutChart(el, cfg) {
  return mount(el, w => {
    const { labels, values, fmt, center, sub } = cfg();
    const size = Math.min(w, 280); // el anillo mide como máximo 280 px
    const cx = size / 2, cy = size / 2, R = size / 2 - 6, r = R * 0.62; // radios exterior e interior
    const total = values.reduce((a, b) => a + b, 0);
    let a0 = -Math.PI / 2; // empieza arriba (las 12 en punto)
    const P = (rad, a) => `${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`;
    let s = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" style="margin:auto" aria-label="${esc(cfg().title || '')}">`;
    values.forEach((v, i) => {
      const a1 = a0 + (v / total) * Math.PI * 2, big = a1 - a0 > Math.PI ? 1 : 0;
      // Trozo del anillo: arco exterior → línea al interior → arco interior (sentido contrario) → cerrar.
      const d = `M ${P(R, a0)} A ${R} ${R} 0 ${big} 1 ${P(R, a1)} L ${P(r, a1)} A ${r} ${r} 0 ${big} 0 ${P(r, a0)} Z`;
      s += `<path class="sl sl-${i}" d="${d}"><title>${esc(labels[i])}: ${esc(fmt(v))} (${esc(num((v / total) * 100, 1))} %)</title></path>`;
      a0 = a1;
    });
    // Texto del centro: total y descripción.
    s += `<text class="ctr" x="${cx}" y="${cy + 2}">${esc(center)}</text><text class="ctr-s" x="${cx}" y="${cy + 20}">${esc(sub)}</text>`;
    return s + '</svg>';
  });
}

/* ---------- Gráfico de línea con área ----------
   cfg() → { labels:[...], values:[...], ticks:[índices con etiqueta], fmt, split:índice donde cambia el año,
             splitLabels:[texto izq., texto der.] } */
function areaChart(el, cfg) {
  return mount(el, w => {
    const { labels, values, ticks, fmt, split, splitLabels, h = 280 } = cfg();
    const m = { l: 58, r: 12, t: 22, b: 28 };
    const iw = w - m.l - m.r, ih = h - m.t - m.b;
    const sc = niceScale(Math.max(...values));
    const x = i => m.l + (i / (values.length - 1)) * iw; // índice → X
    const y = v => m.t + ih - (v / sc.max) * ih; // valor → Y
    const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    const area = `${line} L${x(values.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`; // línea + cierre hasta el eje X
    let s = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(cfg().title || '')}">`;
    // Degradado del área (azul → transparente).
    s += `<defs><linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563ff" stop-opacity=".35"/><stop offset="1" stop-color="#2563ff" stop-opacity="0"/></linearGradient></defs>`;
    // Líneas guía y eje Y.
    for (let v = 0; v <= sc.max + 1e-9; v += sc.step) {
      s += `<line class="ax" x1="${m.l}" x2="${w - m.r}" y1="${y(v)}" y2="${y(v)}"/>`;
      s += `<text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${esc(num(v))}</text>`;
    }
    // Separador entre el año 1 y el año 2.
    const sx = (x(split) + x(split + 1)) / 2;
    s += `<line class="ax" x1="${sx}" x2="${sx}" y1="${m.t - 6}" y2="${y(0)}" stroke-dasharray="4 4"/>`;
    s += `<text x="${sx - 8}" y="${m.t - 8}" text-anchor="end">${esc(splitLabels[0])}</text><text x="${sx + 8}" y="${m.t - 8}">${esc(splitLabels[1])}</text>`;
    // Área, línea y puntos (con tooltip).
    s += `<path class="ar-fill" d="${area}"/><path class="ln" d="${line}"/>`;
    values.forEach((v, i) => {
      s += `<circle class="pt" cx="${x(i)}" cy="${y(v)}" r="3.5"><title>${esc(labels[i])}: ${esc(fmt(v))}</title></circle>`;
    });
    // Etiquetas del eje X solo en los índices indicados.
    ticks.forEach(i => (s += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle">${esc(labels[i])}</text>`));
    return s + '</svg>';
  });
}
