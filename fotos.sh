#!/usr/bin/env bash
# Prepara las fotos para la web: lee los originales de fotos-originales/ (no se publican) y escribe
# versiones livianas en assets/fotos/ (banners a 2400 y 1200 px; fotos de texto a 1600 y 900 px).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/fotos
hacer() {  # origen destino ancho
  sips -s format jpeg -s formatOptions 74 --resampleWidth "$3" "fotos-originales/$1" --out "assets/fotos/$2" >/dev/null
}
for b in banner-inicio banner-marquesina banner-finca; do
  hacer "$b.jpg" "$b.jpg" 2400
  hacer "$b.jpg" "$b-1200.jpg" 1200
done
# nombre del original → nombre publicado (puertas.jpg resultó ser una foto del pergamino)
for par in cafe-camas:cafe-camas ventilador:ventilador sensor:sensor ventanas-techo:interior puertas:pergamino; do
  o=${par%%:*}; d=${par##*:}
  hacer "$o.jpg" "$d.jpg" 1600
  hacer "$o.jpg" "$d-900.jpg" 900
done
ls -lh assets/fotos
