import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ToolsMenu from './components/ToolsMenu';
import AudioTool from './AudioTool'; 
import SiteHeader from './components/SiteHeader'; 
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

export default function App() {
  // 2. State update karo (privacy aur terms add kiya)
  const [view, setView] = useState<'landing' | 'dashboard' | 'privacy' | 'terms'>('landing');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // 3. Conditional Rendering (Landing Page wala logic wahi rahega)
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#080617] text-white flex flex-col pt-16">
      <SiteHeader onLogoClick={() => { setActiveTool(null); setView('dashboard'); }} onDashboardClick={() => { setActiveTool(null); }} />

      <main className="flex-grow p-4 md:p-10">
        {/* ASLI MAGIC YAHAN HAI */}
        {view === 'privacy' ? (
          <PrivacyPolicy onBack={() => setView('dashboard')} />
        ) : view === 'terms' ? (
          <TermsOfService onBack={() => setView('dashboard')} />
        ) : !activeTool ? (
          <ToolsMenu onBack={() => setView('landing')} onSelectTool={(id) => { if (id === 'slowed') setActiveTool('slowed'); }} />
        ) : (
          <AudioTool onBack={() => setActiveTool(null)} />
        )}
      </main>

      {/* FOOTER LINKS (AdSense yehi dekhta hai) */}
      <footer className="p-6 text-center border-t border-white/5 space-y-2">
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-500">
           <button onClick={() => setView('privacy')} className="hover:text-pink-500 transition-colors">Privacy Policy</button>
           <button onClick={() => setView('terms')} className="hover:text-pink-500 transition-colors">Terms of Service</button>
        </div>
        <p className="text-[9px] text-slate-700 tracking-widest uppercase">© 2026 Kick My Song Lab</p>
      </footer>
    </div>
  );
}
