# Marquesina Bellavista: aire y humedad

Sitio estático (HTML + CSS + JS, sin paso de build) que presenta los resultados del estudio
de aire y humedad de la marquesina de secado de café. Pensado para GitHub Pages.

- El análisis vive en el repo `airflow-analysis`; este sitio no recalcula nada.
- `./sync_assets.sh` copia las figuras desde `../airflow-analysis/out/` y convierte las
  animaciones de partículas a MP4 (requiere `ffmpeg`). Re-correr cuando cambie una figura.
- Los números de los gráficos propios están en `assets/js/graficos.js`, cada uno con su fuente.
- El orden del menú está en `PAGINAS`, en `assets/js/site.js`.
- Video resumen: poner la URL de Loom en el atributo `data-loom` de `index.html`.

Ver localmente: `python3 -m http.server` en esta carpeta y abrir http://localhost:8000.
