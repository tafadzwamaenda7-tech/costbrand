# Costbrand Website — Complete Redesign Brief

Implementer: frontend-design subagent. Read the full audit first (`costbrand-full-site-eval.md`) and AGENTS.md before writing code.

## 1. Objective

Modernize the Costbrand site with Apple-store-level polish while keeping it warm, human, and proof-led — nothing that reads as a generic AI template. Deliver:

- Premium editorial presentation for a Zimbabwean export producer: trust via real media, dated proof (Plot 68 → England & Netherlands), and restrained craft over decoration.
- Working imagery everywhere. Today 9/10 home images and 3/3 horticulture images render broken because `src/lib/site-assets.ts` only wires 6 files and ignores the 24 imported asset pointers in `src/assets/*.asset.json`.
- Correct routes, sane responsive scale (mobile H1 currently clips at 375px), and all UX fixes from §8.
- Preserve hard constraints: reference-site hash navigation for home sections + separate contact/legal routes, and the privacy commitments (never read/display enquiry submissions).

Non-negotiable context: this project syncs back to Lovable — keep the branch green, **never rewrite published git history** (no force-push/rebase/amend/squash of pushed commits), and keep each commit in a working state.

## 2. Scope

**All routes** (`src/routes/*.tsx`): `/` (index), `/about`, `/about-us`, `/agriculture`, `/horticulture`, `/machinery`, `/international-sourcing`, `/production-and-global-sourcing`, `/our-products`, `/global-market-reach`, `/projects`, `/contact-us`, `/privacy`, `/privacy-policy`, `/terms`, `/terms-and-conditions`, `/cookie-policy`, 404. Aliased pairs must stay consistent (redirects or duplicate content — do not let `/about`/`/horticulture`/`/international-sourcing`/`/privacy`/`/terms` 404; test each directly).

**Site chrome** (`src/components/site-shell.tsx`): sticky header + centered desktop nav with pillar mega menus (hover + keyboard operable), search overlay, mobile menu with search + pillar accordions, footer, `ContactBlock`, `FloatingWhatsApp`, `BackToTop`. Keep the existing centered-nav geometry that already passes audit.

**Home** (`index.tsx` + `site-sections.tsx`): hero, four pillar cards, Plot 68 proof band, nine-crop product mosaic, Horticulture spotlight, closing statement, contact block.

**Pillars**: agriculture (focus areas, Plot 68 case study), horticulture (flagship proof page: case study, mosaic, 9 focus areas, Farm-to-Market, destination cards, goal, related links), machinery (Bento product groups + request flow), sourcing (trust, regions, process, request flow).

**Other pages**: projects, markets (`global-market-reach`), about (vision/mission/why), contact (form via `request-form.tsx`/contact schema — server function, validated + rate-limited), legal (`policy-page.tsx` rendering `policies.json` structured tree, never arbitrary HTML).

## 3. Design Direction — "Warm Editorial-Minimalist with Refined Depth"

One opinion, applied everywhere:

> Editorial magazine warmth on top of a restrained, Apple-grade system. Think Margiela-clean grids wearing an African-sun palette: warm paper instead of flat white, deep forest green instead of corporate charcoal, gold used like brass clasps on a field journal — never decoratively.

Feeling to hit:
- Quiet confidence. Long-form editorial rhythm on Agriculture/Projects; crisp, composed product moments on Machinery/Sourcing.
- Depth through layering, not clutter: soft layered shadows, one glass blur surface, generous negative space, hairline rules of gold.
- Proof-first: images and dated facts carry the pages; type lets them speak.
- Deliberately NOT a shadcn-soup: no 100 identical cards, no centering-everything pill-section homogeneity. Vary rhythm per page.

## 4. Design System (Tokens — add as CSS custom properties in `src/styles.css`)

Add to `:root` in `src/styles.css`, then map into the existing `@theme inline` block so Tailwind utilities keep working.

**Colors — keep the current forest/paper/gold DNA, tune values:**
- `--paper: #f4f1e9` (warm off-white), `--paper-light: #fbfaf6` (raised surface), `--paper-muted: #ece8dc`
- `--forest: #173d32`, `--forest-deep: #0f2a22`, `--forest-soft: #2f5647`, `--forest-mist: #e4ebe2`
- `--gold: #b8955a`, `--gold-pale: #e7dcc4`, `--brass: #8a6a33` (hover gold)
- `--ink: #1f2620`, `--muted-ink: #5b6359`, `--faint-ink: #8a9189`
- `--forest` (current) → keep as `--color-primary`; `--gold` → accent.

**Surface / borders / radius:**
- `--surface-1`, `--surface-2` (raised cards), `--line` hairline: rgba(32,39,31,.14) default, `--line-strong` rgba(32,39,31,.28)
- Radii — mostly soft-rounded, editorial square on purpose: `--radius-xs: 6px`, `--radius-sm: 10px`, `--radius-md: 14px`, `--radius-lg: 22px`, `--radius-pill: 999px`. Soft *rounded* for cards/CTAs/images; keep *square* only as a sparing editorial accent (numbered section blocks, caption plates, PullQuote rules).

**Spacing — 4pt scale:** `--space-1: 4px … --space-16: 64px` (+ `--section-y: clamp(72px, 9vw, 124px)`). Sections travel at the top of the scale; components use 4/8/12/16/24.

**Shadows — layered, warm, low-opacity:**
- `--shadow-subtle: 0 1px 2px rgba(18,34,26,.06)`
- `--shadow-card: 0 2px 8px rgba(18,34,26,.07), 0 12px 28px -12px rgba(18,34,26,.16)`
- `--shadow-float: 0 18px 42px rgba(16,42,34,.15)` (menus/overlays — already used, keep)
- `--shadow-gold-glow` only for primary CTA focus state, subtle.

**Blur:** `--blur-surface: 14px` (header-docked backdrop / search overlay), used once or twice, not everywhere.

**Motion (`@media (prefers-reduced-motion: reduce)` must zero it out):**
- Durations 160–220ms for state, 400–550ms for reveal/hero onload; single `--ease-out: cubic-bezier(.22,.61,.36,1)` and `--ease-spring` for micro-interactions.
- Reveals: fade + 12–18px rise, staggered ≤ 80ms, scroll-linked via the existing `[data-scroll] .reveal` hook in `__root.tsx`. Reduce existing hero autoplay churn (see §8).

**Breakpoints:** `--bp-md: 728px`, `--bp-lg: 1024px`, `--bp-xl: 1180px`, content width `min(1180px, calc(100% - 64px))` (keep `.content-width` → widen to `min(1200px, calc(100% - 64px))`). Keep header switch at 930px as audited; ensure hover mega-menu also works at tablet (build-sheet expectation) with an additional intermediate layout.

## 5. Typography

**Pairing: Fraunces (warm editorial serif) + Inter (modern neutral sans).** Fraunces gives the African-brand warmth and refuses the "AI template" look; Inter keeps the UI Apple-grade.

- **Webfont loading (self-hosted, no hotlinks):** add `@fontsource-variable/fraunces` and `@fontsource-variable/inter`; import the CSS once in `src/styles.css` (or in `__root.tsx`). Fall back to `Georgia, serif` / `-apple-system, "Segoe UI", sans-serif` until loaded. Do NOT use font CDN `link` tags.
- Stacks: `--display: "Fraunces Variable", Georgia, "Times New Roman", serif;` `--body: "Inter Variable", "Segoe UI", system-ui, sans-serif;`
- **Display scale (cap to audited ranges):** desktop clamp to 56–72px, mobile 34–40px.
  - `--text-hero: clamp(2.35rem, 5vw + 0.5rem, 4.5rem)` / line-height 1.04, tracking `-0.02em`
  - `--text-h1: clamp(2rem, 3.4vw + .5rem, 3.4rem)` (section titles) / 1.06
  - `--text-h2: clamp(1.65rem, 2.2vw + .5rem, 2.4rem)` / 1.12
  - `--text-h3: 1.3rem` / 1.25
- **Body:** `--text-body: 1rem` / 1.65; `--text-lede: 1.125rem` / 1.6 (page intros).
- **Eyebrow (house style):** Inter, `.66–.72rem`, `letter-spacing: .14em`, `text-transform: uppercase`, muted-ink or gold, paired with a 24–40px gold rule.
- **Weights:** display 400 (optical) + 500 for emphasis; sans 400/500/600 (600 for nav/buttons, 700 only for tiny-key CTAs). Avoid faux-bolding decorative serifs.

## 6. Layout Principles

Use **Bento selectively** (per audit) — never as a blanket template:
- Bento: Home **pillars + crop mosaic**, Machinery **4→6 product groups**, About **why-block**, Sourcing **trust strip**. 3:2 and 2:1 tile ratios, gaps `--space-5/6`, tile content = small serif headline + one line + image.
- **Split / editorial** for long-form: Agriculture focus, Projects, About story, Home hero + Plot 68 proof (image lede left, copy right, gold rule above leads).
- **Avoid repetition:** alternate imagery/tile placement per section; a section built like its sibling must differ in ratio, count, or alignment. No more than two adjacent "icon + title + copy + link" cards in a row.
- Keep the numbered module voice that already works (numbered stage names on Horticulture/Sourcing).
- Contact block + WhatsApp + back-to-top as shared chrome on content pages (§8 item on `/contact-us`).

## 7. Imagery — Wire the 24 Unused Asset Pointers

**Today `src/lib/site-assets.ts` uses only the 5 `public/WhatsApp…` images + logo and remaps the same 3 photos to ~20 keys (`peaHarvest`→6 keys, `machineField`→4, `fieldRows`→4). All 24 `src/assets/*.asset.json` pointers are unwired.**

Do:
- In `src/lib/site-assets.ts`, import each of the 24 pointers (Lovable asset import, fields: `url`, `original_filename`) and export **all of them** with semantic keys (`export const snapPeas = import("./assets/sugar_snap_peas_in_box.jpeg.asset.json")` etc.). Keep current exports working to avoid breaking call sites, but stop aliasing one file to many keys.
- Map **unique images to unique placements** — a given photo should appear at most 2× across the whole site (hero + one reuse max), and never twice in the same viewport. Assign: hero, snapPeas, packing, boxedPeas, globalSourcing, quality, sustainability, logistics, mangetout, beans, chillies, babyVegetables, passionFruit, countries, farm, regions (2 wide strips: `our_sourcing_regions1`, `sourcing_regions_new`), markets (`key_markets`), supply (`reliable_supply`), certificate (`certified_quality`), countries/map (`countries`), plots/fields (`passionfruit`, `peas_growing`, `sugar_snap*`, 2× WhatsApp 768×1024), footer/logo (`genesis-exotics-logo` distinct from `genesis-logo`), and the two `Unt*.png` / `ChatGPT-Image…` only if their content is clearly brand-relevant (verify first).
- **Fix misleading alts** — write specific, truthful descriptions (crop, state, context), never blanket strings, and never `alt=""` on meaningful photos.
- **Raster for photography; SVG only for icons/diagrams.** If a PNG is itself a diagram (regions/sourcing), keep as raster but label as diagram in alt.
- Where a pointer's content is unknown, view the file before wiring it; if unusable, omit and use a labelled placeholder rather than a broken `<img>`.

## 8. Key UX Improvements (all from the audit)

1. **Hash offset:** `html { scroll-padding-top }` in `styles.css` → `>= 120px` (sticky header ~75px needs breathing room). Verify every `#anchor` lands clear of the header.
2. **SPA hash links:** cross-page anchors in chrome (mega-menu links like `/horticulture#produce`) must use TanStack `Link` so they SPA-navigate then scroll, not full page loads. Sweep `site-shell.tsx` + sections: replace raw `<a href="/page#anchor">` with `<Link to="/page" hash="anchor">`.
3. **Remove duplicate CTAs:** Horticulture double band (drop one band), Markets + `/projects` + FutureBanner duplication (keep one per page route, dedupe on Home).
4. **Dedupe About:** single vision + mission (currently duplicated across `about.tsx`/`about-us.tsx` content); same for privacy/terms aliases — shared `policy-page.tsx` content, aliased routes only.
5. **Hide `ContactBlock` on `/contact-us`** (the page already IS the contact surface; don't repeat chrome above/below the form).
6. **Dynamic year everywhere:** footer + legal + any static `2026` → `new Date().getFullYear()`.
7. **Search index** (`searchEntries` in `site-shell.tsx`, currently 5 entries) → include Projects, Markets, About, Contact + all pillars, with useful terms/anchors; keep suggestions aligned.
8. **Hero autoplay churn:** if hero media cycles, reduce to a single static/onload entry or a slow, pause-on-hover cycle respecting `prefers-reduced-motion`; never re-mount images repeatedly (causes the 404/perf churn seen in audit).
9. **Remove dead code:** delete `ZimbabweStatement` from `site-sections.tsx` and its CSS; audit `styles.css` (~974 lines) for orphaned classes/components and remove cruft.
10. **Focus rings:** consistent `:focus-visible` (2px gold, offset 2–4px) on all interactive elements (search overlay, mega menu, mobile menu, forms, floating WhatsApp).
11. **Touch targets:** interactive elements ≥ 44px hit area (nav links, sidebar links, close buttons, tile links, swatches); check at 375/480/768.
12. **Responsive hero:** cap display sizes per §5 and constrain H1 to the content column so 375px never clips (current 51px→ overflow).

## 9. Implementation Constraints

- Stack: **TanStack Start + Tailwind v4 + the existing `Button` component + existing server functions** (`contact.functions.ts`, `contact-schema.ts`, rate-limited/validated). Do not add a new styling or form framework; no new runtime deps unless unavoidable (fontsource Variable packages are acceptable and self-hosted).
- Keep `@theme inline` mapping so Tailwind utilities (`bg-primary`, `border-border`, etc.) resolve to the new tokens.
- **Privacy:** never add code that reads/renders enquiry submissions; forms submit via the validated server function only.
- **Navigation architecture:** home sections keep reference-site hash anchors (`#agriculture`, `#horticulture`, …) and contact/legal stay separate routes; don't flatten them into one page.
- **No hotlinking:** all imagery from local/public assets or imported `asset.json` pointers — zero external image URLs.
- **Git:** work incrementally; pushable commits only; never rewrite history on the connected branch.

## 10. Acceptance

- `npm run build` passes; `npm run lint` and `npm run test` (`vitest run`) pass (verify the routing test in `src/test/app-routing.test.tsx` still green).
- Live-check at 375 / 768 / 1440: no image 404s, no H1 clipping, hash anchors clear the sticky header, math scales within ranges.
- No obvious visual repetition — each route's layout differs by design, not by accident; Bento appears only where §6 recommends.
- Does not read as a generic template: distinct editorial rhythm, no repeating 8× card walls, Fraunces+Inter voice.
- All 24 asset pointers wired in `site-assets.ts`; unique-image mapping per §7; truthful alts.
- Route matrix: every route in §2 returns 200 (no aliased 404s); header/mega-menu/footer/mobile nav and search resolve to the right destinations with SPA hash scrolling.
- Privacy preserved; no submissions readable client-side; commit history untouched.

## 11. File-Edits Checklist (conceptual)

- **`src/styles.css`** — tokens (§4), typography system (§5), `scroll-padding-top: 120px+`, focus rings, 44px touch targets, motion/reduced-motion, tone/remove dead CSS (`ZimbabweStatement`, orphans), Bento grid helpers.
- **`src/lib/site-assets.ts`** — import all 24 asset pointers; semantic export names; no duplicate aliasing.
- **`src/components/site-shell.tsx`** — keep centered nav + mega menus + mobile menu; `Link`-based cross-page hash nav; extend `searchEntries`; dynamic year; hide `ContactBlock` on `/contact-us` (via `useLocation`); touch/ring fixes.
- **`src/components/site-sections.tsx`** — delete `ZimbabweStatement`; dedupe About vision/mission; remove duplicate CTA bands; unique image mapping per tile; apply Bento vs split-Editorial per §6; hurtling hero fix if it lives here.
- **`src/routes/index.tsx` + pillar/home route files** — per-page composition, imagery wiring, Plot 68 proof, responsive hero sizing, CTA de-dup.
- **`src/routes/contact-us.tsx`** — form untouched functionally; remove duplicated page-level `ContactBlock` repetition.
- **`src/routes/about.tsx`/`about-us.tsx`, `privacy*`/`terms*`** — canonical content, aliases stay 200, dynamic year, dedup.
- **`src/routes/__root.tsx`** — keep reveal hook, font/preload wiring, `scroll-padding` behaviour if moved.
- **`src/lib/site-meta.ts`** — align route titles/meta with final structure.
- **`package.json`** — add only `@fontsource-variable/inter` + `@fontsource-variable/fraunces` (self-hosted).