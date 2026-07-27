# AGENTS.md

Pure static educational site — 35 Chinese-language front-end knowledge pages across 7 modules.

**No build step, no package manager, no tests, no server.** Just open any `.html` in a browser.

## Architecture

- `index.html` — homepage with module/knowledge-point cards
- 35 content pages (`html5-semantic.html`, `js-types.html`, `browser-event-loop.html`, …)
- `css/style.css` — single global stylesheet
- `js/main.js` — single global JS: sidebar, TOC, prev/next nav, FAQ toggle, mobile sidebar

## Page conventions (every content page)

1. `<meta name="active-file" content="FILE_NAME">` — drives sidebar highlight; must match a key in `NAV_DATA`
2. Wraps content in `.app-container > aside.sidebar + main.main-content > .content-wrapper`
3. Has a `.topbar` with breadcrumb
4. 5-section body: core concepts → key features (tables) → code examples (pre/code blocks) → FAQ (`.faq-item`) → further reading + interview questions (`.interview-card`)
5. Each of the 35 pages corresponds 1:1 with an entry in `js/main.js` `NAV_DATA` array (7 groups × 5 items)
6. Right-side TOC auto-generated from `h2.section-title` + `h3.subsection-title` on pages with a `meta[name="active-file"]`
7. Prev/next navigation auto-derived from `NAV_DATA` order

## Adding/changing pages

- Create the `.html` file following the convention above
- Add a corresponding entry in `js/main.js` `NAV_DATA` with `{ title, file }` (file without `.html`)
- The `title` in the page's `<title>` tag should follow: `"$TOPIC - 前端知识体系"`
- No CSS or JS changes are needed for new pages (shared styles/applied at runtime)

## Visual components (from `css/style.css`)

| Component | CSS class |
|-----------|-----------|
| Callout/tip/warning | `.callout` + `.callout-tip\|-warning\|-danger\|-info` |
| Table | `.table-wrapper > table` |
| Code block | `pre > code` (language label via `code.code-label`) |
| Tag | `.tag .tag-html\|-css\|-js\|-vue\|-react\|-basic\|-intermediate\|-advanced` |
| FAQ accordion | `.faq-item > .faq-question + .faq-answer` (toggle via `main.js`) |
| Interview card | `.interview-card > .iq-question + .iq-hint` |
