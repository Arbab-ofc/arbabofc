# Arbab Arshad Portfolio

High-end, performance-focused personal portfolio built with React and Vite. The codebase emphasizes a clean information architecture, visually rich sections, and a deployment workflow that keeps production in sync with GitHub.

## Live

- Website: https://www.arbabofc.me

## Tech Stack

Core UI and build tools:

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000000&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=ffffff&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=ffffff&style=for-the-badge)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2-319795?logo=chakraui&logoColor=ffffff&style=for-the-badge)
![Material UI](https://img.shields.io/badge/Material%20UI-5-007FFF?logo=mui&logoColor=ffffff&style=for-the-badge)

Platform and services:

![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=000000&style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=ffffff&style=for-the-badge)

## What This Portfolio Delivers

- Multi-section narrative layout covering hero, about, skills, experience, projects, blog, achievements, and contact
- Data-driven content sources so updates can be made without touching layout logic
- UI system that blends utility-first styling with component libraries for speed and consistency
- Motion and interaction layers that keep the experience modern without sacrificing performance
- Firebase Hosting integration with GitHub Actions for automated production releases

## Repository Map

```text
.
├── portfolio-website       Vite app and source code
└── .github/workflows       GitHub Actions deploy pipelines
```

## Local Development

```bash
cd portfolio-website
npm install
npm run dev
```

Explanation:

- `npm install` pulls dependencies and generates the lockfile used by CI
- `npm run dev` starts the Vite dev server with fast refresh

## Production Build

```bash
cd portfolio-website
npm run build
npm run preview
```

Explanation:

- `npm run build` generates a production build into `dist`
- `npm run preview` serves the build locally to verify before deploy

## Environment Configuration

Create `portfolio-website/.env` and define the variables below. These values connect the UI to Firebase and enable media uploads through Cloudinary.

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

## Deployment Pipeline

Deployments are handled by GitHub Actions and published to Firebase Hosting on every push to `main`.

- Workflow file: `.github/workflows/firebase-hosting-merge.yml`
- Build command: `npm ci && npm run build` (runs inside `portfolio-website`)
- Output folder: `portfolio-website/dist`

## Customization Guide

- Update section content in `portfolio-website/src/data` to refresh copy and lists
- Adjust layout and visuals in `portfolio-website/src/components/sections`
- Modify global styling in `portfolio-website/src/index.css` and Tailwind config
- Replace assets in `portfolio-website/public` for brand visuals and metadata

## License

All rights reserved.
