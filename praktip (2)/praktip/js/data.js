/* ==========================================================================
   data.js · TODOS los datos de la web (se carga antes que el resto de scripts)
   - PARTNERS / CONTACT: cifra de acuerdos y correo de contacto (ejemplos).
   - IC: trazos SVG de los iconos de línea.
   - T: textos traducidos (T.eu = euskera, T.es = castellano). Se leen con t('clave').
   - TS: testimonios (nombre, cargo [eu, es], frase [eu, es]).
   - SEC: sectores de las empresas (eu, es).
   - CP: empresas hipotéticas del mapa [lat, lng, nombre, localidad, sector].
   - COS: nombres de la marquesina de empresas.
   - ECO: cifras de la hoja «Azterketa» del Excel (modelo económico hipotético).
   ========================================================================== */

/* Cifra de acuerdos con empresas y correo de contacto (datos de ejemplo). */
const PARTNERS = "1.200",
  CONTACT = "info@praktip.example";
/* Iconos: cada valor es el atributo "d" de un <path> SVG en una cuadrícula de 24x24. */
const IC = {
  cap: "M2 9l10-5 10 5-10 5z M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  build: "M4 21V4h10v17 M14 9h6v12 M8 8h2 M8 12h2 M8 16h2 M3 21h18",
  file: "M6 2h8l5 5v15H6z M14 2v5h5 M9 13h7 M9 17h7",
  pin: "M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  spark: "M12 2l2.2 6.3L21 10l-6.8 1.7L12 18l-2.2-6.3L3 10l6.8-1.7z",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.3-4.3",
  check: "M5 12l5 5L20 7",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  school: "M3 10l9-6 9 6 M5 10v10 M19 10v10 M9 20v-6h6v6 M3 20h18",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  left: "M15 5l-7 7 7 7",
  right: "M9 5l7 7-7 7",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z",
  x: "M6 6l12 12 M18 6L6 18",
  cal: "M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 11v5 M12 8h.01",
};
/* Textos de la interfaz en los dos idiomas. */
const T = {
  eu: {
    // ---- Navegación y banner de la landing ----
    home: "Hasiera",
    prac: "Praktikak lortzen dizkizugu",
    find: "Bilatzaile adimenduna",
    blog: "Bloga",
    login: "Hasi saioa",
    h1: "Zure etorkizun profesionala hemen hasten da",
    sub: "PRAKTIPek ikasleei lan-munduratzeko jauzia egiten laguntzen die, eta irakasleei eta ikastetxeei beren ikasleentzako aukerak lortzen.",
    cta: "Probatu doan",
    // ---- Testimonios y servicios ----
    demo: "Adibide-edukia",
    tt: "Zer diote gure erabiltzaileek",
    s1t: "Praktikak lortzen dizkizugu enpresekin ditugun hitzarmenei esker",
    s1s: "PRAKTIP Euskadiko hainbat enpresarekin lankidetzan ari da praktikak bilatzea errazteko.",
    call: "Antolatu doako bilera bat",
    // ---- Servicio 2: agente inteligente (pasos) ----
    s2t: "Aurkitu praktikak gure agente adimendunarekin",
    s2s: "Agenteak curriculuma, ikasketak eta eremu geografikoa aztertzen ditu aukera bateragarriak aurkitzeko eta enpresentzako mezu pertsonalizatuak prestatzeko.",
    st: [
      ["Igo zure curriculuma", "PDF edo DOCX formatuan."],
      [
        "Konfiguratu zure bilaketa",
        "Aukeratu eremu geografikoa eta zure ikasketak.",
      ],
      [
        "Utzi agenteari lanean",
        "Aukerak aztertzen ditu, bateragarrienak hautatzen ditu eta mezu pertsonalizatua prestatzen du.",
      ],
    ],
    // ---- Quiénes somos ----
    abT: "Nor gara",
    p1: "PRAKTIP ikasenpresa bat da, eta haren helburua Lanbide Heziketako ikasleen eta praktikak eskaintzen dituzten enpresen arteko bitartekaritza egitea da. PRAKTIPek praktikak bilatzeko bi bide eskaintzen ditu: adimen artifizialeko agenteen bidezko bilaketa eta hautaketa, eta enpresekin zuzenean egindako hitzarmen eta kontratuen bidezko lankidetza.",
    p2: "Gure zerbitzua hiru erabiltzaile motari zuzentzen zaie: praktiketan ikasleak hartu nahi dituzten enpresei; beren ikasleentzako praktikak bilatzen dituzten irakasleei; eta beren ikasleentzat praktikak aurkitu nahi dituzten ikastetxeei. Horren bidez, bilaketa-prozesua errazten dugu, eskaintzak eta hautagaiak hobeto lotzen ditugu, eta ikasleen lan-munduratzea sustatzen dugu.",
    // ---- Pie de página ----
    fd: "Ikasleak, enpresak eta ikastetxeak lotzen dituen ikasenpresa.",
    ct: "Kontaktua",
    ex: "(adibidea, editagarria)",
    rt: "Eskubide guztiak erreserbatuta.",
    nv: "Nabigazioa",
    // ---- Página «Te conseguimos las prácticas» (cifra, empresas, mapa) ----
    pbT: "{n} hitzarmen baino gehiago ditugu Euskadiko enpresekin",
    pbS: "Gure enpresa-sareari esker, praktikak bilatzea askoz errazagoa da.",
    meet: "Antolatu doako bilera bat",
    coT: "Gure enpresa-sarea",
    mapT: "Euskadi osoko enpresak",
    mapS: "Sakatu markatzaile bat enpresaren informazioa ikusteko.",
    dn: "Datu hipotetikoak (demo)",
    town: "Herria",
    sector: "Sektorea",
    md: "Adibide-enpresa: demo-datuak, ez da benetako lankidetza.",
    // ---- Reserva de reunión (calendario + formulario) ----
    bkT: "Antolatu doako bilera bat PRAKTIPekin",
    bkS: "Aukeratu eguna eta ordua, eta bete formularioa.",
    nm: "Izena",
    su: "Abizenak",
    em: "Posta elektronikoa",
    pf: "Erabiltzaile-profila",
    pfs: ["Ikaslea", "Irakaslea", "Ikastetxea"],
    og: "Ikastetxearen edo enpresaren izena (aukerakoa)",
    rs: "Bileraren arrazoia (aukerakoa)",
    dt: "Data",
    hr: "Ordua",
    none: "Hautatu gabe",
    conf: "Berretsi bilera",
    choose: "Aukeratu",
    req: "Eremu hau derrigorrezkoa da",
    mailE: "Posta elektroniko baliogabea",
    pickDT: "Aukeratu data bat eta ordu bat",
    fileE: "Igo PDF edo DOCX fitxategi bat",
    dd: "Bilera erreserbatuta!",
    dx: "Simulazioa da: ez da daturik bidali.",
    again: "Erreserba berria",
    pickD: "Aukeratu egun bat orduak ikusteko",
    // ---- Página «Buscador inteligente» y planes ----
    bT: "Utzi gure agente adimendunari praktikak aurkitzen",
    bS: "Igo zure curriculuma, aukeratu eremua eta agenteak egingo du gainerakoa.",
    plT: "Aukeratu zure plana",
    yr: "urtean",
    tgt: "Hartzailea",
    lim: "Mugak",
    inc: "Barne",
    pick: "Aukeratu plana",
    hot: "Nabarmendua",
    pl: [
      {
        k: "Ikaslea",
        p: "19,88 €",
        g: "Lanbide Heziketako ikasleak",
        l: ["Curriculum 1", "Profil pertsonal 1", "Bilaketa indibiduala"],
        f: [
          "Curriculuma sortu eta eguneratu",
          "Eskaintza bateragarriak jaso",
          "Eskaintzak gorde",
          "IA bidezko oinarrizko gomendioak",
        ],
      },
      {
        k: "Irakaslea",
        p: "99,88 €",
        g: "Ikasleen praktikak kudeatzen dituzten irakasleak",
        l: ["Hainbat ikasleren kudeaketa", "Eskaeren jarraipena"],
        f: [
          "Ikaslea planeko funtzio guztiak",
          "Hainbat ikasleren profilen kudeaketa",
          "Eskaintzen antolaketa",
          "Prozesuen jarraipena",
          "Talde-panela",
        ],
      },
      {
        k: "Ikastetxea",
        p: "588,88 €",
        g: "Lanbide Heziketako ikastetxeak",
        l: ["Hainbat talde eta irakasleren erakunde-kudeaketa"],
        f: [
          "Irakaslea planeko funtzio guztiak",
          "Hainbat taldeen kudeaketa",
          "Ikastetxearen panel orokorra",
          "Jarduera-txostenak",
          "Enpresekiko koordinazioa",
        ],
      },
    ],
    // ---- Formulario de prueba del buscador ----
    trT: "Aurkitu zuri hobekien datozkizun praktikak",
    trS: "Agenteak curriculuma, prestakuntza eta eremu geografikoa erabiltzen ditu bilaketa pertsonalizatua prestatzeko.",
    cv: "Curriculuma",
    up: "Igo curriculuma (PDF edo DOCX)",
    chg: "Aldatu fitxategia",
    zn: "Eremu geografikoa",
    zs: ["Euskadi osoa", "Araba", "Bizkaia", "Gipuzkoa"],
    sd: "Zer ari zara ikasten?",
    lv: ["Lanbide Heziketa", "Unibertsitate-gradua"],
    sn: "Ikasketen izena",
    sph: "Adib.: Web Aplikazioen Garapena",
    fp: [
      "Sistema Mikroinformatikoak eta Sareak",
      "Web Aplikazioen Garapena",
      "Plataforma Anitzeko Aplikazioen Garapena",
      "Administrazioa eta Finantzak",
      "Marketina eta Publizitatea",
      "Elektrizitatea eta Elektronika",
    ],
    go: "Bilatu praktikak",
    ls: [
      "Curriculuma aztertzen...",
      "Eskaintza bateragarriak bilatzen...",
      "Mezu pertsonalizatua prestatzen...",
    ],
    na: "Funtzio hau ez dago erabilgarri oraingoz",
    nx: "Bilatzailea garatzen ari gara. Laster izango da prest.",
    sel: "Hautatutako plana",
    // ---- Blog ----
    blT: "PRAKTIPen bloga",
    blS: "Aholkuak, gidak eta berriak zure lehen lan-esperientzia aurkitzeko.",
    all: "Denak",
    ps: [
      [
        "Aholkuak",
        "5 aholku Lanbide Heziketako praktikak aurkitzeko",
        "Hasi goiz, zaindu zure profila eta erabili zure ingurunea.",
      ],
      [
        "Curriculuma",
        "Nola prestatu curriculuma lehen lan-esperientziarako",
        "Egitura argia eta zure proiektuak: hau da gakoa.",
      ],
      [
        "Teknologia",
        "Adimen artifiziala lan-bilaketan",
        "Zer egin dezakete agenteek eta non jarri behar da muga.",
      ],
      [
        "Hezkuntza",
        "Praktiken garrantzia lanbide-heziketan",
        "Ikasgelatik enpresara: zergatik diren hain garrantzitsuak.",
      ],
    ],
    // ---- Login ----
    wl: "Ongi etorri berriro",
    pw: "Pasahitza",
    sh: "Erakutsi",
    hd: "Ezkutatu",
    kp: "Mantendu saioa hasita",
    fg: "Pasahitza ahaztu duzu?",
    en: "Sartu",
    bk: "Itzuli hasierara",
    nl: "Autentifikazioa ez dago erabilgarri demo-bertsio honetan.",
    // ---- Aviso del mapa ----
    mh: "Arrastatu mapa. Zooma: Ctrl + gurpila edo + / −",
    // ---- Landing: «Gure GJH helburuak» (ODS) ----
    gjT: "Gure GJH helburuak",
    gjS: "PRAKTIPen iraunkortasun-eragina batez ere soziala eta ekonomikoa da. Horregatik, hiru Garapen Jasangarrirako Helburu (GJH) aukeratu ditugu.",
    gjP: "GJH",
    gj: [
      ["Genero-berdintasuna", "Praktikak eskuratzeko aukera berdinak eta hautaketa-irizpideetan genero-alborapenik ez izatea."],
      ["Lan duina eta hazkunde ekonomikoa", "Kalitatezko praktikak sustatzea eta enpresei talentu berria aurkitzen laguntzea."],
      ["Desberdintasunak murriztea", "Ikasle eta ikastetxe guztiei zerbitzua eskuragarri jartzea, haien egoera eta beharrak kontuan hartuta."],
    ],
    // ---- Landing: «Azterketa ekonomikoa» ----
    ecT: "Azterketa ekonomikoa",
    ecS: "1. eta 2. urteko emaitza hipotetikoen konparazio bisuala.",
    ecK: "Adierazle nagusiak",
    ecKh: ["Adierazlea", "1. urtea", "2. urtea", "Aldaketa"],
    ecKr: ["Fakturazioa guztira (€)", "Altak guztira", "Bajak guztira", "Berritzeak guztira", "Bezero aktiboak itxieran"],
    ecP: "Fakturazioa plan bakoitzeko",
    ecPh: ["Plana", "1. urtea", "2. urtea", "Aldaketa", "Berritze-tasa"],
    ecTot: "Guztira",
    ecC1: "Hileroko fakturazioa: 1. urtea vs 2. urtea",
    ecC2: "2. urteko fakturazioaren banaketa planen arabera",
    ecC3: "Fakturazio metatua 24 hilabetetan",
    y1: "1. urtea",
    y2: "2. urtea",
    ph: "Argazkiak: Unsplash eta Pexels",
    mo: "H",
    ms: ["urt", "ots", "mar", "api", "mai", "eka", "uzt", "abu", "ira", "urr", "aza", "abe"],
    ecN: "Zifrak simulatuak dira: ez dute benetako salmentarik ezta egiaztatutako aurreikuspenik ere adierazten.",
  },
  es: {
    // ---- Navegación y banner de la landing ----
    home: "Inicio",
    prac: "Te conseguimos las prácticas",
    find: "Buscador inteligente",
    blog: "Blog",
    login: "Iniciar sesión",
    h1: "Tu futuro profesional empieza aquí",
    sub: "PRAKTIP ayuda a los estudiantes a dar el salto al mundo laboral, y a profesores y centros a conseguir oportunidades para sus alumnos.",
    cta: "Pruébalo gratis",
    // ---- Testimonios y servicios ----
    demo: "Contenido de demostración",
    tt: "Lo que dicen nuestros usuarios",
    s1t: "Te conseguimos prácticas gracias a nuestros acuerdos con empresas",
    s1s: "PRAKTIP colabora con diferentes empresas de Euskadi para facilitar la búsqueda de prácticas.",
    call: "Agenda una llamada gratis",
    // ---- Servicio 2: agente inteligente (pasos) ----
    s2t: "Encuentra prácticas con nuestro agente inteligente",
    s2s: "El agente analiza el currículum, los estudios y la zona geográfica para encontrar oportunidades compatibles y preparar correos personalizados para las empresas.",
    st: [
      ["Sube tu currículum", "En formato PDF o DOCX."],
      ["Configura tu búsqueda", "Elige la zona geográfica y tus estudios."],
      [
        "Deja trabajar al agente",
        "Analiza las oportunidades, selecciona las más compatibles y prepara un correo personalizado.",
      ],
    ],
    // ---- Quiénes somos ----
    abT: "Quiénes somos",
    p1: "PRAKTIP es una ikasenpresa cuyo objetivo es actuar como intermediaria entre los estudiantes de Formación Profesional y las empresas que ofrecen prácticas. PRAKTIP ofrece dos vías para buscar prácticas: la búsqueda y selección mediante agentes de inteligencia artificial, y la colaboración a través de acuerdos y contratos establecidos directamente con empresas.",
    p2: "Nuestro servicio se dirige a tres tipos de usuarios: empresas que quieren acoger estudiantes en prácticas; profesores que buscan prácticas para sus alumnos; y centros educativos que quieren encontrar prácticas para sus estudiantes. Con ello facilitamos el proceso de búsqueda, conectamos mejor ofertas y candidatos, y fomentamos la incorporación de los alumnos al mundo laboral.",
    // ---- Pie de página ----
    fd: "Ikasenpresa que conecta estudiantes, empresas y centros educativos.",
    ct: "Contacto",
    ex: "(ejemplo, editable)",
    rt: "Todos los derechos reservados.",
    nv: "Navegación",
    // ---- Página «Te conseguimos las prácticas» (cifra, empresas, mapa) ----
    pbT: "Tenemos más de {n} acuerdos con empresas de Euskadi",
    pbS: "Gracias a nuestra red de empresas, encontrar prácticas es mucho más fácil.",
    meet: "Agenda una reunión gratis",
    coT: "Nuestra red de empresas",
    mapT: "Empresas de toda Euskadi",
    mapS: "Pulsa un marcador para ver la información de la empresa.",
    dn: "Datos hipotéticos (demo)",
    town: "Localidad",
    sector: "Sector",
    md: "Empresa ficticia: datos de demostración, no es una colaboración real.",
    // ---- Reserva de reunión (calendario + formulario) ----
    bkT: "Agenda una reunión gratuita con PRAKTIP",
    bkS: "Elige día y hora, y completa el formulario.",
    nm: "Nombre",
    su: "Apellidos",
    em: "Correo electrónico",
    pf: "Perfil de usuario",
    pfs: ["Estudiante", "Profesor", "Centro educativo"],
    og: "Centro educativo o empresa (opcional)",
    rs: "Motivo de la reunión (opcional)",
    dt: "Fecha",
    hr: "Hora",
    none: "Sin seleccionar",
    conf: "Confirmar reunión",
    choose: "Selecciona",
    req: "Campo obligatorio",
    mailE: "Correo electrónico no válido",
    pickDT: "Selecciona una fecha y una hora",
    fileE: "Sube un archivo PDF o DOCX",
    dd: "¡Reunión reservada!",
    dx: "Reserva simulada: no se ha enviado ningún dato.",
    again: "Nueva reserva",
    pickD: "Elige un día para ver los horarios",
    // ---- Página «Buscador inteligente» y planes ----
    bT: "Deja que nuestro agente inteligente encuentre tus prácticas",
    bS: "Sube tu currículum, elige la zona y el agente hace el resto.",
    plT: "Elige tu plan",
    yr: "al año",
    tgt: "Dirigido a",
    lim: "Límites",
    inc: "Incluye",
    pick: "Elegir plan",
    hot: "Destacado",
    pl: [
      {
        k: "Ikaslea",
        p: "19,88 €",
        g: "Estudiantes de Formación Profesional",
        l: ["1 currículum", "1 perfil personal", "Búsqueda individual"],
        f: [
          "Crear y actualizar el currículum",
          "Recibir ofertas compatibles",
          "Guardar ofertas",
          "Recomendaciones básicas mediante IA",
        ],
      },
      {
        k: "Irakaslea",
        p: "99,88 €",
        g: "Profesores que gestionan las prácticas de sus alumnos",
        l: ["Gestión de varios alumnos", "Seguimiento de solicitudes"],
        f: [
          "Todas las funciones del plan Ikaslea",
          "Gestión de perfiles de varios alumnos",
          "Organización de ofertas",
          "Seguimiento de procesos",
          "Panel de grupo",
        ],
      },
      {
        k: "Ikastetxea",
        p: "588,88 €",
        g: "Centros de Formación Profesional",
        l: ["Gestión institucional de varios grupos y profesores"],
        f: [
          "Todas las funciones del plan Irakaslea",
          "Gestión de varios grupos",
          "Panel general del centro educativo",
          "Informes de actividad",
          "Coordinación con empresas",
        ],
      },
    ],
    // ---- Formulario de prueba del buscador ----
    trT: "Encuentra las prácticas que mejor encajan contigo",
    trS: "El agente utiliza el currículum, la formación y la zona geográfica para preparar una búsqueda personalizada.",
    cv: "Currículum",
    up: "Sube tu currículum (PDF o DOCX)",
    chg: "Cambiar archivo",
    zn: "Zona geográfica",
    zs: ["Toda Euskadi", "Álava", "Bizkaia", "Gipuzkoa"],
    sd: "¿Qué estás estudiando?",
    lv: ["Formación Profesional", "Grado universitario"],
    sn: "Nombre de los estudios",
    sph: "Ej.: Desarrollo de Aplicaciones Web",
    fp: [
      "Sistemas Microinformáticos y Redes",
      "Desarrollo de Aplicaciones Web",
      "Desarrollo de Aplicaciones Multiplataforma",
      "Administración y Finanzas",
      "Marketing y Publicidad",
      "Electricidad y Electrónica",
    ],
    go: "Buscar prácticas",
    ls: [
      "Analizando el currículum...",
      "Buscando ofertas compatibles...",
      "Preparando el correo personalizado...",
    ],
    na: "Función no disponible de momento",
    nx: "Estamos desarrollando el buscador. Estará listo pronto.",
    sel: "Plan elegido",
    // ---- Blog ----
    blT: "Blog de PRAKTIP",
    blS: "Consejos, guías y novedades para encontrar tu primera experiencia laboral.",
    all: "Todos",
    ps: [
      [
        "Consejos",
        "5 consejos para encontrar prácticas de FP",
        "Empieza pronto, cuida tu perfil y aprovecha tu entorno.",
      ],
      [
        "Currículum",
        "Cómo preparar tu currículum para tu primera experiencia laboral",
        "Estructura clara y tus proyectos: esa es la clave.",
      ],
      [
        "Tecnología",
        "La inteligencia artificial en la búsqueda de empleo",
        "Qué pueden hacer los agentes y dónde poner el límite.",
      ],
      [
        "Educación",
        "La importancia de las prácticas en la formación profesional",
        "Del aula a la empresa: por qué son tan importantes.",
      ],
    ],
    // ---- Login ----
    wl: "Bienvenido de nuevo",
    pw: "Contraseña",
    sh: "Mostrar",
    hd: "Ocultar",
    kp: "Mantener la sesión iniciada",
    fg: "¿Olvidaste tu contraseña?",
    en: "Entrar",
    bk: "Volver al inicio",
    nl: "La autenticación no está disponible en esta versión de demostración.",
    // ---- Aviso del mapa ----
    mh: "Arrastra el mapa. Zoom: Ctrl + rueda o + / −",
    // ---- Landing: «Nuestros ODS» ----
    gjT: "Nuestros objetivos de desarrollo sostenible",
    gjS: "El impacto sostenible de PRAKTIP es sobre todo social y económico. Por eso hemos elegido tres Objetivos de Desarrollo Sostenible (ODS).",
    gjP: "ODS",
    gj: [
      ["Igualdad de género", "Igualdad de oportunidades para acceder a las prácticas y selección sin sesgos de género."],
      ["Trabajo decente y crecimiento económico", "Fomentar prácticas de calidad y ayudar a las empresas a encontrar nuevo talento."],
      ["Reducción de las desigualdades", "Poner el servicio al alcance de todos los estudiantes y centros, atendiendo a su situación y necesidades."],
    ],
    // ---- Landing: «Análisis económico» ----
    ecT: "Análisis económico",
    ecS: "Comparación visual de los resultados hipotéticos del año 1 y el año 2.",
    ecK: "Indicadores principales",
    ecKh: ["Indicador", "Año 1", "Año 2", "Cambio"],
    ecKr: ["Facturación total (€)", "Altas totales", "Bajas totales", "Renovaciones totales", "Clientes activos al cierre"],
    ecP: "Facturación por plan",
    ecPh: ["Plan", "Año 1", "Año 2", "Cambio", "Tasa de renovación"],
    ecTot: "Total",
    ecC1: "Facturación mensual: año 1 vs año 2",
    ecC2: "Reparto de la facturación del año 2 por planes",
    ecC3: "Facturación acumulada en 24 meses",
    y1: "Año 1",
    y2: "Año 2",
    ph: "Fotos: Unsplash y Pexels",
    mo: "M",
    ms: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    ecN: "Las cifras son simuladas: no indican ventas reales ni previsiones verificadas.",
  },
};
/* Testimonios de ejemplo: [nombre, [cargo eu, cargo es], [frase eu, frase es]]. */
const TS = [
  [
    "Maialen U.",
    [
      "Ikaslea, Web Aplikazioen Garapena",
      "Estudiante, Desarrollo de Aplicaciones Web",
    ],
    [
      "Curriculuma igo nuen eta egun gutxitan nire eremuko eskaintzak jaso nituen.",
      "Subí mi currículum y en pocos días recibí ofertas de mi zona.",
    ],
  ],
  [
    "Unai P.",
    [
      "Ikaslea, Sistema Mikroinformatikoak",
      "Estudiante, Sistemas Microinformáticos",
    ],
    [
      "Agenteak idatzitako mezuari esker, enpresa batek erantzun zidan.",
      "Gracias al correo que preparó el agente, una empresa me respondió.",
    ],
  ],
  [
    "Irene A.",
    ["Irakaslea, Administrazioa", "Profesora, Administración"],
    [
      "Nire talde osoaren eskaerak leku bakarrean jarraitzen ditut.",
      "Sigo las solicitudes de todo mi grupo en un solo lugar.",
    ],
  ],
  [
    "Jon L.",
    ["Irakaslea, Elektrizitatea", "Profesor, Electricidad"],
    [
      "Hitzarmenei esker, ikasle guztiek lortu dute plaza.",
      "Gracias a los acuerdos, todo mi alumnado ha conseguido plaza.",
    ],
  ],
  [
    "Zentro adibidea",
    ["Ikastetxea, koordinazioa", "Centro educativo, coordinación"],
    [
      "Txostenek enpresekin koordinatzeko denbora aurrezten digute.",
      "Los informes nos ahorran tiempo al coordinarnos con empresas.",
    ],
  ],
];
/* Sectores: índice usado por CP. [euskera, castellano]. */
const SEC = [
  ["Teknologia", "Tecnología"],
  ["Industria", "Industria"],
  ["Logistika", "Logística"],
  ["Elikagaigintza", "Agroalimentación"],
  ["Osasuna", "Salud"],
  ["Energia", "Energía"],
];
/* Empresas HIPOTÉTICAS que aparecen como marcadores en el mapa real (Leaflet).
   Formato: [latitud, longitud, nombre, localidad, índice de SEC]. Para añadir un punto basta
   con añadir otra fila (coordenadas en grados decimales, p. ej. de Google Maps). */
const CP = [
  [43.357, -3.012, "Itsaso Logistika", "Getxo", 2],
  [43.263, -2.935, "Ibaizabal Labs", "Bilbo", 0],
  [43.296, -2.99, "Nerbioi Metal", "Barakaldo", 1],
  [43.171, -2.634, "Mendi Industria", "Durango", 1],
  [43.317, -2.679, "Urdaibai Foods", "Gernika", 3],
  [43.42, -2.723, "Kantauri Fish", "Bermeo", 3],
  [43.19, -3.193, "Enkarterri Forja", "Balmaseda", 1],
  [43.318, -1.981, "Aldapa Digital", "Donostia", 0],
  [43.339, -1.789, "Bidasoa Trans", "Irun", 2],
  [43.184, -2.472, "Arrate Mekanika", "Eibar", 1],
  [43.135, -2.075, "Leitzaran Salud", "Tolosa", 4],
  [43.283, -2.171, "Orio Energia", "Zarautz", 5],
  [43.065, -2.49, "Debagoiena Tech", "Arrasate", 0],
  [43.083, -2.316, "Urola Lab", "Zumarraga", 4],
  [42.847, -2.673, "Gasteiz Soft", "Gasteiz", 0],
  [43.143, -2.964, "Aiara Logistika", "Laudio", 2],
  [42.553, -2.585, "Rioja Vinos", "Laguardia", 3],
  [42.853, -2.382, "Zadorra Energia", "Agurain", 5],
];
/* Nombres de la marquesina «Nuestra red de empresas» (página Prácticas). */
const COS = [
  "Atlantika Soft",
  "Kantauri Lab",
  "Ibaizabal Trans",
  "Gorbea Energia",
  "Urdaibai Foods",
  "Mendi Salud",
  "Aranzadi Studio",
  "Txori Digital",
  "Arrantza Naval",
  "Lur Ingeniaritza",
];

/* Cifras de la hoja «Azterketa» del Excel PRAKTIP_Eredu_Ekonomikoa (datos simulados).
   - kpi:   [año 1, año 2] de: facturación (€), altas, bajas, renovaciones, clientes activos al cierre
            (suma de Ikaslea + Irakaslea + Ikastetxea).
   - plan:  [nombre del plan, facturación año 1 (€), facturación año 2 (€), tasa de renovación año 2 (0-1)]
   - renTotal: tasa de renovación total del año 2 (0-1).
   - month: facturación mensual (€) de enero a diciembre, para el año 1 y el año 2.
   - cum:   facturación acumulada (€) mes a mes durante los 24 meses. */
const ECO = {
  "kpi": [
    [
      8819.08,
      25796.84
    ],
    [
      216,
      505
    ],
    [
      0,
      53
    ],
    [
      0,
      163
    ],
    [
      216,
      668
    ]
  ],
  "plan": [
    [
      "Ikaslea",
      3777.2,
      11749.08,
      0.7632
    ],
    [
      "Irakaslea",
      2097.48,
      6392.32,
      0.619
    ],
    [
      "Ikastetxea",
      2944.4,
      7655.44,
      1
    ]
  ],
  "renTotal": 0.7546,
  "month": {
    "y1": [
      258.92,
      298.68,
      927.32,
      478.08,
      517.84,
      1146.48,
      298.68,
      258.92,
      1186.24,
      637.12,
      1365.64,
      1445.16
    ],
    "y2": [
      1584.32,
      1174.84,
      2432.12,
      2102.64,
      1493.4,
      2850.56,
      1015.8,
      936.28,
      2969.84,
      2460.48,
      3308.76,
      3467.8
    ]
  },
  "cum": [
    258.92,
    557.6,
    1484.92,
    1963.0,
    2480.84,
    3627.32,
    3926.0,
    4184.92,
    5371.16,
    6008.28,
    7373.92,
    8819.08,
    10403.4,
    11578.24,
    14010.36,
    16113.0,
    17606.4,
    20456.96,
    21472.76,
    22409.04,
    25378.88,
    27839.36,
    31148.12,
    34615.92
  ]
};
