# Pondok Lensa

A modern React.js application with TypeScript, Tailwind CSS, and Redux Toolkit.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🗂️ **Redux Toolkit** - State management
- 🧭 **React Router** - Client-side routing
- 🌙 **Dark Mode** - Theme switching with localStorage persistence
- 📦 **TypeScript** - Type safety
- 🎯 **ESLint** - Code linting

## Project Structure

```
pondok-lensa/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── store/           # Redux store and slices
│   │   └── slices/      # Redux slices
│   ├── hooks/           # Custom React hooks
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React** 18.3.1
- **TypeScript** 5.6.2
- **Vite** 5.4.2
- **Tailwind CSS** 3.4.13
- **Redux Toolkit** 2.2.7
- **React Router** 6.28.0

## Best Practices

- ✅ TypeScript for type safety
- ✅ Redux Toolkit for state management
- ✅ Custom hooks for Redux (useAppDispatch, useAppSelector)
- ✅ Component-based architecture
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Path aliases (@/*) for cleaner imports
