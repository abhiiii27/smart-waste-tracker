<div align="center">
  <h1>♻️ EcoSort AI (Version 2)</h1>
  <p><strong>A Modern, AI-Powered Smart Waste Management SaaS Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status" />
    <img src="https://img.shields.io/badge/version-v2.0(Phase%201)-blue.svg" alt="Version" />
    <img src="https://img.shields.io/badge/React-18.x-61dafb.svg?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Vite-5.x-646cff.svg?logo=vite" alt="Vite" />
  </p>
</div>

---

## 📖 Project Overview

**EcoSort AI** is the Version 2 evolution of the original *ECOSORT* (Smart Waste Tracker). We are transitioning from a basic Python-rendered static web application to a fully decoupled, modern SaaS platform built on a scalable React + Vite + Tailwind architecture. 

The primary goal of EcoSort AI is to empower municipalities, smart cities, and eco-conscious communities to track, analyze, and optimize their waste management workflows using predictive analytics and gamification.

## 🎯 Objectives

- **Modernize Architecture:** Move to a professional, component-based frontend framework (React).
- **Premium Aesthetics:** Implement a glassmorphic, dark-mode-first dashboard suited for an enterprise AI tool.
- **AI-Ready Foundation:** Prepare the UI and infrastructure for future integration of Machine Learning (ML) classification and predictive optimization features.
- **Maintain Core Workflow:** Preserve the original ECOSORT workflows, such as scan history, gamification (Eco Points), and actionable waste guidelines.

---

## 🚧 Current Project Status

We are currently actively developing **EcoSort AI v2** on the `ecosort-ai-v2` branch.

- 🚧 **EcoSort AI v2:** In Active Development
- ✅ **Phase 1 Completed:** Dashboard UI Rebuild

> **Note:** The backend, authentication, and AI/ML capabilities are strictly planned for future phases. Current features rely on realistic local mock data.

---

## ✨ Phase 1 Features (Completed)

The following features have been fully implemented in the new UI:

- **Modern SaaS Dashboard:** A sleek, glassmorphism-inspired dark theme with eco-green accents.
- **Responsive UI:** Fully responsive grid layout across mobile, tablet, and desktop.
- **Sidebar Navigation:** Collapsible, modern sidebar for accessing key application modules.
- **Top Navigation Bar:** Global search, notifications, and user profile management.
- **Dashboard Overview Cards:** Real-time metrics for Waste Scanned, Items Recycled, Eco Points, and CO₂ Saved.
- **Waste Analytics Chart:** Dynamic area chart displaying weekly waste trends (powered by Recharts).
- **Eco Score Section:** A gamification panel showcasing current levels, total points, and progress bars.
- **Waste Categories:** Visual classification cards for Wet, Dry, Recyclable, and Hazardous waste.
- **Recent Activity:** A real-time log of recent waste scans and their classification status.
- **Clean Project Architecture:** Highly modular React component structure ensuring easy scaling for future phases.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS (v3.4)](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
client/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, SVGs, etc.
│   ├── components/         # Reusable UI components
│   │   ├── charts/         # Recharts implementations
│   │   ├── layout/         # Sidebar, TopNav, DashboardLayout
│   │   └── ui/             # GlassCards, StatCards, Badges, etc.
│   ├── data/               # mockData.js (Local state simulation)
│   ├── pages/              # Main view components (e.g., Dashboard.jsx)
│   ├── App.jsx             # Route definitions
│   ├── index.css           # Tailwind imports and base styles
│   └── main.jsx            # Application entry point
├── package.json            
├── postcss.config.js       
├── tailwind.config.js      
└── vite.config.js          
```

---

## 🚀 Installation Guide

To run Phase 1 locally:

1. **Clone the repository and checkout the v2 branch:**
   ```bash
   git clone https://github.com/abhiiii27/ECOSORT.git
   cd ECOSORT
   git checkout ecosort-ai-v2
   ```

2. **Navigate to the client directory:**
   ```bash
   cd client
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the app:**
   Open `http://localhost:5173` in your browser.

---

## 📸 Screenshots

*(Screenshots will be added as phases are completed)*

| Dashboard Overview | Mobile View |
| :---: | :---: |
| `[ Placeholder: Dashboard Image ]` | `[ Placeholder: Mobile Image ]` |

---

## 🗺️ Development Roadmap

- [x] **Phase 1 — Dashboard UI (Completed)**
- [ ] **Phase 2 — Complete Frontend**
  - Analytics Page
  - Smart Bins Overview
  - Reports Generation
  - Settings Panel
  - AI Insights UI
- [ ] **Phase 3 — Backend Integration**
  - REST API connection
  - User Authentication & Sessions
  - Database Migration
- [ ] **Phase 4 — AI & Machine Learning**
  - Overflow Predictions
  - Smart Routing for Collection
- [ ] **Phase 5 — Computer Vision**
  - Real-time waste classification via camera
- [ ] **Phase 6 — Deployment & Production**
  - CI/CD Pipelines
  - Cloud Hosting

---

## 🤖 Future AI Features

While not currently implemented, EcoSort AI is designed specifically to integrate the following technologies in upcoming phases:
- **Predictive Analytics:** Forecasting bin overflow risks based on historical data.
- **Smart Recommendations:** Generating actionable insights for users to improve their recycling efficiency.
- **Image Recognition:** Automatically identifying and classifying waste types from uploaded photos.

---

## 🤝 Contribution Guide

We welcome contributions! As this is an ongoing upgrade, please ensure you are targeting the `ecosort-ai-v2` branch for all PRs. 
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Abhii**  
- GitHub: [@abhiiii27](https://github.com/abhiiii27)
