#!/usr/bin/env bash
# Copia las figuras del repo de análisis a este sitio.
# Re-correr cada vez que se regenere una figura en airflow-analysis/out/ (ver su lineage.md).
# Nunca copia data/ ni la base de datos: solo figuras ya publicables.
set -euo pipefail

SRC="${AIRFLOW_ANALYSIS:-$HOME/code/airflow-analysis}/out"
HERE="$(cd "$(dirname "$0")" && pwd)"
A="$HERE/assets/fig/sensores"
B="$HERE/assets/fig/modelo"
I="$HERE/assets/interactivo"

# Track A: sensores
for f in external_humidity_halfhour_overlay.png forced_air_spatial_map.png \
         post_fan_decay_magnitude.png wet_coffee_zone_differential.png \
         wet_coffee_rise_map.png wet_coffee_decay_map.png; do
  cp "$SRC/track_a/$f" "$A/$f"
done

# Track A: vistas interactivas de humedad absoluta (Plotly por CDN, autocontenidas)
for f in absolute_humidity_hod_table.html absolute_humidity_3d_map.html \
         absolute_humidity_line_stacks.html; do
  cp "$SRC/track_a/$f" "$I/$f"
done

# Track B: modelo
for f in hod_sun_vs_observed.png hod_excess_heatmap.png hod_spatial_rho_by_hour.png \
         hod_slice_1100_map.png domain_check.png coffee_map_coffee.png \
         coffee_map_no_coffee.png coffee_map_compare.png slices_comparison.png \
         sensitivity_summary.png anim_moisture_4h.gif anim_moisture_4h_x355.gif; do
  cp "$SRC/track_b/$f" "$B/$f"
done

# Animaciones de partículas: los GIF pesan ~23 MB c/u. Se pasan a MP4 (mismos cuadros).
for s in "" _x070 _x355; do
  in="$SRC/track_b/anim_particles$s.gif"
  out="$B/anim_particles$s.mp4"
  if [[ ! -f "$out" || "$in" -nt "$out" ]]; then
    ffmpeg -loglevel error -y -i "$in" -movflags +faststart -pix_fmt yuv420p \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 23 "$out"
  fi
done

# Póster (primer cuadro) para que el video no se vea en blanco antes de cargar
for s in "" _x070 _x355; do
  ffmpeg -loglevel error -y -i "$B/anim_particles$s.mp4" -frames:v 1 -update 1 "$B/anim_particles$s.jpg"
done

du -sh "$A" "$B" "$I"
