# Udupi Academy

Premium vocational and professional training institute website for **Udupi Academy**, built as a static SPA with Vite + React + TanStack Router.

## Tech Stack

- Vite + React 19
- TanStack Router (client-side)
- Tailwind CSS v4
- Radix UI + shadcn/ui
- TypeScript

## Development

Requires Node.js 18+.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to any static host (Vercel, Netlify, etc.).

## Deploy on Vercel

The included `vercel.json` rewrites all routes to `index.html` for client-side routing. No additional configuration needed — just connect the repository and deploy.
