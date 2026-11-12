/* ==========================================================================
   login.js · Inicio de sesión (DEMOSTRACIÓN: no hay autenticación real)
   ========================================================================== */

let shown = false; // ¿se muestra la contraseña en claro?
let sent = false; // ¿se ha enviado el formulario? (muestra el aviso de demo)

/* Actualiza el tipo del input, el botón mostrar/ocultar y el mensaje. */
function render() {
  $('#pw').type = shown ? 'text' : 'password';
  $('#toggle').setAttribute('aria-pressed', shown);
  $('#toggle-txt').textContent = shown ? t('hd') : t('sh');
  $('#lmsg').hidden = !sent;
}

/* Botón «Mostrar/Ocultar» la contraseña. */
$('#toggle').addEventListener('click', () => { shown = !shown; render(); });

/* Enviar: se evita el envío real y solo se muestra «autenticación no disponible». */
$('#lform').addEventListener('submit', e => { e.preventDefault(); sent = true; render(); });

onLang(render);
