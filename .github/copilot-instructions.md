## Repo summary

Single-page static portfolio built with plain HTML, CSS and vanilla JS. Key assets live under `assets/`:
- `assets/js/` — UI and animation modules (`ui.js`, `animations.js`, `main.js`)
- `assets/css/styles.css` — compiled stylesheet used by the site
- `assets/img/` — images used in the layout

This project is not a framework app (no npm, build scripts, or server-side code). The HTML entrypoint is `index.html`.

## What an AI helper should know first

- The site is mobile-first and responsive; many JS functions are small DOM helpers that attach event listeners on DOMContentLoaded or use `IntersectionObserver`/ScrollReveal for animations (see `assets/js/animations.js` and `assets/js/ui.js`).
- Navigation and scroll behaviour live in `assets/js/ui.js` (menu toggle, active section links, smooth scroll). Visual reveal and staggered animations are in `assets/js/animations.js` (exports like `animateSections`, `initScrollReveal`).
- `assets/js/main.js` is the application entrypoint; it wires UI + animations. Edits to behaviour should respect the initialization order (UI first, then animations) to avoid race conditions.
- The project uses ScrollReveal from CDN in `index.html`; code defensively when referencing it (see existing `if(typeof ScrollReveal === 'undefined')` checks).

## Conventions and patterns to follow

- Keep changes small and focused: this is a static portfolio. Prefer modifying existing DOM selectors and CSS variables in `assets/css/styles.css` over adding new global styles.
- Modules are ES module-style (some files export functions) but the shipped `index.html` currently loads scripts directly. If you convert to modules, update `index.html` script tags accordingly.
- Animation helpers use IntersectionObserver and add inline style transitions on elements. Preserve existing class names (e.g. `.skill__card`, `.nav__link`, `.home__img`) — many selectors rely on them.
- Accessibility: many interactive elements (skill cards, nav toggle) set `tabindex` and keyboard handlers in `assets/js/ui.js`. Keep or improve keyboard support when editing interactions.

## Typical tasks and how to approach them

- Add a new section: update `index.html`, add styles in `assets/css/styles.css` and add any reveal animations in `assets/js/animations.js` (use `sr.reveal(...)` and/or add `fade-in` class). Ensure the new section has an `id` for nav links.
- Change nav or header behaviour: edit `assets/js/ui.js` (see `toggleMenu`, `scrollHeader`, `activeSectionLink`). Use the same threshold values (`-58` or `-50`) to keep active-link behaviour consistent.
- Tweak animations: prefer changing timing/intervals in `assets/js/animations.js` or toggle `reset` in ScrollReveal config. Always leave a defensive check for ScrollReveal presence.
- Replace an image: put files in `assets/img/` and reference them from `index.html` or CSS. Optimize images but keep filenames predictable.

## Debugging and local testing

- Open `index.html` directly in the browser (double-click or use a simple static server). No build step required.
- If testing modules (ESM import/exports), run a local static server (e.g., `npx http-server .` or `python -m http.server 8000`) because many browsers block module imports and CORS for file://.

## Files to inspect when asked

- `index.html` — markup, linked third-party libs (ScrollReveal, Boxicons, Google Fonts), and script inclusion order
- `assets/js/ui.js` — navigation, smooth scroll, form validation patterns
- `assets/js/animations.js` — full animation surface area; good source of examples for IntersectionObserver and reveal patterns
- `assets/js/main.js` — how modules are wired on DOMContentLoaded
- `assets/css/styles.css` — variables, layout utilities, and breakpoint rules

## Examples to copy/paste

- Safe ScrollReveal check (copy from `assets/js/animations.js`):

```js
if(typeof ScrollReveal === 'undefined') {
  console.warn('ScrollReveal not loaded — skipping reveal animations');
} else {
  const sr = ScrollReveal({...});
}
```

- Pattern for IntersectionObserver to animate elements once:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
elements.forEach(el => observer.observe(el));
```

## What the AI should not change

- Do not remove `assets/js/ui.js` or `assets/js/animations.js` initialization order in `index.html` unless you update all wiring in `main.js`.
- Don't rename the main CSS file or break the CSS variable names in `assets/css/styles.css` — many styles depend on them.

## When to ask the human

- If you need to add a build step (npm, bundler) — ask first. This repo is intentionally static.
- If a change requires image assets larger than 1MB or external API keys for contact forms (Formspree placeholder in `index.html`) — confirm before adding secrets or external services.

---

If you'd like, I can adjust tone/length or add specific code snippets for common edits (add section, change nav behavior, or convert to ES modules). Any preferences? 
