import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';

// Placeholder components for Phase 2 pages
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-96 glass rounded-xl">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400">This page will be implemented in Phase 2.</p>
    </div>
  </div>
);

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Placeholder title="Analytics" />} />
        <Route path="/smart-bins" element={<Placeholder title="Smart Bins" />} />
        <Route path="/ai-insights" element={<Placeholder title="AI Insights" />} />
        <Route path="/reports" element={<Placeholder title="Reports" />} />
        <Route path="/settings" element={<Placeholder title="Settings" />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
