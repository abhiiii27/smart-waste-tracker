import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const TopNavbar = () => {
  return (
    <header className="h-20 glass border-b border-card-border sticky top-0 z-10 flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-3 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700/50 w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bins, alerts, analytics..." 
            className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-start"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">EcoSort HQ</p>
            <p className="text-xs text-emerald-400">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
