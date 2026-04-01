# Finance Dashboard UI

A beautifully minimal, fast, and feature-complete Finance Dashboard built using React, Vite, and native CSS. 

![Finance Dashboard](https://via.placeholder.com/1200x600.png?text=Finance+Dashboard+UI)

## 📌 Project Overview
This project is an assignment designed to evaluate frontend structural approach, aesthetic intuition, and state management. The key constraints of **keeping the codebase minimalistic** and **highly comprehensible** have driven every architectural decision.

Instead of relying on heavy CSS-in-JS libraries or complex charting dependencies like Recharts, this application uses **native CSS properties**, **flexbox math modeling**, and **React Context-less top-down data flow**.

## 🚀 Features
- **Zero-Dependency Charts**: Pure CSS flexbox is mathematically sized using React variables, dropping the need for massive chart engines.
- **Micro-State Management**: State (`transactions`, `theme`, `role`) lives entirely inside `App.jsx`, minimizing deeply nested drilling while retaining perfect synchronization across sibling components.
- **Glassmorphic Premium Theme**: Implements a standard modern UX utilizing `backdrop-filter` and transparent RGBA layering alongside a Dark/Light toggle.
- **RBAC Simulation**: Viewer mode keeps things read-only. Admin mode dynamically renders "Add" forms and "Delete" column buttons.

## 📥 Setup Instructions
Since this project uses no external dependencies outside of standard `lucide-react` icons, getting it running locally is near instant.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for deployment
npm run build
```

## 🧠 Design Philosophy
1. **Less is More:** Why pull down a 500kb Recharts library when exactly 12 lines of CSS Flexbox can perfectly render a time-sensitive bar chart.
2. **Accessible Native Code:** The code is completely comprehensible for a junior dev or an interviewer reading it on a mobile device.
3. **Speed to Deploy:** Because of the lean architecture, the Vercel cold boot and build times are near-perfect.
