import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { recyclingData } from '../../data/mockData';
import GlassCard from '../ui/GlassCard';

const RecyclingRateChart = () => {
  return (
    <GlassCard className="h-96 flex flex-col items-center justify-center relative">
      <div className="absolute top-6 left-6">
        <h3 className="text-lg font-bold text-white">Recycling Rate</h3>
        <p className="text-sm text-slate-400">Current AI efficiency</p>
      </div>

      <div className="w-full h-full mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={recyclingData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1500}
            >
              {recyclingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-5">
        <span className="text-4xl font-bold text-white block">68%</span>
        <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Efficient</span>
      </div>
    </GlassCard>
  );
};

export default RecyclingRateChart;
