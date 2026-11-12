/* ==========================================================================
   practicas.js · Página «Te conseguimos las prácticas»
   - Cifra «1.200+ acuerdos», marquesina de empresas, mapa real grande
   - Reserva de reunión: calendario, horas y formulario (simulado, no se envía nada)
   ========================================================================== */

/* Titular con la cifra destacada: se sustituye {n} por <span class="big">1.200+</span>. */
onLang(() => { $('#pbt').innerHTML = esc(t('pbT')).replace('{n}', `<span class="big">${PARTNERS}+</span>`); });

/* Marquesina de empresas (la lista se duplica para el bucle infinito). */
$('#cos').innerHTML = [...COS, ...COS].map(c => `<div class="co g"><i>${c[0]}</i>${c}</div>`).join('');

/* Mapa real grande (contenedor #map-big), ver map.js. */
initMap($('#map-big'), true);

/* ---- Reserva de reunión (función autoejecutable para no ensuciar el ámbito global) ---- */
(() => {
  const today = new Date(); today.setHours(0, 0, 0, 0); // hoy a las 00:00
  // mo = primer día del mes mostrado; day = día elegido; tm = hora elegida; errs = errores; done = reserva confirmada.
  let mo = new Date(today.getFullYear(), today.getMonth(), 1), day = null, tm = null, errs = {}, done = false;
  const SL = ['09:00', '10:30', '12:00', '16:00', '17:30'], F = id => $('#' + id); // horas disponibles
  // Día reservable: futuro, no fin de semana y dentro de los próximos 4 meses.
  const ok = d => d > today && d.getDay() % 6 !== 0 && d < new Date(today.getFullYear(), today.getMonth() + 4, 1);
  // Fecha larga en el idioma actual.
  const fmt = d => d.toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  /* Repinta calendario, horas, campos y estado de confirmación. */
  function render() {
    const lead = (mo.getDay() + 6) % 7, nd = new Date(mo.getFullYear(), mo.getMonth() + 1, 0).getDate(); // huecos iniciales (lunes=0) y nº de días
    F('mlabel').textContent = mo.toLocaleDateString(lang, { month: 'long', year: 'numeric' });
    F('prev').disabled = mo <= new Date(today.getFullYear(), today.getMonth(), 1); // no se puede ir al pasado
    let h = '';
    for (let i = 0; i < 7; i++) h += `<small>${new Date(2024, 0, 1 + i).toLocaleDateString(lang, { weekday: 'short' })}</small>`; // cabecera L-D
    h += '<span></span>'.repeat(lead);
    for (let i = 1; i <= nd; i++) {
      const d = new Date(mo.getFullYear(), mo.getMonth(), i);
      h += `<button type="button" class="dy" data-d="${i}"${ok(d) ? '' : ' disabled'} aria-pressed="${!!day && +day === +d}">${i}</button>`;
    }
    F('cal').innerHTML = h;
    F('dlabel').textContent = day ? fmt(day) : t('pickD');
    // Horas del día elegido (algunas «ocupadas» según una regla fija de demostración).
    F('slots').innerHTML = day
      ? SL.map((s, i) => `<button type="button" class="chip" data-s="${s}"${(day.getDate() * 3 + i) % 4 === 0 ? ' disabled' : ''} aria-pressed="${tm === s}">${s}</button>`).join('')
      : '';
    F('bd').value = day ? day.toLocaleDateString(lang) : t('none');
    F('bh').value = tm || t('none');
    ['n', 's', 'e', 'p', 'dt'].forEach(k => (F('e-' + k).textContent = errs[k] ? t(errs[k]) : ''));
    if (done) F('dsum').innerHTML = `${esc(fmt(day))}, ${esc(tm)}<br>${esc(F('bn').value)} ${esc(F('bs').value)} (${esc(F('be').value)})`;
    F('bk').hidden = done; F('done').hidden = !done;
  }
  /* Rellena el desplegable «perfil» (estudiante / profesor / centro) conservando la selección. */
  function profiles() {
    const s = F('bp'), v = s.value;
    s.innerHTML = `<option value="">${esc(t('choose'))}</option>` + t('pfs').map((x, i) => `<option value="${i + 1}">${esc(x)}</option>`).join('');
    s.value = v;
  }
  // Flechas del calendario: mes anterior / siguiente.
  F('prev').addEventListener('click', () => { mo = new Date(mo.getFullYear(), mo.getMonth() - 1, 1); render(); });
  F('next').addEventListener('click', () => { mo = new Date(mo.getFullYear(), mo.getMonth() + 1, 1); render(); });
  // Elegir un día (resetea la hora).
  F('cal').addEventListener('click', e => {
    const b = e.target.closest('.dy'); if (!b || b.disabled) return;
    day = new Date(mo.getFullYear(), mo.getMonth(), +b.dataset.d); tm = null; render();
  });
  // Elegir una hora.
  F('slots').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b || b.disabled) return; tm = b.dataset.s; render(); });
  // Enviar: valida campos obligatorios, correo y fecha/hora; si todo está bien → «¡Reunión reservada!».
  F('bform').addEventListener('submit', e => {
    e.preventDefault(); errs = {};
    ['n', 's', 'e', 'p'].forEach(k => { if (!F('b' + k).value.trim()) errs[k] = 'req'; });
    const em = F('be').value; if (em && !/^\S+@\S+\.\S+$/.test(em)) errs.e = 'mailE';
    if (!day || !tm) errs.dt = 'pickDT';
    if (!Object.keys(errs).length) done = true;
    render();
  });
  // «Nueva reserva»: reinicia el estado.
  F('again').addEventListener('click', () => { done = false; day = null; tm = null; render(); });
  onLang(() => { profiles(); render(); });
})();
