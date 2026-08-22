# Hema Birthday App

Greenery-themed React app scaffold (Vite + React + Framer Motion).

Quick start:

```bash
npm install
npm run dev
```

Adding personal photos, videos and music

- Permanent files: place your files in `public/media/` (create the folder). Then edit `src/media.js` to reference the filenames (example: `"/media/my-photo.jpg"`). Vite serves `public/` at the site root.
- Temporary preview: use the in-app "Add files" button in the Photos & Videos section; that uses the browser's temporary object URLs so you can test without copying files to the repo.

Supported media types: images (jpg/png/webp), videos (mp4/webm) and audio (mp3/ogg). For best results, use optimized images and compressed audio.

When you're ready, build for production:

```bash
npm run build
npm run preview
```
