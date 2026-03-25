import React from 'react';
import { Disc, LayoutDashboard } from 'lucide-react';

export default function SiteHeader({ onLogoClick, onDashboardClick }: { onLogoClick: () => void, onDashboardClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#080617]/90 backdrop-blur-sm border-b border-white/5 z-50 px-6 flex items-center justify-between">
      
      {/* MINIMALIST LOGO (TEXT-BASED) */}
      <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
          <Disc size={18} className="text-white group-hover:rotate-[360deg] transition-transform duration-700" />
        </div>
        <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
          KICK MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">SONG</span>
        </h1>
      </div>

      {/* QUICK DASHBOARD BUTTON */}
      <button 
        onClick={onDashboardClick} 
        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
      >
        <LayoutDashboard size={16} />
        <span className="text-xs uppercase tracking-widest font-bold hidden sm:inline">Dashboard</span>
      </button>
      
    </header>
  );
}
