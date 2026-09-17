# Empower U Service — Static Website

A clean, fully static NDIS support-service website (no build step, no backend required).

## Stack
- Pure HTML / CSS / JS — open `index.html` directly or serve the folder
- Responsive layout (mobile hamburger menu)
- Accessibility toolbar (A+/A−/high contrast/reset), preferences saved in `localStorage`
- Contact form wired to **Formspree** (`contact.html`) — no server needed

## Brand & Content
- **Name**: Empower U Service (logo: `Empower` green + `UService` gold)
- **ABN**: 72 674 884 470 · **ACN**: 674 884 470
- **Email**: hello@empoweruservice.com
- **Colours**: Australian green `#00843D` + gold `#FFD200` (Socceroos-inspired), defined as CSS variables in `:root` — change in one place to re-skin the whole site
- **Hero**: `assets/images/hero.jpg` (aged-care scene). Swap in your own 1920×1080 image if desired

## Services page
`services.html` lists the full range of registered NDIS supports, **organised into 4 categories** (no item codes exposed on the page):

1. **Core Supports** — everyday personal, transport, household & community participation
2. **Capacity Building** — innovative participation, life skills, early childhood, support coordination
3. **Specialist & Clinical** — high-intensity personal care, behaviour support, nursing, shared-living daily tasks
4. **Accommodation & Complex Support** — life-stage transitions, SIL, Module 2A restrictive-practice supports

A **jump-nav** at the top of the page lets visitors anchor-link straight to any category (`#core`, `#capacity`, `#clinical`, `#accommodation`). Smooth scroll is enabled globally (`scroll-behavior: smooth`).

> Service descriptions are generic NDIS category summaries — review against your actual registered scope before going live.

## Running locally
```bash
cd empoweru-clone
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
Drag the folder to **Vercel / Netlify**, or connect a GitHub repo and enable **GitHub Pages** — no build command required.

## Enabling the contact form
1. Sign up at [formspree.io](https://formspree.io), create a form, copy the ID
2. In `contact.html`, restore the `<form>` (currently commented out) and replace `YOUR_FORM_ID`
3. Remove the `form-notice` placeholder
