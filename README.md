# Arbab Arshad Portfolio

Premium, performance-focused personal portfolio built with React and Vite. This repository ships a highly polished UI, rich content sections, and Firebase-backed deployment designed for fast iteration and a modern web presence.

## Live

- Website: https://www.arbabofc.me

## Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000000&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=ffffff&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=ffffff&style=for-the-badge)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2-319795?logo=chakraui&logoColor=ffffff&style=for-the-badge)
![Material UI](https://img.shields.io/badge/Material%20UI-5-007FFF?logo=mui&logoColor=ffffff&style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=000000&style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=ffffff&style=for-the-badge)

## Highlights

- Complete multi-section layout for hero, about, skills, experience, projects, blog, achievements, and contact
- Structured data sources for quick content updates without touching layout code
- Modern UI stack with utility styling, component libraries, and animation
- PWA-ready build configuration and SEO-friendly metadata
- Firebase Hosting deployment automated through GitHub Actions

## Repository Layout

- `portfolio-website`: The Vite app source and build output
- `.github/workflows`: CI and deploy workflows

## Local Setup

```bash
cd portfolio-website
npm install
npm run dev
```

## Build

```bash
cd portfolio-website
npm run build
npm run preview
```

## Environment

Create `portfolio-website/.env` and add keys for Firebase and Cloudinary:

```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Deployment

Firebase Hosting is deployed via GitHub Actions on every push to `main`.

- Workflow: `.github/workflows/firebase-hosting-merge.yml`
- Build: `npm ci && npm run build`
- Output: `dist`

## License

All rights reserved.
