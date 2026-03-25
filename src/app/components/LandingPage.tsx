import React, { useState } from 'react';
import { Disc, Music, Zap, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  // ... baaki poora code same rahega ...

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // Supabase mein data bhejna
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: email }]);

      if (error) {
        console.error('Error saving email:', error.message);
        alert("May be this email already exits");
      } else {
        setSubmitted(true); // Isse "You're on the list" wala message dikhega
      }
    }
  };


  return (
  <div className="min-h-screen bg-[#080617] text-slate-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
    
    {/* Background Glows (Inhe rehne dena, sexy lagte hain) */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

    <div className="max-w-3xl w-full z-10 space-y-12">
      
      {/* Logo & Title Section */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="inline-flex p-4 bg-pink-500/10 border border-pink-500/20 rounded-3xl shadow-2xl shadow-pink-500/5">
          <Music className="w-12 h-12 text-pink-500" />
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase whitespace-nowrap" 
            style={{ fontFamily: "'Outfit', sans-serif" }}>
          KICK MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">SONG</span>
        </h1>

        {/* Action Button: Sirf ise rakhenge */}
        <div className="pt-4">
          <button 
            onClick={onGetStarted}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl shadow-pink-500/20 active:scale-95"
          >
            GET STARTED →
          </button>
        </div>
      </div>

      {/* Footer Features (Inhe niche rehne do, professional lagta hai) */}
      <div className="grid grid-cols-3 gap-8 pt-20 border-t border-white/5 opacity-50">
        <div className="flex flex-col items-center gap-2">
          <Zap className="w-5 h-5 text-pink-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold">AI Stem Extraction</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Pro Visualizers</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Disc className="w-5 h-5 text-blue-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Slowed & Reverb Lab</span>
        </div>
      </div>

    </div>

    {/* Small Footer Text */}
    <p className="absolute bottom-8 text-[10px] tracking-[0.2em] text-slate-500 uppercase font-medium">
      © 2026 KICKMYSONG.COM • POWERED BY SOLO ARTIST
    </p>
  </div>
);
}
