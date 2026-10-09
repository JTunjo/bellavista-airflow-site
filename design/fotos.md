# Farm photos: what to upload and where

**8 photos in total: 3 banners and 5 inline photos.**

**Where to put them:**
- Drop the originals into `fotos-originales/` at the repo root. That folder is git-ignored, so
  heavy files never get published.
- The builder resizes and compresses them into `assets/fotos/`, and only those versions go online.

**Format:**
- JPEG or HEIC straight from the camera or phone. Don't crop or compress them first.
- Landscape (horizontal).
- Avoid heavy filters; color treatment is decided in `design/tema.md` §5.

## Banners (3): wide strips at the top of a page

- **Minimum size:** 2400 × 1000 px (12:5). A modern phone photo, held horizontally, is enough.
- **Safe zone:** on phones the banner is cropped to roughly 4:3 around the center. Keep the subject
  in the **middle 50 % of the width**, and don't let anything important touch the edges.
- Text does not go on top of the photo, so busy images are fine.

| File name | Page | What to shoot |
|---|---|---|
| `banner-inicio.jpg` | Inicio, above the title | The marquesina from outside, with the farm or landscape around it. Golden hour if possible. |
| `banner-marquesina.jpg` | La marquesina | Inside, looking down the 17 m length: the camas on three levels, the plastic walls, the roof. |
| `banner-finca.jpg` | Para la finca | Coffee being handled: drying, raking, bagging. People are welcome (consent confirmed). |

## Inline photos (5): inside the text, next to the related finding

- **Minimum size:** 1600 × 1200 px (4:3), landscape.
- They are shown at most about 900 px wide, with a caption under each.

| File name | Page, next to | What to shoot |
|---|---|---|
| `cafe-camas.jpg` | Café húmedo, top | The wet pergamino spread on the camas (the ~2 cm layer), ideally showing two or three levels. |
| `ventilador.jpg` | Pruebas de ventilador, top | The fan + nebulizer setup used in the August tests, or where it was placed. |
| `sensor.jpg` | La marquesina, the "what to know" list | A close-up of one of the sensors as mounted, so readers see what "a sensor" is. |
| `ventanas-techo.jpg` | Ciclo diario, near the roof-condensation hypothesis | The SW wall with the high windows and the underside of the roof. Morning dew on the roof would be ideal. |
| `puertas.jpg` | La marquesina, near the floor plan | The NE wall with the two doors, from inside or outside. |

## For each photo, also send

A line per file in `fotos-originales/fotos.txt` (or just tell the agent):

```
banner-inicio.jpg | what it shows (for alt text) | caption (optional) | credit (optional)
```

If a slot has no photo, skip it; the page works without it. If you have a better photo that
isn't on the list, add it with a note on where you'd like it to go.
