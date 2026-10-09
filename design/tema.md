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

> **Style direction:** the look-and-feel slots (sections 2–5) are filled with a style modeled on
> stripe.com: deep navy ink, cool off-white surfaces, one vivid accent, soft layered shadows,
> tight grotesque headings. Only the *style* is borrowed — no Stripe logos, illustrations,
> imagery or proprietary fonts. Stripe's own typeface (Söhne) is commercial, so free Google Fonts
> stand-ins are specified. Identity, voice and references (sections 1, 6, 7) are left for Tunjo.

---

## 1. Identity

| Item | Value |
|---|---|
| Brand / farm name exactly as it should appear | **Bellavista Coffee \| Área de secado** |
| Short name for tight spaces (header on phones) | Bellavista Coffee |
| Tagline under the name in the header (current: "Aire y humedad en el secado de café") | keep |
| How the shed is called on the farm (current: "marquesina"; also "nave") | **marquesina** (never "nave") |
| Footer text: credits, who did the study, contact, year | Tunjo Smart Solutions · jchacon@tunjosolutions.co · 2026 |
| Links to include in the footer (website, Instagram, etc.) | https://co.linkedin.com/company/tunjosolutions (only) |

**Logo files.** Put them in `assets/marca/`. SVG is preferred; otherwise PNG at least 1000 px wide,
with a transparent background.

| File | Use | Provided? |
|---|---|---|
| `assets/marca/logo.svg` | header, full color, on a light background | n/a — the symbol is used instead |
| `assets/marca/logo-mono.svg` | single color (for small sizes or over photos) | n/a |
| `assets/marca/isotipo.svg` | symbol only, square (favicon, phone header) | ✔ Tunjo face (`#216F96` / `#002C51`), used in header, footer and favicon |
| Minimum size or clear-space rules | | n/a |

## 2. Colors

Each row is a slot the site already uses. Give one hex per slot, or `keep`.
- **Text** colors need at least 4.5:1 contrast on `--bg` and `--paper`.
- **Mark** colors (`--air`, `--cherry`) need at least 3:1.

The builder checks both, and reports back with a nearby passing value if one fails.

| Token | Current | What it paints | New value |
|---|---|---|---|
| `--bg` | `#F3F5F1` | page background | `#F6F9FC` (cool off-white) |
| `--paper` | `#FFFFFF` | cards, figure frames | `#FFFFFF` |
| `--ink` | `#1D2A24` | headings, main text, active menu item | `#0A2540` (deep navy) — 14.7:1 on bg |
| `--ink-2` | `#44544B` | secondary text, captions | `#425466` (slate) — 7.4:1 on bg |
| `--muted` | `#6E7C74` | small labels, footer | `#697386` — 4.52:1 on bg (passes, no margin; use `#64748B` if it gets lighter) |
| `--line` | `#D3DBD4` | borders, dividers | `#E3E8EE` |
| `--air` | `#2F6FA8` | links, doors/windows on the plan, chart series 1 ("sin café", "adentro") | `#0570DE` (bright blue) — 4.5:1, passes as text and as mark |
| `--cherry` | `#B0413E` | coffee on the plan, chart series 2 ("con café") | `#DF1B41` (crimson) — 4.5:1 |
| Brand accent (new slot, optional) | none | where it should appear (buttons? header bar? highlights?) | `#635BFF` (blurple). Use as **fills** with white text: primary buttons, active pill, thin top bar on the header, header gradient. 4.45:1 on bg, so not for body text on `--bg`; for accent-colored text use `#5851EA`. |
| Accent gradient (optional, extra) | none | hero / header band only, never behind figures | `linear-gradient(120deg, #635BFF 0%, #00D4FF 55%, #F6F9FC 100%)` at low height, or a soft version at ~15% opacity behind the page title |

**Reserved colors.** The four confidence labels use their own colors (`--c-solido` green,
`--c-sugestivo` amber, `--c-pendiente` gray, `--c-hipotesis` violet). Their meaning has to stay
instantly readable, so they can be re-tinted to match the brand but not merged with brand colors.
Want them re-tinted? **yes** — required with this palette: the blurple accent is too close to the
current violet of `--c-hipotesis`. Suggested: `--c-solido` `#1A7F4B`, `--c-sugestivo` `#B25E09`,
`--c-pendiente` `#697386`, `--c-hipotesis` `#A3248E` (magenta, clearly apart from `#635BFF`).
Builder to verify contrast.

## 3. Typography

Fonts must be on Google Fonts, or delivered as `.woff2` files in `assets/fonts/` with a license
that allows web use. They must support Spanish characters (á é í ó ú ñ ¿ ¡).

| Role | Current | What it's used for | New font + weights |
|---|---|---|---|
| Display | Bricolage Grotesque 500–800 | page titles, section titles, card titles | **Inter Tight** 500/600 (Google Fonts; closest free match to Stripe's Söhne). Stripe-style headings are medium weight, not heavy — avoid 700+. |
| Body | Atkinson Hyperlegible 400/700 | all reading text (chosen for readability on phones) | **Inter** 400/600, 17–18 px, line-height 1.6. *Alternative:* keep Atkinson Hyperlegible if sunlight readability tests favor it — the Stripe feel comes mostly from headings, color and spacing. |
| Numbers / data | IBM Plex Mono 400/600 | numbers in charts and tables | **Source Code Pro** 400/600 (Stripe's docs-style mono). Also enable `font-variant-numeric: tabular-nums` on Inter for numbers in prose. |
| Title style: sentence case or ALL CAPS? letter spacing? | sentence case, slightly tight | | Sentence case. Titles `letter-spacing: -0.02em`, large titles (≥40 px) `-0.03em`. Small eyebrow labels above sections: 13 px, 600, ALL CAPS, `+0.06em`, in `--air` or accent. |

## 4. Shape and surface

| Item | Current | New |
|---|---|---|
| Corner roundness of cards and frames | 10 px | 8 px (figures inside frames: 4 px) |
| Pills (menu items, tabs) | fully rounded | fully rounded (keep) — primary buttons also pill-shaped |
| Borders | 1 px solid, light | 1 px solid `--line` on cards that sit on `--paper`; cards on `--bg` drop the border and rely on shadow |
| Shadows | none | Layered, cool-tinted. Cards: `0 2px 5px -1px rgba(50,50,93,.25), 0 1px 3px -1px rgba(0,0,0,.3)`. Raised / hover: `0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3)`. Large feature panel (max one per page): `0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)`. |
| Background texture or pattern (e.g. paper, burlap, coffee-leaf pattern) | none | none — flat `--bg`. Only the optional accent gradient in the header band (CSS, no file needed). |

## 5. Imagery and graphics

| Item | Value |
|---|---|
| Photo treatment (natural / warm grade / desaturated / duotone with brand color) | Natural, bright and clean: slightly lifted exposure, neutral-to-cool white balance, no heavy filters, no duotone. Tight, uncluttered crops. 8 px radius like cards. |
| Can photos have people in them? Do we have their consent? | Yes — consent confirmed for all pictures |
| Icon style if any (line / filled / hand-drawn) | Line icons, 1.5–2 px stroke, rounded caps and joins, 20–24 px, colored `--ink-2` or `--air`. Suggested set: Lucide (ISC license, free). |
| Illustrations or brand graphics to reuse (files in `assets/marca/`) | decide — Stripe-style approach: no decorative illustrations; let the plan, charts and photos carry the page. |

Photo slots and sizes are in `design/fotos.md`.

## 6. Voice

| Item | Value |
|---|---|
| Address the reader as *usted*, *tú*, or impersonal (current: impersonal / *usted*) | **tú** |
| Farm vocabulary to use (e.g. "beneficiadero", "camas", "escotillas", "café pergamino") | **marquesina**, **camas**, **ventanas**, **pergamino** |
| Words or tones to avoid | "nave", "escotillas" |
| Example of a sentence that "sounds like Tunjo" | n/a |

## 7. References

Links or screenshots of existing Tunjo materials: website, packaging, labels, social media,
presentations. Drop images in `design/referencias/`.

- Style reference for sections 2–5: https://stripe.com (look and feel only; no assets copied)
- Tunjo on LinkedIn: https://co.linkedin.com/company/tunjosolutions

## 8. What stays fixed

The theme can change how the site *looks*, but not these:

1. The confidence labels (Sólido / Sugestivo / Hipótesis / Por confirmar / Aún sin respaldo) and
   the Sensores / Modelo tags keep their meaning and stay visually distinct from each other.
2. The scientific figures are shown as they are, without recoloring.
3. Text stays readable on a phone in sunlight: body at least 16 px, contrast at least 4.5:1.
4. No build step: plain HTML, CSS and JS, hosted on GitHub Pages.
