# Visual theme brief: fill-in template

**Who fills this in:** whoever knows Tunjo's visual identity, a person or an agent working from
Tunjo's brand materials.
**Who reads it:** the agent that builds this site. It turns the answers into CSS tokens, fonts,
header and footer.
**How to fill it in:**
- Replace every `▢` with a value. Write `n/a` when something doesn't exist, and `decide` when you
  want the builder to choose.
- Add links or file paths wherever this asks for references.
- Don't edit the "current value" columns. They show what the site uses today, so you know what
  each slot controls.

The site is in **Spanish**, for a **farm / operations** audience, and is **light mode only**,
because every scientific figure is a light PNG.

---

## 1. Identity

| Item | Value |
|---|---|
| Brand / farm name exactly as it should appear | ▢ |
| Short name for tight spaces (header on phones) | ▢ |
| Tagline under the name in the header (current: "Aire y humedad en el secado de café") | ▢ |
| How the shed is called on the farm (current: "marquesina"; also "nave") | ▢ |
| Footer text: credits, who did the study, contact, year | ▢ |
| Links to include in the footer (website, Instagram, etc.) | ▢ |

**Logo files.** Put them in `assets/marca/`. SVG is preferred; otherwise PNG at least 1000 px wide,
with a transparent background.

| File | Use | Provided? |
|---|---|---|
| `assets/marca/logo.svg` | header, full color, on a light background | ▢ |
| `assets/marca/logo-mono.svg` | single color (for small sizes or over photos) | ▢ |
| `assets/marca/isotipo.svg` | symbol only, square (favicon, phone header) | ▢ |
| Minimum size or clear-space rules | | ▢ |

## 2. Colors

Each row is a slot the site already uses. Give one hex per slot, or `keep`.
- **Text** colors need at least 4.5:1 contrast on `--bg` and `--paper`.
- **Mark** colors (`--air`, `--cherry`) need at least 3:1.

The builder checks both, and reports back with a nearby passing value if one fails.

| Token | Current | What it paints | New value |
|---|---|---|---|
| `--bg` | `#F3F5F1` | page background | ▢ |
| `--paper` | `#FFFFFF` | cards, figure frames | ▢ |
| `--ink` | `#1D2A24` | headings, main text, active menu item | ▢ |
| `--ink-2` | `#44544B` | secondary text, captions | ▢ |
| `--muted` | `#6E7C74` | small labels, footer | ▢ |
| `--line` | `#D3DBD4` | borders, dividers | ▢ |
| `--air` | `#2F6FA8` | links, doors/windows on the plan, chart series 1 ("sin café", "adentro") | ▢ |
| `--cherry` | `#B0413E` | coffee on the plan, chart series 2 ("con café") | ▢ |
| Brand accent (new slot, optional) | none | where it should appear (buttons? header bar? highlights?) | ▢ |

**Reserved colors.** The four confidence labels use their own colors (`--c-solido` green,
`--c-sugestivo` amber, `--c-pendiente` gray, `--c-hipotesis` violet). Their meaning has to stay
instantly readable, so they can be re-tinted to match the brand but not merged with brand colors.
Want them re-tinted? ▢ yes / no

## 3. Typography

Fonts must be on Google Fonts, or delivered as `.woff2` files in `assets/fonts/` with a license
that allows web use. They must support Spanish characters (á é í ó ú ñ ¿ ¡).

| Role | Current | What it's used for | New font + weights |
|---|---|---|---|
| Display | Bricolage Grotesque 500–800 | page titles, section titles, card titles | ▢ |
| Body | Atkinson Hyperlegible 400/700 | all reading text (chosen for readability on phones) | ▢ |
| Numbers / data | IBM Plex Mono 400/600 | numbers in charts and tables | ▢ |
| Title style: sentence case or ALL CAPS? letter spacing? | sentence case, slightly tight | | ▢ |

## 4. Shape and surface

| Item | Current | New |
|---|---|---|
| Corner roundness of cards and frames | 10 px | ▢ (0 = square, 20+ = soft) |
| Pills (menu items, tabs) | fully rounded | ▢ |
| Borders | 1 px solid, light | ▢ |
| Shadows | none | ▢ |
| Background texture or pattern (e.g. paper, burlap, coffee-leaf pattern) | none | ▢ + file in `assets/marca/` |

## 5. Imagery and graphics

| Item | Value |
|---|---|
| Photo treatment (natural / warm grade / desaturated / duotone with brand color) | ▢ |
| Can photos have people in them? Do we have their consent? | ▢ |
| Icon style if any (line / filled / hand-drawn) | ▢ |
| Illustrations or brand graphics to reuse (files in `assets/marca/`) | ▢ |

Photo slots and sizes are in `design/fotos.md`.

## 6. Voice

| Item | Value |
|---|---|
| Address the reader as *usted*, *tú*, or impersonal (current: impersonal / *usted*) | ▢ |
| Farm vocabulary to use (e.g. "beneficiadero", "camas", "escotillas", "café pergamino") | ▢ |
| Words or tones to avoid | ▢ |
| Example of a sentence that "sounds like Tunjo" | ▢ |

## 7. References

Links or screenshots of existing Tunjo materials: website, packaging, labels, social media,
presentations. Drop images in `design/referencias/`.

- ▢
- ▢

## 8. What stays fixed

The theme can change how the site *looks*, but not these:

1. The confidence labels (Sólido / Sugestivo / Hipótesis / Por confirmar / Aún sin respaldo) and
   the Sensores / Modelo tags keep their meaning and stay visually distinct from each other.
2. The scientific figures are shown as they are, without recoloring.
3. Text stays readable on a phone in sunlight: body at least 16 px, contrast at least 4.5:1.
4. No build step: plain HTML, CSS and JS, hosted on GitHub Pages.
