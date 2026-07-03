import React from 'react';
import { 
  ScanLine, 
  Recycle, 
  Award, 
  CloudRain, 
  BookOpen, 
  AlertOctagon, 
  History,
  Droplets,
  Wind,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import StatusBadge from '../components/ui/StatusBadge';
import ProgressBar from '../components/ui/ProgressBar';
import WasteTrendChart from '../components/charts/WasteTrendChart';
import { 
  dashboardStats, 
  ecoScore, 
  recentActivity, 
  wasteClassifications 
} from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">EcoSort Dashboard</h1>
          <p className="text-slate-400 text-sm">Your smart waste tracking overview.</p>
        </div>
        
        {/* Placeholder for future AI Widget (e.g. Smart Alerts Button) */}
        <div className="hidden md:block">
          <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
            AI Optimization (Coming Soon)
          </button>
        </div>
      </div>

      {/* Activity Overview (Original 4 stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Waste Scanned" 
          value={dashboardStats.wasteScanned} 
          icon={ScanLine} 
          trend="up" 
          trendValue="12" 
        />
        <StatCard 
          title="Items Recycled" 
          value={dashboardStats.itemsRecycled} 
          icon={Recycle} 
          trend="up" 
          trendValue="8" 
        />
        <StatCard 
          title="Eco Points" 
          value={dashboardStats.ecoPoints} 
          icon={Award} 
          trend="up" 
          trendValue="150" 
        />
        <StatCard 
          title="CO₂ Saved (kg)" 
          value={dashboardStats.co2Saved} 
          icon={CloudRain} 
        />
      </div>

      {/* Main Grid: Charts & Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Analytics Chart */}
        <div className="lg:col-span-2">
          <WasteTrendChart />
        </div>

        {/* Eco Score & Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Eco Score Gamification */}
          <GlassCard className="flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Eco Score</h3>
              <div className="p-2 bg-primary/20 rounded-full text-primary">
                <Award size={20} />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-3xl font-bold text-emerald-400 mb-1">{ecoScore.points}</p>
              <p className="text-sm text-slate-400">Total Points Earned</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium">Level: {ecoScore.currentLevel}</span>
                <span className="text-slate-400 text-xs">Next: {ecoScore.nextLevel}</span>
              </div>
              <ProgressBar value={ecoScore.progress} color="bg-emerald-500" />
              <p className="text-xs text-right text-slate-400 mt-1">{ecoScore.progress}% to next level</p>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/50 hover:bg-primary/20 hover:text-primary transition-colors text-slate-300">
                <ScanLine size={20} />
                <span className="text-xs font-medium">Scan Waste</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 hover:text-blue-400 transition-colors text-slate-300">
                <BookOpen size={20} />
                <span className="text-xs font-medium">View Guide</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/50 hover:bg-red-500/20 hover:text-red-400 transition-colors text-slate-300">
                <AlertOctagon size={20} />
                <span className="text-xs font-medium">Report Issue</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-800/50 hover:bg-amber-500/20 hover:text-amber-400 transition-colors text-slate-300">
                <History size={20} />
                <span className="text-xs font-medium">View History</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Lower Section: Classifications & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Waste Classifications */}
        <div className="lg:col-span-1">
          <GlassCard className="h-full">
            <h3 className="text-lg font-bold text-white mb-6">Classifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Droplets className="text-emerald-400 mb-2" size={24} />
                <span className="text-sm font-medium text-slate-200">Wet Waste</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Wind className="text-amber-400 mb-2" size={24} />
                <span className="text-sm font-medium text-slate-200">Dry Waste</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <Recycle className="text-blue-400 mb-2" size={24} />
                <span className="text-sm font-medium text-slate-200">Recyclable</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <AlertTriangle className="text-red-400 mb-2" size={24} />
                <span className="text-sm font-medium text-slate-200">Hazardous</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Scans</h3>
              <button className="text-primary text-sm font-medium hover:text-emerald-400 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-slate-800/40 rounded-lg transition-colors border border-transparent hover:border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'recyclable' ? 'bg-emerald-500/20 text-emerald-400' :
                      activity.type === 'organic' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {activity.type === 'recyclable' ? <Recycle size={18} /> :
                       activity.type === 'organic' ? <Wind size={18} /> :
                       <AlertTriangle size={18} />}
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        <span className="font-medium text-slate-300">{activity.user}</span> scanned <span className="font-medium text-primary">{activity.item}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                  <div>
                    <StatusBadge 
                      status={
                        activity.tag === 'Safe' ? 'active' : 
                        activity.tag === 'Organic' ? 'warning' : 'critical'
                      } 
                      text={activity.tag} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
