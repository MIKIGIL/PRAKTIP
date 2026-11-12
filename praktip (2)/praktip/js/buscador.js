/* ==========================================================================
   buscador.js · Página «Buscador inteligente»: planes de precios y formulario de prueba
   (La búsqueda es una simulación: al final se muestra «función no disponible de momento».)
   ========================================================================== */

/* Estado: plan elegido, nombre del CV, zona (índice), nivel de estudios (índice), errores, temporizadores. */
let plan = null, fi = null, zi = 0, li = 0, errs = {}, timers = [];
const F = id => $('#' + id); // atajo: elemento por id

/* Tarjetas de los 3 planes (la del medio va destacada). */
function plans() {
  F('plist').innerHTML = t('pl')
    .map(
      (p, i) =>
        `<article class="pc g lift${i === 1 ? ' f' : ''}">${i === 1 ? `<span class="bd">${esc(t('hot'))}</span>` : ''}
    <h3>${esc(p.k)}</h3><div class="pr">${esc(p.p)}<small> /${esc(t('yr'))}</small></div>
    <p class="tg"><b>${esc(t('tgt'))}:</b> ${esc(p.g)}</p>
    <b>${esc(t('lim'))}</b><ul class="lm">${p.l.map(x => `<li>${ic('info', 18)}${esc(x)}</li>`).join('')}</ul>
    <b>${esc(t('inc'))}</b><ul>${p.f.map(x => `<li>${ic('check', 18)}${esc(x)}</li>`).join('')}</ul>
    <a class="btn${i === 1 ? ' mint' : ''}" href="#trial" data-plan="${i}">${esc(t('pick'))}</a></article>`
    )
    .join('');
}

/* Chips de selección única (zona geográfica / nivel de estudios). v = índice seleccionado. */
function chips(id, arr, v) {
  F(id).innerHTML = arr
    .map((a, i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="${v === i}">${esc(a)}</button>`)
    .join('');
}

/* Repinta todo el formulario según el estado actual. */
function render() {
  plans();
  chips('cz', t('zs'), zi);
  chips('cl', t('lv'), li);
  const tag = F('ptag'); tag.hidden = plan === null; // etiqueta «Plan elegido: …»
  if (plan !== null) tag.textContent = `${t('sel')}: ${t('pl')[plan].k}`;
  const txt = F('cvtxt'); txt.textContent = fi || t('up'); // texto de la zona de subida del CV
  if (fi) {
    txt.appendChild(document.createElement('br'));
    const s = document.createElement('small'); s.className = 'chg'; s.textContent = t('chg'); // «Cambiar archivo»
    txt.appendChild(s);
  }
  // Sugerencias de estudios (datalist) solo para Formación Profesional.
  F('fpl').innerHTML = li === 0 ? t('fp').map(x => `<option value="${esc(x)}">`).join('') : '';
  // Mensajes de error de los campos archivo (f) y estudios (s).
  ['f', 's'].forEach(k => (F('e-' + k).textContent = errs[k] ? t(errs[k]) : ''));
}

/* Eventos de selección: plan, zona, nivel y archivo. */
F('plist').addEventListener('click', e => { const a = e.target.closest('[data-plan]'); if (a) { plan = +a.dataset.plan; render(); } });
F('cz').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { zi = +b.dataset.i; render(); } });
F('cl').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { li = +b.dataset.i; render(); } });
F('cvf').addEventListener('change', e => {
  const x = e.target.files[0]; if (!x) return;
  // Solo se aceptan .pdf y .docx.
  if (!/\.(pdf|docx)$/i.test(x.name)) { fi = null; errs.f = 'fileE'; } else { fi = x.name; delete errs.f; }
  render();
});

/* Cambia entre las 3 vistas de la tarjeta: formulario, carga y «no disponible». */
function view(v) {
  F('t-form').hidden = v !== 'form';
  F('t-load').hidden = v !== 'load';
  F('t-na').hidden = v !== 'na';
}

/* Pinta las líneas de progreso de la «carga» (las ya hechas llevan ✓). */
function steps(n) {
  F('ls').innerHTML = t('ls').map((l, i) => `<p class="${i <= n ? 'on' : ''}">${i < n ? '✓ ' : ''}${esc(l)}</p>`).join('');
}

/* Envío del formulario: valida, simula la carga (≈5 s) y muestra «no disponible». */
let stepN = 0;
F('t-form').addEventListener('submit', e => {
  e.preventDefault(); errs = {};
  if (!fi) errs.f = 'fileE'; // falta el CV
  if (!F('stn').value.trim()) errs.s = 'req'; // faltan los estudios
  render();
  if (Object.keys(errs).length) return; // hay errores: no se continúa
  view('load'); stepN = 0; steps(0);
  const a = setInterval(() => { stepN = Math.min(stepN + 1, 2); steps(stepN); }, 1500); // avanza cada 1,5 s
  setTimeout(() => { clearInterval(a); view('na'); }, 5200); // a los 5,2 s: aviso final
});
F('t-ok').addEventListener('click', () => view('form')); // botón OK: vuelve al formulario

onLang(() => { render(); steps(stepN); });
