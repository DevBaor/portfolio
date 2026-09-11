---
name: bao-portfolio
description: >-
  Guide and workflow runbook for developing, styling, maintaining, and deploying
  Duy Bảo's (DevBaor) Portfolio website. Use this skill when modifying the hero layout,
  typography, animations, dark/light mode themes, project cards, or deploying to Vercel.
---

# Duy Bảo (DevBaor) Portfolio — Developer & Design Runbook

This skill outlines the architecture, design tokens, component workflows, theme rules, and deployment procedures for the **Duy Bảo Portfolio** web application.

---

## 1. Tech Stack & Project Architecture

- **Core Framework**: React 19 + Vite 7 (Single Page Application).
- **Animation Engine**: GSAP 3 (ScrollTrigger, Flip, Timeline transitions, Typewriter).
- **Icons**: `lucide-react` exclusively (do not add `react-icons`).
- **Styling**: Vanilla CSS in [src/styles.css](file:///c:/Games/New%20folder/src/styles.css) with CSS custom properties (`--bg`, `--surface`, `--accent`, `--line`, etc.).
- **Deployment**: Vercel SPA (configured with [vercel.json](file:///c:/Games/New%20folder/vercel.json) rewrite rule).

### File Structure
```text
/
├── index.html            # HTML shell with Google Fonts & Meta tags
├── vercel.json           # Vercel rewrite configuration for SPA
├── .gitignore            # Git exclusions (node_modules, dist, .vercel, logs)
├── package.json          # Dependencies & build scripts
├── public/               # Static assets & project preview thumbnails
│   ├── baotools_preview.png
│   ├── expense_preview.jpg
│   ├── huit_campus.jpg
│   └── thesis_preview.jpg
└── src/
    ├── main.jsx          # All page components, state, animations, data
    └── styles.css        # Complete design system, theme variables, animations
```

---

## 2. Typography & Design System

The portfolio uses an eclectic, modern "cyber-collage & graffiti slap-tag" aesthetic with strict font pairings:

| Element | Font Family | Role / Purpose |
| :--- | :--- | :--- |
| **Headline: C** | Custom SVG Sticker | Monospace cyber bracketed letter |
| **Headline: ODE** | JetBrains Mono (800) | Thick box-letter sticker |
| **Headline: DUY** | Tourney (900) | 3D layered sky-blue block letters |
| **Headline: BAO** | Permanent Marker (cursive) | Graffiti slap-tag badge with underline drip swoosh |
| **Role: FULLSTACK / ENGINEER** | Fredoka (700) | Rounded cyber punch text |
| **Role: DEVELOPER / &** | Fredoka (700) | Contrast secondary punch |
| **Role: SOFTWARE** | Saira Stencil One | Stencil cyber contrast text |
| **Monospace / Labels / UI** | JetBrains Mono | Micro-labels, stats, badges, buttons, code blocks |
| **Body / Paragraphs** | Inter | High readability bio and descriptions |

---

## 3. Dark & Light Mode Theme Rules

Theme transitions are managed dynamically via `:root[data-theme="light"]` and `:root[data-theme="dark"]`.

### Strict Guidelines for Colors & Glows
1. **Dark Mode (`data-theme="dark"`)**:
   - Background: Dark carbon `#08090c` with subtle grid lines.
   - Accents: Sky Blue `#38bdf8` with glowing neon dropshadows (`filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.75))`).
   - Text shadows: Soft neon halos allowed for floating accents.
2. **Light Mode (`data-theme="light"`)**:
   - Background: Clean off-white `#f8fafc`.
   - **Crucial Rule**: **NEVER** use neon glows (`drop-shadow` or bright `text-shadow`) on white backgrounds. They produce glare ("chói") and look washed out.
   - Overrides:
     - `.role-fredoka-blue`: Must use solid high-contrast `#0284c7` (Sky 600) with `text-shadow: none`.
     - `.role-engineer-float`: Set `filter: none; text-shadow: none;`.
     - `.role-fredoka-white`, `.role-amp`, `.role-stencil-text`: Use dark slate `#0f172a`.

---

## 4. Hero Section Layout Standards

The Hero section employs a balanced 2-column grid centered horizontally:

- **Main Grid Container (`.hero-main-grid`)**:
  ```css
  display: grid;
  grid-template-columns: minmax(0, 700px) minmax(340px, 450px);
  justify-content: center;
  gap: clamp(80px, 7vw, 120px);
  align-items: center;
  ```
- **Left Column (`.hero-left`)**:
  - Maximum width: `700px`.
  - `.role-line-2`: Must keep `flex-wrap: nowrap; white-space: nowrap;` and `margin-left: clamp(32px, 4vw, 68px)` so `& SOFTWARE ENGINEER` stays strictly on a single horizontal row.
  - 3 Stat Cards (`.hero-stats-cards-grid`): 3 equal columns (`repeat(3, 1fr)`) with 6 Figma-style selection handles (`.figma-handle`).
- **Right Column (`.hero-right`)**:
  - Contains `.avatar-panel-group` (max-width `450px`):
    - Hologram Card: 1:1 aspect ratio with corner bracket borders, border ticks, and glowing avatar frame.
    - LET'S CONNECT Card: Status indicator + 3 social link pills (Email, LinkedIn, GitHub).
- **Responsive Stacking**:
  - Below `1024px`, the grid collapses into a single column (`grid-template-columns: 1fr;`), ordering the avatar on top (`order: -1`).

---

## 5. Development & Deployment Procedures

### Local Development
```bash
# Start local dev server (auto-picks available port, e.g. 5173/5174)
npm run dev

# Verify production bundle builds cleanly
npm run build
```

### Deploying to Vercel
1. **Direct via Vercel CLI**:
   ```bash
   # Deploy preview
   npx vercel

   # Deploy directly to production
   npx vercel --prod
   ```
2. **Via GitHub Integration**:
   - Ensure changes are committed with `.gitignore` in place:
     ```bash
     git add .
     git commit -m "update: portfolio features"
     git push origin main
     ```
   - Vercel automatically detects Vite and triggers production deployment.

---

## 6. Pre-flight Verification Checklist

Before pushing or declaring work complete:
- [ ] Run `npm run build` and ensure exit code is `0` with no missing module errors.
- [ ] Ensure all imported icons in `src/main.jsx` are actually used (no unused Lucide imports).
- [ ] Verify both Dark Mode and Light Mode toggling for proper contrast and no glare.
- [ ] Confirm `& SOFTWARE ENGINEER` stays on one line across desktop viewport widths.
