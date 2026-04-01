# Finance Dashboard UI

A beautifully minimal, fast, and feature-complete Finance Dashboard built using React, Vite, and native CSS. 

![Finance Dashboard](https://via.placeholder.com/1200x600.png?text=Finance+Dashboard+UI)

## 📌 Project Overview
This project is an assignment designed to evaluate frontend structural approach, aesthetic intuition, and state management. The key constraints of **keeping the codebase minimalistic** and **highly comprehensible** have driven every architectural decision.

Instead of relying on heavy CSS-in-JS libraries or complex charting dependencies like Recharts, this application uses **native CSS properties**, **flexbox math modeling**, and **React Context-less top-down data flow**.

## 🏗 System Architecture (Zoomable Component Diagram)
Below is the system architecture representing the component hierarchy and data flow.

```mermaid
graph TD
    %% Define Styles
    classDef default fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC,rx:5px,ry:5px;
    classDef root fill:#3B82F6,stroke:#2563EB,color:white,font-weight:bold;
    classDef state fill:#10B981,stroke:#047857,color:white;
    classDef pure fill:#475569,stroke:#64748B,color:#E2E8F0;

    A[App Shell<br/>(App.jsx)]:::root

    subgraph StateManagement [Global State Layer]
        S1((Theme)):::state
        S2((Role:<br/>Admin/Viewer)):::state
        S3((Transactions Array)):::state
    end

    A --> StateManagement

    %% Components
    A --> O[Overview Component]:::default
    A --> L[TransactionList Component]:::default
    A --> M{TransactionModal Component}:::default
    A --> N[Sidebar Navigation]:::pure

    %% Overview breakdown
    O --> O1[Summary Cards<br/>Balance/Income/Expense]:::pure
    O --> O2[CSS Bar Charts<br/>7-day trend]:::pure
    O --> O3[AI Insights Widget]:::pure

    %% TransactionList breakdown
    L --> L1[Search & Filter Controls]:::pure
    L --> L2[Data Table List]:::pure

    %% Interaction Paths
    M -. "fires onSave(data)" .-> S3
    L2 -. "fires onDelete(id) if Admin" .-> S3
    S3 -. "derives Balance, Charts, List" .-> O
    S3 -. "filters & maps" .-> L

    style StateManagement fill:transparent,stroke:#334155,stroke-dasharray: 5 5;
```

> **Tip:** If viewing on GitHub, you can click on the diagram to zoom and pan.

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
