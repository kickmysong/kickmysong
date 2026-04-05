import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ToolsMenu from './components/ToolsMenu';
import AudioTool from './AudioTool'; 
import SiteHeader from './components/SiteHeader'; 
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import InfoPage from './components/InfoPage';

export default function App() {
  // 2. State update karo (privacy aur terms add kiya)
const [view, setView] = useState<'landing' | 'dashboard' | 'privacy' | 'terms' | 'faq' | 'about' | 'contact'>('landing');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  // Step 3 Content (Inhe yahan define kar do)
  const FAQContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-pink-500 font-bold uppercase text-sm mb-2">What is Slowed and Reverb?</h3>
        <p>It's a music style where the track is slowed down and deep reverb is added to create a "Lofi" or atmospheric vibe.</p>
      </div>
      <div>
        <h3 className="text-pink-500 font-bold uppercase text-sm mb-2">Is my data safe?</h3>
        <p>100%. Everything happens in your browser. We never see or store your audio files.</p>
      </div>
    </div>
  );

 const AboutContent = (
  <div className="space-y-8">
    <section>
      <p className="text-lg leading-relaxed">
        Welcome to <span className="text-pink-500 font-bold">Kick My Song</span>, a premier digital audio workstation designed specifically for the modern independent creator. Founded by the team behind the <strong>Solo Artist Music</strong> YouTube channel (40,000+ subscribers), our platform was born out of a necessity to simplify high-quality audio manipulation.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Our Vision</h3>
      <p>
        In an era where "Slowed + Reverb" and "Lofi" aesthetics dominate the music industry, we realized that many artists struggle with complex software or privacy-invasive online tools. Our vision is to provide a <strong>minimalist, lightning-fast, and professional-grade</strong> environment where artists can transform their sound in seconds without any technical barriers.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">The "Privacy-First" Architecture</h3>
      <p>
        What sets us apart is our <strong>Client-Side Engine</strong>. Unlike traditional editors that upload your private audio files to a server, Kick My Song processes everything directly within your browser. Your music never leaves your computer. This architecture ensures 100% data privacy and significantly reduces processing time, as there are no upload or download delays.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Join the Community</h3>
      <p>
        Whether you are a budding phonk producer, a lofi enthusiast, or a professional solo artist, Kick My Song is built for you. We are constantly updating our algorithms to provide the smoothest reverb tails and the most precise pitch shifts in the industry.
      </p>
    </section>
  </div>
);

  const ContactContent = (
    <div className="space-y-8">
      <section className="text-center md:text-left">
        <p className="text-lg opacity-80">
          Connect with us across platforms! Whether it's a professional inquiry or you just want to join the <strong>Solo Artist</strong> community, we're just a click away.
        </p>
      </section>

      {/* Grid for 4 Clickable Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
        
        {/* 1. Official Email (Direct Gmail Compose) */}
        <a 
          href="mailto:soloartistcontact@gmail.com" 
          className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group block"
        >
          <h3 className="text-pink-500 font-black uppercase text-[10px] mb-1 tracking-widest">Official Email</h3>
          <p className="text-white font-bold text-sm">Send a Message</p>
          <p className="text-[9px] text-slate-500 mt-1 uppercase">Mail us</p>
        </a>

        {/* 2. YouTube Channel */}
        <a 
          href="https://youtube.com/@soloartist_music" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-red-500/50 hover:bg-red-500/5 transition-all block"
        >
          <h3 className="text-red-500 font-black uppercase text-[10px] mb-1 tracking-widest">YouTube</h3>
          <p className="text-white font-bold text-sm">@soloartist_music</p>
          <p className="text-[9px] text-slate-500 mt-1 uppercase">Watch Tutorials</p>
        </a>

        {/* 3. Telegram */}
        <a 
          href="https://t.me/soloartist_music"  /* <--- Yahan apna username check kar lena */
          target="_blank" 
          rel="noopener noreferrer"
          className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all block"
        >
          <h3 className="text-blue-400 font-black uppercase text-[10px] mb-1 tracking-widest">Telegram</h3>
          <p className="text-white font-bold text-sm">Join Community</p>
          <p className="text-[9px] text-slate-500 mt-1 uppercase">Get Free assets and secret tutorials</p>
        </a>

        {/* 4. Instagram */}
        <a 
          href="https://instagram.com/soloartist_music" /* <--- Yahan apna handle check kar lena */
          target="_blank" 
          rel="noopener noreferrer"
          className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all block"
        >
          <h3 className="text-purple-500 font-black uppercase text-[10px] mb-1 tracking-widest">Instagram</h3>
          <p className="text-white font-bold text-sm">Follow for Updates</p>
          <p className="text-[9px] text-slate-500 mt-1 uppercase">Daily Lofi Vibes</p>
        </a>

      </div>
    </div>
  );


  // 3. Conditional Rendering (Landing Page wala logic wahi rahega)
  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#080617] text-white flex flex-col pt-16">
      <SiteHeader onLogoClick={() => { setActiveTool(null); setView('dashboard'); }} onDashboardClick={() => { setActiveTool(null); }} />

      <main className="flex-grow p-4 md:p-10">
       
{view === 'privacy' ? (
  <PrivacyPolicy onBack={() => setView('dashboard')} />
) : view === 'terms' ? (
  <TermsOfService onBack={() => setView('dashboard')} />
) : view === 'faq' ? (
  <InfoPage title="Frequently Asked Questions" content={FAQContent} onBack={() => setView('dashboard')} />
) : view === 'about' ? (
  <InfoPage title="About Us" content={AboutContent} onBack={() => setView('dashboard')} /> 
): view === 'contact' ? (
  <InfoPage title="Contact Us" content={ContactContent} onBack={() => setView('dashboard')} />
) : !activeTool ? (
  <ToolsMenu onBack={() => setView('landing')} onSelectTool={(id) => { if (id === 'slowed') setActiveTool('slowed'); }} />
) : (
  <AudioTool onBack={() => setActiveTool(null)} />
)}

      </main>

      {/* FOOTER LINKS (AdSense yehi dekhta hai) */}
<footer className="p-6 text-center border-t border-white/5 space-y-4">
  <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] uppercase tracking-widest font-bold text-slate-500">
   <button onClick={() => setView('about')} className="hover:text-pink-500 transition-colors">About Us</button>
   <button onClick={() => setView('faq')} className="hover:text-pink-500 transition-colors">FAQs</button>
   <button onClick={() => setView('contact')} className="hover:text-pink-500 transition-colors">Contact Us</button>
   <button onClick={() => setView('privacy')} className="hover:text-pink-500 transition-colors">Privacy Policy</button>
   <button onClick={() => setView('terms')} className="hover:text-pink-500 transition-colors">Terms of Service</button>
</div>
<p className="text-[9px] text-slate-700 tracking-widest uppercase italic opacity-50">
  © 2026 Kick My Song • Powered by Solo Artist
</p>
</footer>

    </div>
  );
}
