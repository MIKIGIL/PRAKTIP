/* ==========================================================================
   economia.js · Sección «Azterketa ekonomikoa / Análisis económico» de la landing
   Pinta, a partir de ECO (data.js, cifras de la hoja «Azterketa» del Excel):
     - Tabla 1: indicadores principales (año 1 vs año 2 y variación)
     - Tabla 2: facturación por plan y tasa de renovación
     - Gráfico 1: facturación mensual año 1 vs año 2 (barras)
     - Gráfico 2: reparto de la facturación del año 2 por planes (anillo)
     - Gráfico 3: facturación acumulada en 24 meses (línea/área)
   Requiere: data.js (ECO, T), main.js (t, esc, num, pct, onLang) y charts.js.
   ========================================================================== */

/* Formato de euros: con 2 decimales en tablas, sin decimales en ejes y centros de gráfico. */
const eur2 = v => num(v, 2) + ' €';
const eur0 = v => num(v, 0) + ' €';

/* ---------- Gráficos (se crean una vez; cada uno lee los textos del idioma actual al pintarse) ---------- */
const ecoCharts = [];
const elMonth = $('#ch-month'), elPlan = $('#ch-plan'), elCum = $('#ch-cum');

if (elMonth)
  ecoCharts.push(
    // Gráfico 1: barras agrupadas, una serie por año, un grupo por mes.
    barChart(elMonth, () => ({
      title: t('ecC1'),
      labels: t('ms'),
      fmt: eur0,
      series: [
        { name: t('y1'), cls: 'c1', values: ECO.month.y1 },
        { name: t('y2'), cls: 'c2', values: ECO.month.y2 },
      ],
    }))
  );

if (elPlan)
  ecoCharts.push(
    // Gráfico 2: anillo con la facturación del año 2 repartida por planes.
    donutChart(elPlan, () => ({
      title: t('ecC2'),
      labels: ECO.plan.map(p => p[0]),
      values: ECO.plan.map(p => p[2]),
      fmt: eur0,
      center: eur0(ECO.plan.reduce((a, p) => a + p[2], 0)),
      sub: t('y2'),
    }))
  );

if (elCum)
  ecoCharts.push(
    // Gráfico 3: facturación acumulada mes a mes durante 24 meses.
    areaChart(elCum, () => ({
      title: t('ecC3'),
      labels: ECO.cum.map((_, i) => `${t('mo')}${i + 1}`), // H1…H24 (euskera) / M1…M24 (castellano)
      values: ECO.cum,
      ticks: [0, 5, 11, 17, 23], // etiquetas del eje X: meses 1, 6, 12, 18 y 24
      fmt: eur0,
      split: 11, // el año 1 termina en el mes 12 (índice 11)
      splitLabels: [t('y1'), t('y2')],
    }))
  );

/* ---------- Tablas y leyendas (dependen del idioma) ---------- */
function renderEco() {
  // Tabla 1: indicadores principales. La variación se calcula como año2/año1 − 1 (si el año 1 es 0 → «–»).
  const kpiHead = t('ecKh');
  const kpiRows = ECO.kpi
    .map(([a, b], i) => {
      const f = i === 0 ? eur2 : v => num(v); // la primera fila es dinero; el resto, recuentos
      return `<tr><td>${esc(t('ecKr')[i])}</td><td>${esc(f(a))}</td><td>${esc(f(b))}</td><td class="up">${a > 0 ? esc(pct(b / a - 1)) : '–'}</td></tr>`;
    })
    .join('');
  $('#eco-kpi').innerHTML =
    `<caption class="vh">${esc(t('ecK'))}</caption>` +
    `<thead><tr>${kpiHead.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${kpiRows}</tbody>`;

  // Tabla 2: facturación por plan, variación y tasa de renovación del año 2 + fila de totales.
  const planHead = t('ecPh');
  const planRows = ECO.plan
    .map(
      ([n, a, b, r]) =>
        `<tr><td>${esc(n)}</td><td>${esc(eur2(a))}</td><td>${esc(eur2(b))}</td><td class="up">${esc(pct(b / a - 1))}</td><td>${esc(num(r * 100, 1))} %</td></tr>`
    )
    .join('');
  const t1 = ECO.plan.reduce((s, p) => s + p[1], 0), t2 = ECO.plan.reduce((s, p) => s + p[2], 0);
  $('#eco-plan').innerHTML =
    `<caption class="vh">${esc(t('ecP'))}</caption>` +
    `<thead><tr>${planHead.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${planRows}</tbody>` +
    `<tfoot><tr><td>${esc(t('ecTot'))}</td><td>${esc(eur2(t1))}</td><td>${esc(eur2(t2))}</td><td class="up">${esc(pct(t2 / t1 - 1))}</td><td>${esc(num(ECO.renTotal * 100, 1))} %</td></tr></tfoot>`;

  // Leyendas HTML de los gráficos (cuadrito de color + nombre).
  const key = (cls, txt) => `<span><i class="${cls}"></i>${esc(txt)}</span>`;
  $('#lg-month').innerHTML = key('k-y1', t('y1')) + key('k-y2', t('y2'));
  $('#lg-plan').innerHTML = ECO.plan.map((p, i) => key('k-' + i, p[0])).join('');

  ecoCharts.forEach(redraw => redraw()); // repinta los gráficos con los textos del nuevo idioma
}

if ($('#eco-kpi')) onLang(renderEco);
