import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'bg-primary' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <div 
        className={`${color} h-2 rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
