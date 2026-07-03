import React from 'react';
import GlassCard from './GlassCard';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => {
  const isPositive = trend === 'up';
  
  return (
    <GlassCard className="flex flex-col animate-fade-in glass-hover">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '↑' : '↓'} {trendValue}
          </span>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
