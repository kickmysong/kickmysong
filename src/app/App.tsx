import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ToolsMenu from './components/ToolsMenu';
import AudioTool from './AudioTool'; 
import SiteHeader from './components/SiteHeader'; 

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }

  return (
    // md:pt-20 matlab PC par zyada gap, pt-16 matlab mobile par normal gap
    <div className="min-h-screen bg-[#080617] text-white flex flex-col pt-16 md:pt-20">
      
      <SiteHeader 
        onLogoClick={() => { setActiveTool(null); setView('dashboard'); }} 
        onDashboardClick={() => { setActiveTool(null); }} 
      />

      {/* p-4 (Mobile) aur md:p-10 (PC) - Isse mobile par side margins kam ho jayengi */}
      <main className="flex-grow p-4 md:p-10 animate-in fade-in duration-500">
        
        <div className="max-w-6xl mx-auto w-full">
          {!activeTool ? (
            <ToolsMenu
              onBack={() => setView('landing')}
              onSelectTool={(id) => {
                if (id === 'slowed') setActiveTool('slowed');
                else alert("Coming Soon: this tool is under development🧪");
              }}
            />
          ) : (
            // w-full aur mx-auto ensures ki tool center mein rahe aur screen ke bahar na jaye
            <div className="w-full mx-auto animate-in slide-in-from-bottom-4 duration-500">
               {activeTool === 'slowed' && <AudioTool onBack={() => setActiveTool(null)} />}
            </div>
          )}
        </div>

      </main>

      {/* Mobile par footer chota dikhega */}
      <footer className="p-6 text-center text-[9px] md:text-[10px] text-slate-700 uppercase tracking-widest border-t border-white/5">
        Solo Artist Lab • KickMySong 2026
      </footer>
    </div>
  );
}

