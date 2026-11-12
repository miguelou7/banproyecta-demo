/* ============================================================
   Banproyecta — interacciones (JavaScript puro, sin dependencias)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Configuración ---------- */
  // Tasa REFERENCIAL del simulador (% mensual). Reemplazar por la tasa real antes de publicar.
  var TASA_MENSUAL = 1.4;
  var PLAZOS = [30, 60, 90, 120];

  var PRODUCTOS = [
    { name: 'Factoring', short: 'factoring', kicker: 'EL MÁS USADO',
      desc: 'Convierte tus facturas, cheques o letras por cobrar en liquidez inmediata. Nosotros nos encargamos del seguimiento y la cobranza, con la experiencia de un equipo especializado.',
      ideal: 'Tus clientes pagan a 30, 60 o 90 días y tú necesitas caja hoy para seguir operando.',
      chips: ['Facturas', 'Cheques', 'Letras'],
      note: 'Disponible para empresas y personas naturales con giro.' },
    { name: 'Confirming', short: 'confirming', kicker: 'PARA TUS PROVEEDORES',
      desc: 'Ordena y cumple tus pagos a proveedores en los plazos acordados, mientras ellos acceden a financiamiento oportuno. Una cadena de pago más sana para todos.',
      ideal: 'Quieres cuidar a tus proveedores clave sin tensionar tu propia caja.',
      chips: ['Pagos a proveedores', 'Facturas por pagar'],
      note: 'Producto sujeto a evaluación y para clientes activos.' },
    { name: 'Ordering', short: 'ordering', kicker: 'ANTES DE FACTURAR',
      desc: 'Financiamos un porcentaje de tu orden de compra antes de que entregues el producto o servicio. Cuando emites la factura, esta se financia y cierra el ordering.',
      ideal: 'Ganaste un pedido grande y necesitas capital para producirlo o comprarlo.',
      chips: ['Órdenes de compra', 'Licitaciones adjudicadas'],
      note: 'Producto sujeto a evaluación y para clientes activos.' },
    { name: 'Chequering', short: 'chequering', kicker: 'CHEQUES A FECHA',
      desc: 'Adelantamos el valor de los cheques a plazo que recibes como medio de pago y además los custodiamos por ti hasta su cobro.',
      ideal: 'Tus clientes te pagan con cheques a fecha y no quieres esperar ni guardarlos.',
      chips: ['Cheques a plazo', 'Custodia'],
      note: 'Producto sujeto a evaluación y para clientes activos.' },
    { name: 'Capital de trabajo', short: 'capital', kicker: 'CORTO PLAZO',
      desc: 'Financiamiento de corto plazo para cubrir otras necesidades de liquidez de tu operación, más allá de tus cuentas por cobrar.',
      ideal: 'Necesitas capital para inventario, remuneraciones o un peak de temporada.',
      chips: ['Inventario', 'Remuneraciones', 'Temporadas altas'],
      note: 'Producto sujeto a evaluación y para clientes activos.' }
  ];

  function ejecutivo(nombre, usuario) {
    return { name: nombre, role: 'Ejecutivo/a comercial', href: 'mailto:' + usuario + '@banproyecta.cl', cta: 'Escribir' };
  }
  var CIUDADES = [
    { name: 'Antofagasta', tag: 'NORTE', desc: 'Atendemos a empresas mineras, de servicios y su red de proveedores en la zona norte.',
      people: [ejecutivo('Carlos Pérez F.', 'cperez'), ejecutivo('Isabel Garrido R.', 'igarrido')] },
    { name: 'Viña del Mar', tag: 'V REGIÓN', desc: 'Cercanía con las pymes de la Región de Valparaíso y su actividad portuaria y comercial.',
      people: [ejecutivo('Johanna Petit G.', 'jpetit')] },
    { name: 'Santiago', tag: 'CASA MATRIZ', desc: 'Fidel Oteiza 1971, Oficina 301, Providencia. Nuestra casa matriz y equipo central.',
      people: [{ name: 'Mesa central', initials: 'BP', role: '+56 2 2485 9500', href: 'tel:+56224859500', cta: 'Llamar' }] },
    { name: 'Rancagua', tag: 'VI REGIÓN', desc: 'Apoyamos a empresas agrícolas, agroindustriales y de servicios de O’Higgins.',
      people: [ejecutivo('Andrea Arancibia', 'aarancibia')] },
    { name: 'Concepción', tag: 'VIII REGIÓN', desc: 'Liquidez para la industria, la construcción y el comercio del Biobío.',
      people: [ejecutivo('Karla Gómez F.', 'kgomez')] },
    { name: 'Temuco', tag: 'IX REGIÓN', desc: 'Acompañamos a las empresas de La Araucanía en cada ciclo de su negocio.',
      people: [ejecutivo('Sergio León M.', 'sleon')] },
    { name: 'Puerto Montt', tag: 'SUR', desc: 'Presentes en el sur, junto a la acuicultura, el turismo y sus proveedores.',
      people: [ejecutivo('Ana María Alfaro G.', 'aalfaro')] }
  ];

  var SOCIEDADES = [
    { label: 'Persona natural con giro', legal: ['Cédula de identidad', 'Inicio de actividades'] },
    { label: 'Ltda. / EIRL', legal: ['RUT de la empresa', 'Cédula del representante legal', 'RUT de los socios', 'Escritura de constitución y modificaciones', 'Extracto y publicación en Diario Oficial'] },
    { label: 'Sociedad Anónima', legal: ['RUT de la empresa', 'Cédula del representante legal', 'RUT de los socios', 'Escritura de constitución y modificaciones', 'Extracto y publicación en Diario Oficial', 'Sesión de directorio con designación de poderes'] }
  ];
  var REQ_FIN = ['Balance de los últimos dos años', 'Dos últimas declaraciones de renta', 'IVA de los últimos dos años'];
  var REQ_COM = ['Listado de tus principales clientes a operar', 'Nombre y RUT de cada cliente', 'Facturación promedio mensual'];

  var FAQS = [
    { q: '¿Qué es el factoring y cómo me ayuda?', a: 'Es una forma de obtener liquidez cediendo tus cuentas por cobrar, como facturas, cheques o letras. Recibes hoy el dinero que tu cliente te pagaría en 30, 60 o 90 días.' },
    { q: '¿Cuándo recibo el dinero?', a: 'Abonamos tus fondos el mismo día de la operación, una vez aprobada y cedidos los documentos.' },
    { q: '¿Quién le cobra a mi cliente?', a: 'Nosotros. Nuestro equipo especializado gestiona la cobranza de los documentos, para que tú te concentres en vender.' },
    { q: '¿Qué necesito para empezar?', a: 'Enrólate en línea y ten a mano los antecedentes legales, financieros y comerciales de tu empresa. Un ejecutivo te guiará en el resto.' }
  ];

  /* ---------- Utilidades ---------- */
  var $ = function (sel) { return document.querySelector(sel); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clp(n) { return '$' + Math.round(n).toLocaleString('es-CL'); }
  function initials(name) {
    return name.split(' ').slice(0, 2).map(function (w) { return w.charAt(0); }).join('');
  }
  var ICON_CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path class="s-brand" d="M5 12.5l4.5 4.5L19 7.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_PIN = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path class="s-brand" d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" stroke-width="2"/><circle class="s-brand" cx="12" cy="9.5" r="2.5" stroke-width="2"/></svg>';
  var ICON_PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path class="s-brand" d="M12 5v14M5 12h14" stroke-width="2.2" stroke-linecap="round"/></svg>';

  /* ---------- Estado ---------- */
  var state = { monto: 12000000, dias: 60, prod: 0, city: 2, soc: 1, faq: 0 };

  /* ---------- Simulador ---------- */
  var range = $('#sim-monto');
  function renderPlazos() {
    $('#sim-plazos').innerHTML = PLAZOS.map(function (d) {
      var on = state.dias === d;
      return '<button type="button" class="chip' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-dias="' + d + '">' + d + ' días</button>';
    }).join('');
  }
  function renderSim() {
    var dif = state.monto * (TASA_MENSUAL / 100) * (state.dias / 30);
    $('#sim-monto-out').textContent = clp(state.monto);
    $('#sim-dif').textContent = '− ' + clp(dif);
    $('#sim-neto').textContent = clp(state.monto - dif);
    $('#sim-tasa').textContent = TASA_MENSUAL.toLocaleString('es-CL') + '%';
    range.setAttribute('aria-valuetext', clp(state.monto));
  }
  range.addEventListener('input', function () { state.monto = Number(range.value); renderSim(); });
  $('#sim-plazos').addEventListener('click', function (e) {
    var b = e.target.closest('[data-dias]');
    if (!b) return;
    state.dias = Number(b.dataset.dias);
    renderPlazos(); renderSim();
  });

  /* ---------- Productos ---------- */
  function renderProductos() {
    $('#prod-tabs').innerHTML = PRODUCTOS.map(function (p, i) {
      var on = state.prod === i;
      return '<button type="button" role="tab" class="tab' + (on ? ' on' : '') + '" aria-selected="' + on + '" aria-controls="prod-panel" data-prod="' + i + '">' +
        '<span class="num">0' + (i + 1) + '</span><span class="name">' + esc(p.name) + '</span>' + ICON_CHEV + '</button>';
    }).join('');
    var p = PRODUCTOS[state.prod];
    $('#prod-panel').innerHTML =
      '<div class="bignum mono" aria-hidden="true">0' + (state.prod + 1) + '</div>' +
      '<span class="kicker mono fade">' + esc(p.kicker) + '</span>' +
      '<h3 class="fade">' + esc(p.name) + '</h3>' +
      '<p class="desc fade">' + esc(p.desc) + '</p>' +
      '<div class="mini-grid fade">' +
        '<div class="mini"><span class="eyebrow">IDEAL SI…</span><p>' + esc(p.ideal) + '</p></div>' +
        '<div class="mini"><span class="eyebrow">QUÉ FINANCIA</span><div class="tags">' +
          p.chips.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div></div>' +
      '</div>' +
      '<div class="prod-foot"><span class="note">' + esc(p.note) + '</span>' +
        '<a class="btn btn-dark" href="https://banproyecta.enrolador.cl/">Solicitar ' + esc(p.short) + ' ' + ICON_ARROW + '</a></div>';
  }
  $('#prod-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-prod]');
    if (!b) return;
    state.prod = Number(b.dataset.prod);
    renderProductos();
  });
  // Flechas del teclado en las pestañas
  $('#prod-tabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    var n = PRODUCTOS.length;
    state.prod = (state.prod + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
    renderProductos();
    $('#prod-tabs [data-prod="' + state.prod + '"]').focus();
  });
  // Links del footer abren el producto correspondiente
  document.querySelectorAll('.foot-col [data-prod]').forEach(function (a) {
    a.addEventListener('click', function () { state.prod = Number(a.dataset.prod); renderProductos(); });
  });

  /* ---------- Sucursales ---------- */
  function renderCiudades() {
    $('#ciudades').innerHTML = CIUDADES.map(function (c, i) {
      var on = state.city === i;
      return '<button type="button" class="station' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-city="' + i + '">' +
        '<span class="dot"></span><span>' + esc(c.name) + '</span><span class="zone">' + esc(c.tag) + '</span></button>';
    }).join('');
    var c = CIUDADES[state.city];
    $('#city-card').innerHTML =
      '<div class="city-head fade"><div><span class="eyebrow">' + esc(c.tag) + '</span><h3>' + esc(c.name) + '</h3></div><span class="pin">' + ICON_PIN + '</span></div>' +
      '<p class="desc fade">' + esc(c.desc) + '</p>' +
      '<div class="people fade">' + c.people.map(function (p) {
        return '<div class="person"><span class="avatar">' + esc(p.initials || initials(p.name)) + '</span>' +
          '<div class="who"><b>' + esc(p.name) + '</b><span>' + esc(p.role) + '</span></div>' +
          '<a class="btn btn-ghost" href="' + esc(p.href) + '">' + esc(p.cta) + '</a></div>';
      }).join('') + '</div>';
  }
  $('#ciudades').addEventListener('click', function (e) {
    var b = e.target.closest('[data-city]');
    if (!b) return;
    state.city = Number(b.dataset.city);
    renderCiudades();
    $('#ciudades [data-city="' + state.city + '"]').focus();
  });

  /* ---------- Requisitos ---------- */
  function renderRequisitos() {
    $('#sociedades').innerHTML = SOCIEDADES.map(function (s, i) {
      var on = state.soc === i;
      return '<button type="button" class="seg' + (on ? ' on' : '') + '" aria-pressed="' + on + '" data-soc="' + i + '">' + esc(s.label) + '</button>';
    }).join('');
    var legal = SOCIEDADES[state.soc].legal;
    var cols = [
      { title: 'Antecedentes legales', count: legal.length + ' DOCS', items: legal },
      { title: 'Antecedentes financieros', count: REQ_FIN.length + ' DOCS', items: REQ_FIN },
      { title: 'Antecedentes comerciales', count: REQ_COM.length + ' DATOS', items: REQ_COM }
    ];
    $('#req-grid').innerHTML = cols.map(function (c) {
      return '<div class="card req fade"><div class="req-head"><h3>' + esc(c.title) + '</h3><span class="mono">' + c.count + '</span></div><ul>' +
        c.items.map(function (it) { return '<li><span class="tick">' + ICON_CHECK + '</span>' + esc(it) + '</li>'; }).join('') +
        '</ul></div>';
    }).join('');
  }
  $('#sociedades').addEventListener('click', function (e) {
    var b = e.target.closest('[data-soc]');
    if (!b) return;
    state.soc = Number(b.dataset.soc);
    renderRequisitos();
  });

  /* ---------- FAQ ---------- */
  function renderFaqs() {
    $('#faqs').innerHTML = FAQS.map(function (f, i) {
      var on = state.faq === i;
      return '<div><button type="button" class="faq' + (on ? ' on' : '') + '" aria-expanded="' + on + '" aria-controls="faq-' + i + '" data-faq="' + i + '">' +
        '<span>' + esc(f.q) + '</span><span class="plus">' + ICON_PLUS + '</span></button>' +
        (on ? '<p class="faq-a fade" id="faq-' + i + '">' + esc(f.a) + '</p>' : '') + '</div>';
    }).join('');
  }
  $('#faqs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-faq]');
    if (!b) return;
    var i = Number(b.dataset.faq);
    state.faq = state.faq === i ? -1 : i;
    renderFaqs();
    $('#faqs [data-faq="' + i + '"]').focus();
  });

  /* ---------- Fecha del ticker y año ---------- */
  // Nota: los valores UF / Dólar / UTM son estáticos. En producción, conectarlos a una fuente
  // (por ejemplo la API pública mindicador.cl) y reemplazar los <b> del ticker.
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Animaciones al hacer scroll ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    var target = Number(el.dataset.count);
    if (reduce) { el.textContent = target.toLocaleString('es-CL'); return; }
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('es-CL');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Render inicial ---------- */
  renderPlazos(); renderSim(); renderProductos(); renderCiudades(); renderRequisitos(); renderFaqs();
})();
