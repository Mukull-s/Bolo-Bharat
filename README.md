# Bolo Bharat

AI voice assistant for rural India — information on government schemes, daily services, and general help using voice or chat.

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** (v4)
- **React Router**

## Project Structure

```
src/
├── assets/          # Images, fonts, etc.
├── components/      # Reusable UI (e.g. Layout)
├── pages/           # Route pages
│   ├── Landing.jsx
│   ├── Services.jsx
│   ├── Chat.jsx
│   └── About.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Routes

| Path       | Page     |
|-----------|----------|
| `/`       | Landing  |
| `/services` | Services |
| `/chat`   | Chat     |
| `/about`  | About    |

Frontend only — no backend yet.
