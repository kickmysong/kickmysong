import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ToolsMenu from './components/ToolsMenu';
import AudioTool from './AudioTool'; // Aapka purana tool jisme sliders hain
import SiteHeader from './components/SiteHeader'; // Jo naya logo wala header banaya hai

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // 1. Agar user landing page par hai, toh purana LandingPage dikhao (Bina logo header ke)
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }

  // 2. Agar user ne 'Get Started' daba diya hai, toh Fixed Logo Layout dikhao
  return (
    <div className="min-h-screen bg-[#080617] text-white flex flex-col pt-16">
      
      {/* HAMESHA DIKHNE WALA HEADER (Logo + Dashboard Button) */}
      <SiteHeader 
        onLogoClick={() => { setActiveTool(null); setView('dashboard'); }} 
        onDashboardClick={() => { setActiveTool(null); }} 
      />

      {/* BAAKI CONTENT JO CHANGE HOGA */}
      <main className="flex-grow p-6 animate-in fade-in duration-300">
        {!activeTool ? (
          // Jab koi tool select nahi hai, toh Dashboard cards dikhao
         <ToolsMenu
  onBack={() => setView('landing')} // <--- BAS YE EK LINE ADD KARNI HAI YAHAN
  onSelectTool={(id) => {
    if (id === 'slowed') setActiveTool('slowed');
    else alert("Coming Soon: Ye tool abhi lab mein taiyaar ho raha hai! 🧪");
  }}
/>
        ) : (
          // Jab 'Slowed + Reverb' card pe click kiya, toh aapka Tool dikhao
          <div className="animate-in slide-in-from-right-8 duration-500">
             {activeTool === 'slowed' && <AudioTool onBack={() => setActiveTool(null)} />}
          </div>
        )}
      </main>

    </div>
  );
}
