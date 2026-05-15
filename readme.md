# Nexus Portfolio — Affan Adil

![Nexus Portfolio](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![No Dependencies](https://img.shields.io/badge/dependencies-none-success)

A production-ready, single-page portfolio website built from scratch with HTML, CSS, and vanilla JavaScript. No build tools, no frameworks — just clean code.

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in any modern browser
3. That's it. No `npm install`, no build steps.
nexus-portfolio/
├── index.html ← Open this file
├── css/
│ ├── base.css
│ ├── layout.css
│ ├── components.css
│ ├── animations.css
│ └── responsive.css
├── js/
│ ├── app.js
│ ├── cursor.js
│ └── loading.js
├── assets/ ← Place your images here
└── README.md

## ✨ Features

- **Single-page design** with smooth scrolling between all sections
- **Dark/Light theme** toggle with localStorage persistence
- **Custom cursor** with cyan main dot + 5 trailing dots (hidden on touch devices)
- **Full-screen preloader** with animated SVG logo and shimmer progress bar
- **Pure CSS hamburger menu** using hidden checkbox (JS only for outside-click closing)
- **Scroll animations** via Intersection Observer (fade-in + slide-up)
- **Tab visibility detection** — title changes when user switches away, hero pulses on return
- **Fully responsive** — breakpoints at 768px and 480px, `clamp()` for fluid typography
- **Zero dependencies** — only Google Fonts (loaded via CDN)

## 🎨 Design System

### Color Palette

| Variable     | Dark Theme   | Light Theme  |
|--------------|--------------|--------------|
| `--bg`       | `#0a0a0c`    | `#f5f5f7`    |
| `--surface`  | `#16161a`    | `#ffffff`    |
| `--text`     | `#e0e0e0`    | `#1a1a1a`    |
| `--accent`   | `#00e5ff`    | `#0077cc`    |
| `--secondary`| `#ffb300`    | `#c77d00`    |

### Typography

| Usage        | Font              | Weights          |
|--------------|-------------------|------------------|
| Headings     | Space Grotesk     | 400, 500, 700    |
| Body         | Inter             | 400, 500, 700    |
| Monospace    | JetBrains Mono    | 400, 500, 700    |

Font sizes use `clamp()` for fluid scaling across all viewports.

## 📄 Sections

1. **Navbar** — Logo "AA", navigation links, "Hire Us" CTA, theme toggle
2. **Hero** — Name, tagline, "See My Work" button
3. **About** — Personal bio and mission statement
4. **Skills** — 5 cards with emoji, title, description
5. **Projects** — 4 case study cards with "View Case Study" links
6. **Team** — 3 member cards with avatar initials, name, role, bio
7. **Contact** — Form (Name, Email, Message) + email & GitHub links
8. **Footer** — Copyright and tagline

## 🔧 Technical Details

### Preloader Logic
- Hardcoded in `index.html` to prevent FOUC
- Displays for minimum 1.5 seconds
- Hides only after both `window.load` and custom `components-ready` event

### Theme Toggle
- `data-theme` attribute on `<body>` switches between `"dark"` and `"light"`
- All colors defined as CSS custom properties
- User preference saved to `localStorage`

### Mobile Navigation
- Hidden checkbox (`#nav-toggle`) + CSS `:checked` sibling selector
- Hamburger icon animates to close icon
- JavaScript handles: link clicks close menu, outside click closes menu, Escape key closes menu

### Custom Cursor
- Only activates on `(any-pointer: fine)` devices
- RequestAnimationFrame loop with lerp-based trailing
- CSS media query hides cursor elements on touch devices

### Scroll Animations
- Elements with classes `.animate-on-scroll` or `.stagger-children`
- Intersection Observer with 15% threshold
- Animations trigger once (observer unobserves after firing)

## 🌐 Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge).

| Feature              | Required Support     |
|----------------------|----------------------|
| CSS Custom Properties| ✅ Universal         |
| CSS Grid             | ✅ Universal         |
| Intersection Observer| ✅ Universal         |
| `clamp()`            | ✅ Universal         |
| `requestAnimationFrame` | ✅ Universal      |

## 📝 License

MIT — free to use, modify, and distribute.

---

**Built from scratch with discipline and curiosity. © 2025 Affan Adil.**