# fpv-faque

> A showcase website for FPV drone videography — built to help a passionate pilot share his work and grow his audience.

Live at [fpv-faque.vercel.app](https://fpv-faque.vercel.app)

---

## About

fpv-faque is a personal portfolio site for an FPV drone pilot. The goal is simple: show off cinematic drone footage, reach potential clients, and turn a hobby into something more. Built with care so the visuals do the talking.

## Features

- 🎬 Video showcase with YouTube embeds and cinematic background video
- 🌍 Bilingual — English and Spanish (via `next-intl`)
- ⚡ Fast and lightweight with `react-lite-youtube-embed`
- 📱 Fully responsive

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [next-intl](https://next-intl-docs.vercel.app) — i18n routing (EN / ES)
- [react-lite-youtube-embed](https://github.com/ibrahimcesar/react-lite-youtube-embed)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it'll redirect to `/en` by default.

## Project Structure

```
src/
  app/
    [locale]/       # i18n routing
  components/       # UI components
messages/
  en.json           # English translations
  es.json           # Spanish translations
public/
  videos/           # Background video assets
  images/           # Static images
```

## Internationalization

The app supports English (`/en`) and Spanish (`/es`). Translations live in `messages/`. To add a new language, add a JSON file there and update the `next-intl` config.

## Deployment

Deployed on [Vercel](https://vercel.com). Each push to `main` triggers a new production deployment automatically.

---

Made with 🚁 by [Sebastian Pellitero](https://sebastianpellitero.dev) for a friend who flies things.
