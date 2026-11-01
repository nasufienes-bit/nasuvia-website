// Gemeinsames Verhalten aller Seiten: Menü, Erscheinen beim Scrollen, Weg der Faser, Formulare.
(function(){
  var $ = function(s, w){ return (w || document).querySelector(s); };
  var $$ = function(s, w){ return [].slice.call((w || document).querySelectorAll(s)); };
  var ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navigation
  var nav = $('.nav');
  var rand = function(){ nav && nav.classList.toggle('unten', scrollY > 8); };
  addEventListener('scroll', rand, { passive: true }); rand();
  var burger = $('.nav-burger');
  if (burger) {
    burger.addEventListener('click', function(){
      var offen = document.body.classList.toggle('menu-offen');
      burger.setAttribute('aria-expanded', offen);
    });
    $$('.menu a').forEach(function(a){ a.addEventListener('click', function(){ document.body.classList.remove('menu-offen'); }); });
  }

  // Erscheinen beim Scrollen
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('da'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.zeig').forEach(function(el){ io.observe(el); });
  } else $$('.zeig').forEach(function(el){ el.classList.add('da'); });

  // Weg der Faser: der Schritt in der Bildschirmmitte bestimmt die Szene
  var schritte = $$('.weg-schritt');
  if (schritte.length) {
    var szenen = $$('.szene'), striche = $$('.weg-zaehler i');
    var setze = function(i){
      schritte.forEach(function(s, n){ s.classList.toggle('an', n === i); });
      szenen.forEach(function(s, n){ s.classList.toggle('an', n === i); });
      striche.forEach(function(s, n){ s.classList.toggle('an', n <= i); });
    };
    var wo = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) setze(schritte.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    schritte.forEach(function(s){ wo.observe(s); });
    setze(0);
  }

  // Zähler, die beim Erscheinen hochzählen (data-zahl="20")
  $$('[data-zahl]').forEach(function(el){
    var ziel = +el.getAttribute('data-zahl');
    var los = function(){
      if (ruhig) { el.textContent = ziel; return; }
      var t0 = performance.now();
      (function tick(t){ var p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(ziel * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
    };
    if (!('IntersectionObserver' in window)) return los();
    var o = new IntersectionObserver(function(es){ if (es[0].isIntersecting) { o.disconnect(); los(); } }, { threshold: .5 });
    o.observe(el);
  });

  // Formulare: Pflichtfelder prüfen, abhängige Felder zeigen, per E-Mail an Nasuvia senden
  var ZIEL = 'https://formsubmit.co/ajax/info@nasuvia.ch';
  // Zusätzlich in den Admin-Bereich: Besucher dürfen dort nur eintragen, nicht lesen
  var SB = 'https://dyepnomhidubsfwyorke.supabase.co/rest/v1/anfragen';
  var SB_KEY = 'sb_publishable_zEmC1R5vq234zR6ST7PTmA_uY7Z1-ph';
  window.nasuviaAnfrageSichern = function(art, nr, d){
    return fetch(SB, { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ art: art, nummer: nr, name: d.Name || '', email: d['E-Mail'] || '', telefon: d.Telefon || '', daten: d }) })
      .then(function(r){ return r.ok; }).catch(function(){ return false; });
  };
  var ticket = function(){
    var d = new Date(), z = function(n){ return ('0' + n).slice(-2); };
    return 'NSV-' + String(d.getFullYear()).slice(2) + z(d.getMonth() + 1) + z(d.getDate()) + '-' + (100 + Math.floor(Math.random() * 900));
  };

  $$('form[data-form]').forEach(function(form){
    var inhalt = $('[data-form-inhalt]', form);
    var gewaehlt = function(n){ var e = form.querySelector('[name="' + n + '"]:checked'); return e ? e.value : ''; };

    function abhaengig(){
      $$('[data-wenn]', form).forEach(function(el){
        var t = el.getAttribute('data-wenn').split('='), werte = t[1].split('|');
        el.hidden = werte.indexOf(gewaehlt(t[0])) < 0;
      });
      form.dispatchEvent(new CustomEvent('aenderung'));
    }

    function angaben(){
      var d = {}, gesehen = {};
      [].forEach.call(form.elements, function(e){
        if (!e.name || e.name.charAt(0) === '_' || gesehen[e.name] || e.closest('[hidden]')) return;
        gesehen[e.name] = 1;
        var v;
        if (e.type === 'radio') v = gewaehlt(e.name);
        else if (e.type === 'checkbox') v = $$('[name="' + e.name + '"]:checked', form).map(function(c){ return c.value; }).join(', ');
        else v = String(e.value).trim();
        if (v) d[e.name] = v;
      });
      return d;
    }
    form.angaben = angaben;

    function pruefen(){
      var erstes = null;
      $$('[data-pflicht]', form).forEach(function(f){
        if (f.closest('[hidden]')) return;
        var inp = $('input,textarea,select', f), gut;
        if (f.tagName === 'FIELDSET') gut = !!$('input:checked', f);
        else if (f.hasAttribute('data-email')) gut = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        else gut = inp.value.trim().length > 1;
        f.classList.toggle('fehlt', !gut);
        if (!gut && !erstes) erstes = f;
      });
      var m = $('.meldung', form);
      if (m) m.textContent = erstes ? 'Bitte füllen Sie die rot markierten Angaben noch aus.' : '';
      if (erstes) erstes.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'center' });
      return !erstes;
    }

    function ende(ok, nr){
      inhalt.hidden = true;
      var box = $(ok ? '[data-fertig]' : '[data-fehler]', form);
      box.hidden = false;
      $$('[data-ticket]', box).forEach(function(t){ t.textContent = nr; });
      form.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'start' });
    }

    form.addEventListener('change', function(e){ abhaengig(); var f = e.target.closest('.fehlt'); if (f) f.classList.remove('fehlt'); });
    form.addEventListener('input', function(e){ var f = e.target.closest('.fehlt'); if (f) f.classList.remove('fehlt'); form.dispatchEvent(new CustomEvent('aenderung')); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!pruefen()) return;
      var nr = ticket(), d = angaben();
      if (form.elements._honey && form.elements._honey.value) return ende(true, nr);
      var art = form.getAttribute('data-form');
      var text = 'Nummer: ' + nr + '\n' + Object.keys(d).map(function(k){ return k + ': ' + d[k]; }).join('\n');
      var mail = $('[data-mail]', form);
      if (mail) mail.href = 'mailto:info@nasuvia.ch?subject=' + encodeURIComponent(art + ' ' + nr) + '&body=' + encodeURIComponent(text);
      var knopf = $('[type=submit]', form);
      knopf.classList.add('senden-laeuft');
      var last = Object.assign({ _subject: art + ' ' + nr + (d.Name ? ': ' + d.Name : ''), _template: 'table', _replyto: d['E-Mail'] || '', Nummer: nr }, d);
      var perMail = fetch(ZIEL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(last) })
        .then(function(r){ return r.json(); })
        .then(function(a){ return String(a && a.success) === 'true'; })
        .catch(function(){ return false; });
      // Angekommen ist die Anfrage, wenn sie per E-Mail oder im Admin-Bereich gelandet ist
      Promise.all([perMail, window.nasuviaAnfrageSichern(d.Anliegen ? art + ': ' + d.Anliegen : art, nr, d)])
        .then(function(e){ ende(e[0] || e[1], nr); })
        .then(function(){ knopf.classList.remove('senden-laeuft'); });
    });
    abhaengig();
  });

  // Anfrage-Assistent: Auswahl setzt das Anliegen und öffnet das passende Formular
  var weiche = $('.weiche[data-ziel]');
  if (weiche) {
    var ziel = $(weiche.getAttribute('data-ziel'));
    var waehle = function(knopf, scrollen){
      $$('button', weiche).forEach(function(b){ b.classList.toggle('gewaehlt', b === knopf); b.setAttribute('aria-pressed', b === knopf); });
      var feld = ziel.querySelector('[name="Anliegen"]');
      feld.value = knopf.getAttribute('data-anliegen');
      $$('[data-fuer]', ziel).forEach(function(el){ el.hidden = el.getAttribute('data-fuer').split('|').indexOf(feld.value) < 0; });
      ziel.closest('[data-assistent]').hidden = false;
      if (scrollen) ziel.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'start' });
    };
    $$('button', weiche).forEach(function(b){ b.addEventListener('click', function(){ waehle(b, true); }); });
    var vorwahl = (location.hash.match(/^#anfrage-(\w+)/) || [])[1];
    if (vorwahl) { var b = $('button[data-kurz="' + vorwahl + '"]', weiche); if (b) setTimeout(function(){ waehle(b, true); }, 350); }
  }
})();
