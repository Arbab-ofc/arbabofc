# Arbab Arshad Portfolio

Modern, production-ready personal portfolio built with React and Vite. The project combines a design-forward UI system with Firebase-backed features, content scaffolding, and deployment automation to deliver a fast, scalable personal site.

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

- Responsive, sectioned layout with hero, about, skills, experience, projects, blog, achievements, and contact
- Modular data-driven sections designed for quick content changes
- Form handling with validation for contact and admin flows
- Animation layer for modern motion and micro-interactions
- PWA-ready configuration and SEO-friendly meta handling
- Firebase hosting and GitHub Actions deployment pipeline

## Project Structure

- `src/components/sections`: Core page sections and layout blocks
- `src/components/ui`: Shared UI primitives and reusable components
- `src/contexts`: Theme, auth, data, and chat providers
- `src/pages`: Route-level pages, detail views, and 404
- `src/data`: Content sources and structured data
- `public`: Static assets and SEO files
- `firebase.json` and `firestore.rules`: Hosting and security rules

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Create a `.env` file to store Firebase and Cloudinary keys. Example:

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

The site deploys to Firebase Hosting via GitHub Actions on every push to `main`.

- Workflow: `.github/workflows/firebase-hosting-merge.yml`
- Build: `npm ci && npm run build`
- Output: `dist`

## Roadmap

- Complete Firestore CRUD for admin CMS content
- Expand blog and project detail templates
- Add analytics and performance monitoring

## License

All rights reserved.
