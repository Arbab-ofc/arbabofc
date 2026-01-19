# Arbab Arshad Portfolio

Luxury-grade personal portfolio built with React 18, Vite, Tailwind CSS, Chakra UI, Material-UI, Firebase, and Cloudinary. The project includes real-time chat scaffolding, admin CMS shell, PWA setup, and SEO-ready pages.

## Quickstart

```bash
npm install
npm run dev
```

## Tech Highlights

- React 18 + Vite with React Router v6
- Tailwind CSS + Chakra UI + Material-UI theming
- Firebase (Auth, Firestore, Storage) with anonymous auth auto-sign-in
- Cloudinary upload utility with presets
- React Hook Form + Zod validation for forms
- Framer Motion animations, Lucide icons, React Markdown
- PWA via `vite-plugin-pwa`, manifest, and offline-ready service worker

## Structure

- `src/contexts`: Theme, Auth, Data, and Chat providers
- `src/components/sections`: Hero, About, Skills, Experience, Roadmaps, Projects, Blog, Achievements, Contact, Chat
- `src/pages`: Home, Project/Blog detail, Admin login/dashboard, 404
- `src/data`: Seed data aligned to the provided resume and roadmap
- `firestore.rules` / `firebase.json`: Hosting and security baselines

## Next Steps

- Wire CRUD actions to Firestore collections and Cloudinary uploads
- Connect chat/messages to Firestore real-time listeners
- Add analytics and resume storage endpoints
- Expand admin dashboard panels for each collection

