/* Datos de los gráficos propios. Cada número sale textual de un documento del repo de
   análisis (se indica cuál). Si un documento cambia, actualizar aquí a mano. */
(() => {
  const AZUL = "#2F6FA8", CEREZA = "#B0413E", GRIS = "#7C8A82";
  const t = (cab, filas) =>
    `<div class="tabla-wrap"><table><thead><tr>${cab.map((h, i) => `<th${i ? ' class="n"' : ""}>${h}</th>`).join("")}</tr></thead><tbody>${
      filas.map(f => `<tr>${f.map((c, i) => `<td${i ? ' class="n"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

  window.GRAFICOS = {
    // docs/findings_and_rationale.md — "Findings: wet-coffee", fase de ascenso
    "cafe-ascenso": {
      titulo: "Cuánto subió la humedad en los primeros 5 días con café",
      sub: "Puntos de humedad relativa que subió cada sitio más que la línea 5 (extremo Ventana O), que es la referencia.",
      unidad: "puntos de HR",
      series: [{ k: "v", nombre: "Subida", color: AZUL }],
      dominio: [0, 10], ticks: [0, 2, 4, 6, 8, 10], signo: true, anchoEtiqueta: 250,
      filas: [
        { etiqueta: "Junto al café, centro del ancho", v: 8.8 },
        { etiqueta: "Junto al café, lado ventanas", v: 9.4 },
        { etiqueta: "Resto de la nave, hasta ~9 m", rango: [2, 4], tip: "Casi todos los sensores: entre +2 y +4 puntos, sin bajar con la distancia" },
        { etiqueta: "Línea 5, extremo Ventana O", v: 0, textoValor: "0 · es la referencia", tip: "Es la referencia: los demás se miden contra ella, así que su valor es 0 por definición" },
      ],
      tabla: t(["Sitio", "Subida (puntos de HR)"], [
        ["Junto al café, centro del ancho (sensor 303)", "+8,8"],
        ["Junto al café, lado ventanas (sensor 305)", "+9,4"],
        ["Resto de la nave, hasta ~9 m del café", "+2 a +4"],
        ["Línea 5, extremo Ventana O (referencia)", "0"],
      ]),
    },

    // findings.md #12
    "ah-horas": {
      titulo: "Cuánta agua gana o pierde el aire en una hora",
      sub: "Gramos de agua por metro cúbico, ganados (+) o perdidos (−) en esa hora del día. Promedio de todos los días.",
      unidad: "g/m³ en esa hora",
      series: [{ k: "in", nombre: "Adentro de la nave", color: AZUL }, { k: "out", nombre: "Afuera", color: GRIS }],
      dominio: [-0.4, 1.4], ticks: [-0.4, 0, 0.4, 0.8, 1.2], decTicks: 1, dec: 2, signo: true, anchoEtiqueta: 150,
      filas: [
        { etiqueta: "7 de la mañana", valores: { in: 1.23, out: 0.65 } },
        { etiqueta: "8 de la mañana", valores: { in: 0.70, out: 0.20 } },
        { etiqueta: "6 de la tarde", valores: { in: -0.16, out: 0.48 } },
      ],
      tabla: t(["Hora", "Adentro (g/m³)", "Afuera (g/m³)"], [
        ["7 h", "+1,23", "+0,65"], ["8 h", "+0,70", "+0,20"], ["18 h", "−0,16", "+0,48"],
      ]),
    },

    // findings.md #12
    "ah-noche": {
      titulo: "Toda la noche, de 6 de la tarde a 5 de la mañana",
      sub: "Gramos de agua por metro cúbico ganados o perdidos en total durante la noche.",
      unidad: "g/m³ en la noche",
      series: [{ k: "v", nombre: "Total", color: AZUL }],
      dominio: [-1.4, 0.4], ticks: [-1.2, -0.8, -0.4, 0, 0.4], decTicks: 1, dec: 2, signo: true, anchoEtiqueta: 150,
      filas: [
        { etiqueta: "Adentro", v: -1.19 },
        { etiqueta: "Afuera", v: 0.17 },
      ],
      tabla: t(["", "Total de la noche (g/m³)"], [["Adentro", "−1,19"], ["Afuera", "+0,17"], ["Diferencia propia de la nave", "−1,35"]]),
    },

    // docs/track_b_coffee_map_findings.md §3
    "modelo-velocidad": {
      titulo: "Velocidad del aire en el tercio sureste, a las 11:00",
      sub: "Centímetros por segundo, promedio en cada franja de altura. Compare las barras entre sí: los valores absolutos son inciertos (hasta el doble o la mitad).",
      unidad: "cm/s",
      series: [{ k: "sin", nombre: "Sin café", color: AZUL }, { k: "con", nombre: "Con café", color: CEREZA }],
      dominio: [0, 8], ticks: [0, 2, 4, 6, 8], anchoEtiqueta: 170,
      filas: [
        { etiqueta: "Del piso a la cama baja", valores: { sin: 7.1, con: 5.0 } },
        { etiqueta: "Entre las camas", valores: { sin: 4.1, con: 2.3 } },
        { etiqueta: "Encima de la cama alta", valores: { sin: 6.5, con: 4.1 } },
      ],
      tabla: t(["Franja", "Sin café (cm/s)", "Con café (cm/s)"], [
        ["Piso → cama 0,55 m", "7,1", "5,0"], ["Entre camas", "4,1", "2,3"], ["Encima de la cama alta", "6,5", "4,1"],
        ["(Tercio noroeste, para comparar: piso / entre camas / encima)", "7,6 · 4,9 · 6,4", "7,3 · 4,7 · 6,5"],
      ]),
    },

    // docs/track_b_coffee_map_findings.md §4
    "modelo-humedad-no": {
      tipo: "lineas",
      titulo: "Qué parte de la humedad del café llega a la mitad noroeste",
      sub: "Porcentaje del total que está en la mitad NO de la nave, horas después de empezar a salir del café. Corte del centro del ancho.",
      dominioX: [0, 250], dominioY: [0, 55],
      ticksX: [{ v: 15, l: "15 min" }, { v: 60, l: "1 h" }, { v: 120, l: "2 h" }, { v: 240, l: "4 h" }],
      ticksY: [0, 10, 20, 30, 40, 50],
      ref: { v: 50, etiqueta: "reparto parejo (50 %)" },
      series: [
        { nombre: "Con café", color: CEREZA, dy: 6, puntos: [[15, 9, "15 min"], [60, 23, "1 h"], [120, 32, "2 h"], [240, 38, "4 h"]] },
        { nombre: "Sin café (marcador)", color: AZUL, dy: -8, puntos: [[15, 16, "15 min"], [60, 27, "1 h"], [120, 34, "2 h"], [240, 39, "4 h"]] },
      ],
      tabla: t(["Tiempo", "Con café", "Sin café (marcador)"], [
        ["15 min", "9 %", "16 %"], ["1 h", "23 %", "27 %"], ["2 h", "32 %", "34 %"], ["4 h", "38 %", "39 %"], ["con el tiempo tiende a", "~41 %", "~41 %"],
      ]),
    },

    // docs/track_b_coffee_map_findings.md §7
    "modelo-cortes": {
      titulo: "Cuánto se frena el aire del extremo sureste en días de café",
      sub: "Porcentaje de reducción de la velocidad en el tercio SE, en los tres cortes. La línea fina muestra el rango cuando se cambian los supuestos del modelo.",
      unidad: "% más lento",
      series: [{ k: "v", nombre: "Frenado", color: CEREZA }],
      dominio: [0, 70], ticks: [0, 10, 20, 30, 40, 50, 60, 70], dec: 0, anchoEtiqueta: 220,
      filas: [
        { etiqueta: "Lado puertas (NE), sin café en el corte", v: 27, bigote: [19, 40], textoValor: "27 %", tip: "27 %. Rango al cambiar supuestos: 19–40 %" },
        { etiqueta: "Centro del ancho", v: 37, bigote: [26, 61], textoValor: "37 %", tip: "37 %. Rango al cambiar supuestos: 26–61 %" },
        { etiqueta: "Lado ventanas (SO)", v: 45, bigote: [21, 65], textoValor: "45 %", tip: "45 %. Rango al cambiar supuestos: 21–65 %" },
      ],
      tabla: t(["Corte", "Frenado", "Solo por la temperatura", "Solo por el bloqueo del café", "Rango (supuestos)"], [
        ["x = 0,70 m (lado NE)", "27 %", "27 %", "0 %", "19–40 %"],
        ["x = 2,20 m (centro)", "37 %", "27 %", "11 %", "26–61 %"],
        ["x = 3,55 m (lado SO)", "45 %", "39 %", "14 %", "21–65 %"],
      ]),
    },
  };
})();
