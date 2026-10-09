/* Marquesina Bellavista — componentes compartidos (sin dependencias, sin paso de build).
   - menú y paginador (la lista PAGINAS es el único lugar donde se define el orden)
   - plano de la nave (SVG generado desde la geometría real de config.yaml / config.json)
   - visor ampliado de figuras, pestañas, videos, gráficos propios en español
*/
(() => {
  "use strict";

  const PAGINAS = [
    { href: "index.html", titulo: "Inicio" },
    { href: "la-nave.html", titulo: "La nave" },
    { href: "cafe-humedo.html", titulo: "Café húmedo" },
    { href: "ventiladores.html", titulo: "Pruebas de ventilador" },
    { href: "humedad-diaria.html", titulo: "Ciclo diario" },
    { href: "modelo.html", titulo: "El modelo" },
    { href: "finca.html", titulo: "Para la finca" },
    { href: "proximos-pasos.html", titulo: "Próximos pasos" },
  ];

  const actual = (location.pathname.split("/").pop() || "index.html");

  /* ---------------- cabecera, menú y paginador ---------------- */
  function cabecera() {
    const head = document.querySelector("[data-site-head]");
    if (!head) return;
    head.classList.add("site-head");
    const items = PAGINAS.map(p =>
      `<li><a href="${p.href}"${p.href === actual ? ' aria-current="page"' : ""}>${p.titulo}</a></li>`).join("");
    head.innerHTML = `
      <div class="inner">
        <a class="brand" href="index.html">Marquesina Bellavista<small>Aire y humedad en el secado de café</small></a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="menu">Menú</button>
        <nav class="site-nav" id="menu" aria-label="Secciones"><ol>${items}</ol></nav>
      </div>`;
    const btn = head.querySelector(".nav-toggle");
    const nav = head.querySelector(".site-nav");
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  function paginador() {
    const el = document.querySelector("[data-pager]");
    if (!el) return;
    const i = PAGINAS.findIndex(p => p.href === actual);
    const prev = PAGINAS[i - 1], next = PAGINAS[i + 1];
    el.classList.add("pager");
    el.setAttribute("aria-label", "Recorrido");
    el.innerHTML =
      (prev ? `<a class="prev" href="${prev.href}"><small>← Anterior</small><span>${prev.titulo}</span></a>` : "") +
      (next ? `<a class="next" href="${next.href}"><small>Siguiente →</small><span>${next.titulo}</span></a>` : "");
  }

  /* ---------------- plano de la nave ----------------
     Coordenadas en cm, como en los datos: y = largo (0 = extremo SE, 1700 = extremo NO),
     x = ancho (0 = pared NE con las puertas, 440 = pared SO con las ventanas).
     En pantalla: y hacia la derecha, x hacia arriba (pared NE abajo), igual que las figuras. */
  const G = {
    largo: 1700, ancho: 440,
    puertas: [{ n: "Puerta S", y: [20, 105] }, { n: "Puerta N", y: [1595, 1680] }],
    ventanas: [{ n: "Ventana E", y: [310, 510] }, { n: "Ventana O", y: [1120, 1320] }],
    lineasY: [280, 540, 800, 1100, 1340],
    columnasX: [70, 204, 355],
    externos: [280, 800, 1340],
    muertos: [[1340, 204], [1340, 355]],            // 5-2 y 5-3 (findings.md #10)
    cafe: { y: [87, 313], x: [128.5, 430.5], div: 279.5 },
    ventiladores: [{ n: "Frente", y: 50, x: 204 }, { n: "Fondo", y: 1680, x: 204 }, { n: "Lateral", y: 820, x: 30 }],
    cortes: [70, 220, 355],
  };
  const sx = y => y;
  const sy = x => G.ancho - x;

  const ZONAS = {
    cafe:    { letra: "A", rect: [G.cafe.y[0], G.cafe.y[1], G.cafe.x[0], G.cafe.x[1]], m: [190, 235], forma: "ninguna" },
    rincon:  { letra: "B", rect: [87, 313, 279.5, 440], m: [372, 85] },
    division:{ letra: "C", rect: [850, 970, 0, 440], m: [910, 300], forma: "banda" },
    linea5:  { letra: "D", rect: [1255, 1425, 0, 440], m: [1470, 300] },
  };

  function plano(fig) {
    const capas = new Set((fig.dataset.plano || "").split(/\s+/).filter(Boolean));
    const enlaces = fig.dataset.enlaces ? JSON.parse(fig.dataset.enlaces) : {};
    const t = [];
    t.push(`<defs><marker id="flecha-sol" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#E39A12"/></marker></defs>`);

    t.push(`<rect class="shed" x="0" y="0" width="${G.largo}" height="${G.ancho}" rx="4"/>`);
    if (capas.has("division")) {
      const z = ZONAS.division.rect;
      t.push(`<rect class="split" x="${sx(z[0])}" y="3" width="${z[1] - z[0]}" height="${G.ancho - 6}"/>`);
    }

    if (capas.has("cafe")) {
      const c = G.cafe;
      t.push(`<rect class="coffee" x="${sx(c.y[0])}" y="${sy(c.x[1])}" width="${c.y[1] - c.y[0]}" height="${c.x[1] - c.x[0]}"/>`);
      t.push(`<line stroke="#DF1B41" stroke-width="3" stroke-dasharray="8 6" x1="${sx(c.y[0])}" x2="${sx(c.y[1])}" y1="${sy(c.div)}" y2="${sy(c.div)}"/>`);
      t.push(`<text class="coffee-label" x="${sx(c.y[0]) + 10}" y="${sy(c.x[0]) - 14}">café</text>`);
    }
    if (capas.has("cortes")) {
      for (const x of G.cortes) {
        t.push(`<line class="cut" x1="0" x2="${G.largo}" y1="${sy(x)}" y2="${sy(x)}"/>`);
      }
    }
    // aberturas
    for (const p of G.puertas) {
      t.push(`<line class="door" x1="${sx(p.y[0])}" x2="${sx(p.y[1])}" y1="${G.ancho}" y2="${G.ancho}"/>`);
      t.push(`<text class="op-label" text-anchor="middle" x="${sx((p.y[0] + p.y[1]) / 2)}" y="${G.ancho + 48}">${p.n}</text>`);
    }
    for (const v of G.ventanas) {
      t.push(`<line class="window" x1="${sx(v.y[0])}" x2="${sx(v.y[1])}" y1="0" y2="0"/>`);
      t.push(`<text class="op-label" text-anchor="middle" x="${sx((v.y[0] + v.y[1]) / 2)}" y="-62">${v.n}</text>`);
    }
    // sensores
    const muerto = (y, x) => capas.has("muertos") && G.muertos.some(m => m[0] === y && m[1] === x);
    G.lineasY.forEach((y, i) => {
      t.push(`<text class="line-label" text-anchor="middle" x="${sx(y)}" y="-22">L${i + 1}</text>`);
      for (const x of G.columnasX) {
        t.push(`<circle class="${muerto(y, x) ? "sensor sensor--muerto" : "sensor"}" cx="${sx(y)}" cy="${sy(x)}" r="13"/>`);
      }
    });
    if (capas.has("externos")) {
      for (const y of G.externos) {
        t.push(`<rect class="sensor--ext" x="${sx(y) - 13}" y="${sy(-100) - 13}" width="26" height="26" rx="3"/>`);
      }
      t.push(`<text class="wall-label" text-anchor="middle" x="${sx(810)}" y="${sy(-100) + 52}">sensores externos (afuera, bajo cubierta)</text>`);
    }
    if (capas.has("ventiladores")) {
      for (const f of G.ventiladores) {
        t.push(`<path class="fan" transform="translate(${sx(f.y)} ${sy(f.x)})" d="${estrella(30, 13)}"/>`);
        const dx = f.y > 1600 ? -40 : 40, anchor = f.y > 1600 ? "end" : "start";
        t.push(`<text class="fan-label" text-anchor="${anchor}" x="${sx(f.y) + dx}" y="${sy(f.x) + 10}">${f.n}</text>`);
      }
    }
    // paredes y extremos
    t.push(`<text class="wall-label" text-anchor="middle" x="${G.largo / 2}" y="${G.ancho + 48}">Pared NE · puertas</text>`);
    t.push(`<text class="wall-label" text-anchor="middle" x="${G.largo / 2}" y="-62">Pared SO · ventanas</text>`);
    t.push(`<text class="end-label" text-anchor="middle" transform="translate(-48 ${G.ancho / 2}) rotate(-90)">Extremo SE</text>`);
    t.push(`<text class="end-label" text-anchor="middle" transform="translate(${G.largo + 48} ${G.ancho / 2}) rotate(90)">Extremo NO</text>`);

    if (capas.has("sol")) {
      t.push(`<path class="sun-arrow" d="M -150 640 L -30 470"/>`);
      t.push(`<text class="sun" x="-160" y="690">sol de mañana</text>`);
      t.push(`<path class="sun-arrow" d="M 1860 -150 L 1735 -20"/>`);
      t.push(`<text class="sun" text-anchor="end" x="1870" y="-170">sol de tarde</text>`);
    }

    // zonas con letra
    for (const [k, z] of Object.entries(ZONAS)) {
      if (!capas.has(k)) continue;
      const [y0, y1, x0, x1] = z.rect;
      let g = "";
      if (!z.forma) g += `<rect class="zona-fill" x="${sx(y0)}" y="${sy(x1)}" width="${y1 - y0}" height="${x1 - x0}"/><rect class="zona" x="${sx(y0)}" y="${sy(x1)}" width="${y1 - y0}" height="${x1 - x0}" rx="6"/>`;
      g += `<circle cx="${z.m[0]}" cy="${z.m[1]}" r="27" fill="#0A2540"/><text x="${z.m[0]}" y="${z.m[1] + 10}" text-anchor="middle" style="font:600 30px var(--f-display);fill:#fff">${z.letra}</text>`;
      if (enlaces[k]) {
        g = `<a href="${enlaces[k].href}" aria-label="${enlaces[k].label}"><rect class="hit" x="${sx(y0)}" y="${sy(x1)}" width="${y1 - y0}" height="${x1 - x0}"/>${g}</a>`;
      }
      t.push(g);
    }

    // brújula: el eje y apunta a 312° (NO); el norte queda 48° por debajo de la derecha
    const cx = 1800, cy = 560, a = 48 * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a);
    t.push(`<line class="compass" x1="${cx - ux * 34}" y1="${cy - uy * 34}" x2="${cx + ux * 40}" y2="${cy + uy * 40}" marker-end="url(#flecha-n)"/>`);
    t.push(`<defs><marker id="flecha-n" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#0A2540"/></marker></defs>`);
    t.push(`<text class="compass-n" text-anchor="middle" x="${cx + ux * 68}" y="${cy + uy * 68 + 10}">N</text>`);

    const titulo = fig.dataset.titulo || "Plano de la marquesina visto desde arriba";
    const svg = `<svg viewBox="-200 -200 2090 920" role="img" aria-label="${titulo}">${t.join("")}</svg>`;
    const wrap = document.createElement("div");
    wrap.className = "plano-scroll";
    wrap.innerHTML = svg;
    fig.prepend(wrap);
  }

  function estrella(R, r) {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R;
      p.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`);
    }
    return "M" + p.join(" L") + " Z";
  }

  /* ---------------- visor ampliado ---------------- */
  function visor() {
    const imgs = document.querySelectorAll(".fig-frame img");
    if (!imgs.length) return;
    const dlg = document.createElement("dialog");
    dlg.className = "visor";
    dlg.innerHTML = `<div class="visor-bar"><button data-grande>Tamaño real</button><button data-cerrar>Cerrar ✕</button></div><div class="visor-scroll"><img alt=""></div>`;
    document.body.append(dlg);
    const big = dlg.querySelector("img");
    dlg.querySelector("[data-cerrar]").addEventListener("click", () => dlg.close());
    dlg.querySelector("[data-grande]").addEventListener("click", () => dlg.classList.toggle("grande"));
    dlg.addEventListener("click", e => { if (e.target.classList.contains("visor-scroll")) dlg.close(); });
    imgs.forEach(img => {
      img.tabIndex = 0;
      const frame = img.closest(".fig-frame");
      if (frame && !frame.querySelector(".zoom-hint")) {
        frame.insertAdjacentHTML("beforeend", `<span class="zoom-hint" aria-hidden="true">Toque para ampliar</span>`);
      }
      const open = () => { big.src = img.src; big.alt = img.alt; dlg.classList.remove("grande"); dlg.showModal(); };
      img.addEventListener("click", open);
      img.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  /* ---------------- pestañas ---------------- */
  function pestanas() {
    document.querySelectorAll(".tabs").forEach(list => {
      list.setAttribute("role", "tablist");
      const btns = [...list.querySelectorAll("button")];
      const select = b => {
        btns.forEach(x => {
          const on = x === b;
          x.setAttribute("aria-selected", String(on));
          x.tabIndex = on ? 0 : -1;
          const panel = document.getElementById(x.getAttribute("aria-controls"));
          panel.hidden = !on;
          if (on) {
            panel.querySelectorAll("iframe[data-src]").forEach(f => { f.src = f.dataset.src; f.removeAttribute("data-src"); });
            panel.querySelectorAll("video").forEach(v => { if (!reduce) v.play().catch(() => {}); });
          } else {
            panel.querySelectorAll("video").forEach(v => v.pause());
          }
        });
      };
      btns.forEach((b, i) => {
        b.setAttribute("role", "tab");
        b.addEventListener("click", () => select(b));
        b.addEventListener("keydown", e => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) { const n = btns[(i + d + btns.length) % btns.length]; n.focus(); select(n); }
        });
      });
      select(btns.find(b => b.getAttribute("aria-selected") === "true") || btns[0]);
    });
  }

  /* ---------------- videos: respetar "reducir movimiento" ---------------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function videos() {
    document.querySelectorAll("video").forEach(v => {
      v.muted = true;
      if (reduce) { v.removeAttribute("autoplay"); v.pause(); }
    });
  }

  /* ---------------- Loom ---------------- */
  function loom() {
    document.querySelectorAll("[data-loom]").forEach(el => {
      const url = (el.dataset.loom || "").trim();
      if (!url) return;
      const embed = url.replace("/share/", "/embed/");
      el.hidden = false;
      el.innerHTML = `<div class="loom-frame"><iframe src="${embed}" allowfullscreen title="Video resumen"></iframe></div>`;
    });
  }

  /* ---------------- gráficos propios ---------------- */
  const tip = document.createElement("div");
  tip.className = "chart-tip";
  tip.hidden = true;
  const fmt = (v, d = 1) => v.toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d });

  function conTip(svg) {
    svg.addEventListener("pointermove", e => {
      const t = e.target.closest("[data-tip]");
      if (!t) { tip.hidden = true; return; }
      tip.innerHTML = t.dataset.tip;
      tip.hidden = false;
      const w = tip.offsetWidth;
      tip.style.left = Math.min(e.clientX + 14, innerWidth - w - 8) + "px";
      tip.style.top = (e.clientY + 14) + "px";
    });
    svg.addEventListener("pointerleave", () => { tip.hidden = true; });
  }

  // Barras horizontales: una o varias series; soporta negativos, rangos y bigotes.
  function barras(el, c) {
    const W = 700, L = c.anchoEtiqueta || 210, R = 70, plotW = W - L - R;
    const series = c.series;
    const bh = 18, gapS = 4, gapR = 18;
    const rowH = series.length * bh + (series.length - 1) * gapS;
    const top = 8, H = top + c.filas.length * (rowH + gapR) + 26;
    const [d0, d1] = c.dominio;
    const X = v => L + (v - d0) / (d1 - d0) * plotW;
    const s = [];
    // rejilla
    for (const v of c.ticks) {
      s.push(`<g class="grid"><line x1="${X(v)}" x2="${X(v)}" y1="${top - 4}" y2="${H - 22}"/></g>`);
      s.push(`<text class="tick" text-anchor="middle" x="${X(v)}" y="${H - 6}">${fmt(v, c.decTicks ?? 0)}</text>`);
    }
    if (d0 < 0) s.push(`<line class="zero" x1="${X(0)}" x2="${X(0)}" y1="${top - 4}" y2="${H - 22}"/>`);
    if (c.ref) {
      s.push(`<line class="ref" x1="${X(c.ref.v)}" x2="${X(c.ref.v)}" y1="${top - 4}" y2="${H - 22}"/>`);
    }
    c.filas.forEach((f, i) => {
      const y0 = top + i * (rowH + gapR);
      s.push(`<text class="cat" x="${L - 12}" y="${y0 + rowH / 2 + 5}" text-anchor="end">${f.etiqueta}</text>`);
      series.forEach((se, j) => {
        const y = y0 + j * (bh + gapS);
        const v = f.valores ? f.valores[se.k] : f.v;
        const tipTxt = `<b>${f.etiqueta}</b>${series.length > 1 ? " · " + se.nombre : ""}<br>${f.tip || (v == null ? "" : fmt(v, c.dec ?? 1) + " " + c.unidad)}`;
        if (f.rango) {
          const [a, b] = f.rango;
          s.push(`<rect x="${X(a)}" y="${y}" width="${X(b) - X(a)}" height="${bh}" rx="4" fill="${se.color}" opacity="0.55"/>`);
          s.push(`<text class="val" x="${X(b) + 6}" y="${y + bh / 2 + 4}">${fmt(a, c.dec ?? 0)} a ${fmt(b, c.dec ?? 0)}</text>`);
          s.push(`<rect class="hit" data-tip="${tipTxt}" x="${L}" y="${y - 3}" width="${plotW}" height="${bh + 6}"/>`);
          return;
        }
        if (v == null) return;
        const x0 = X(Math.max(0, d0)), x1 = X(v);
        const xa = Math.min(x0, x1), w = Math.max(Math.abs(x1 - x0), v === 0 ? 0 : 2);
        if (v === 0) {
          s.push(`<line x1="${x0}" x2="${x0}" y1="${y}" y2="${y + bh}" stroke="${se.color}" stroke-width="3"/>`);
        } else {
          s.push(`<rect x="${xa}" y="${y}" width="${w}" height="${bh}" rx="4" fill="${se.color}"/>`);
        }
        if (f.bigote) {
          const [a, b] = f.bigote;
          s.push(`<line x1="${X(a)}" x2="${X(b)}" y1="${y + bh / 2}" y2="${y + bh / 2}" stroke="#0A2540" stroke-width="1.5"/>`);
          s.push(`<line x1="${X(a)}" x2="${X(a)}" y1="${y + 4}" y2="${y + bh - 4}" stroke="#0A2540" stroke-width="1.5"/>`);
          s.push(`<line x1="${X(b)}" x2="${X(b)}" y1="${y + 4}" y2="${y + bh - 4}" stroke="#0A2540" stroke-width="1.5"/>`);
        }
        const lx = v < 0 ? xa - 6 : Math.max(x1, f.bigote ? X(f.bigote[1]) : x1) + 6;
        const txt = f.textoValor ?? ((v > 0 && c.signo ? "+" : "") + fmt(v, c.dec ?? 1));
        s.push(`<text class="val" x="${lx}" y="${y + bh / 2 + 4}" text-anchor="${v < 0 ? "end" : "start"}">${txt}</text>`);
        s.push(`<rect class="hit" data-tip="${tipTxt}" x="${L}" y="${y - 3}" width="${plotW + R}" height="${bh + 6}"/>`);
      });
    });
    if (c.ref) {
      s.push(`<text class="ref-label" x="${X(c.ref.v) + 5}" y="${top + 6}">${c.ref.etiqueta}</text>`);
    }
    montar(el, c, `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${c.titulo}">${s.join("")}</svg>`);
  }

  // Línea: x en minutos, varias series, línea de referencia horizontal.
  function lineas(el, c) {
    const W = 700, L = 48, R = 150, T = 14, B = 34, H = 300;
    const pw = W - L - R, ph = H - T - B;
    const [x0, x1] = c.dominioX, [y0, y1] = c.dominioY;
    const X = v => L + (v - x0) / (x1 - x0) * pw;
    const Y = v => T + (1 - (v - y0) / (y1 - y0)) * ph;
    const s = [];
    for (const v of c.ticksY) {
      s.push(`<g class="grid"><line x1="${L}" x2="${L + pw}" y1="${Y(v)}" y2="${Y(v)}"/></g><text class="tick" x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${v}%</text>`);
    }
    for (const t of c.ticksX) {
      s.push(`<text class="tick" x="${X(t.v)}" y="${H - 12}" text-anchor="middle">${t.l}</text>`);
    }
    if (c.ref) {
      s.push(`<line class="ref" x1="${L}" x2="${L + pw}" y1="${Y(c.ref.v)}" y2="${Y(c.ref.v)}"/>`);
      s.push(`<text class="ref-label" x="${L + pw + 8}" y="${Y(c.ref.v) + 4}">${c.ref.etiqueta}</text>`);
    }
    for (const se of c.series) {
      const pts = se.puntos.map(p => `${X(p[0])},${Y(p[1])}`).join(" ");
      s.push(`<polyline points="${pts}" fill="none" stroke="${se.color}" stroke-width="2.5" stroke-linejoin="round"/>`);
      for (const p of se.puntos) {
        s.push(`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="${se.color}" stroke="#fff" stroke-width="2"/>`);
        s.push(`<circle class="hit" data-tip="<b>${se.nombre}</b><br>${p[2]}: ${p[1]} % en la mitad NO" cx="${X(p[0])}" cy="${Y(p[1])}" r="14"/>`);
      }
      const last = se.puntos[se.puntos.length - 1];
      s.push(`<text class="val" x="${X(last[0]) + 10}" y="${Y(last[1]) + (se.dy || 0) + 4}">${se.nombre} · ${last[1]} %</text>`);
    }
    montar(el, c, `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${c.titulo}">${s.join("")}</svg>`);
  }

  function montar(el, c, svg) {
    const ley = c.series.length > 1
      ? `<div class="legend">${c.series.map(s => `<span><i style="background:${s.color}"></i>${s.nombre}</span>`).join("")}</div>` : "";
    el.innerHTML = `<h3>${c.titulo}</h3>${c.sub ? `<p class="chart-sub">${c.sub}</p>` : ""}${ley}${svg}
      <details class="tecnico" style="margin-top:.6rem"><summary>Ver los números como tabla</summary><div class="body">${c.tabla}</div></details>`;
    conTip(el.querySelector("svg"));
  }

  /* ---------------- arranque ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.body.append(tip);
    cabecera();
    paginador();
    document.querySelectorAll("figure.plano").forEach(plano);
    visor();
    videos();
    pestanas();
    loom();
    const CH = window.GRAFICOS || {};
    document.querySelectorAll("[data-grafico]").forEach(el => {
      const c = CH[el.dataset.grafico];
      if (!c) return;
      (c.tipo === "lineas" ? lineas : barras)(el, c);
    });
  });
})();
