import React from 'react';

const StatusBadge = ({ status, text }) => {
  const styles = {
    active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    default: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  };

  const selectedStyle = styles[status] || styles.default;

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${selectedStyle}`}>
      {text || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
