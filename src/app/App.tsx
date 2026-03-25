import React, { useState } from 'react';
import { Mail, Music, Zap, Sparkles } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Email collected:", email);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center p-6 font-sans overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-3xl w-full text-center z-10 space-y-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-3xl shadow-[0_0_30px_rgba(236,72,153,0.15)]">
            <Music className="w-12 h-12 text-pink-500" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">
            KICK MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">SONG</span>
          </h1>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-300">
            The Ultimate Slowed + Reverb Lab is coming.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Transforming your tracks with AI stems, custom visualizers, and pro-grade audio effects. Stay tuned for the drop.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto pt-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col sm:flex-row gap-2 bg-slate-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
                <div className="flex-1 flex items-center px-4">
                  <Mail className="w-5 h-5 text-slate-500 mr-3" />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-600 w-full text-sm"
                    required
                  />
                </div>
                <button type="submit" className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-pink-900/20">
                  GET EARLY ACCESS
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-emerald-400 font-bold flex items-center justify-center gap-2 animate-in zoom-in-95 duration-300">
              <Sparkles className="w-5 h-5" />
              You're on the list! We'll notify you soon.
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
          <div className="flex flex-col items-center space-y-2">
            <Zap className="w-5 h-5 text-pink-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Stem Extraction</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pro Visualizers</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Music className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Slowed & Reverb Lab</span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
        © 2026 KICKMYSONG.COM • Powered by Solo Artist
      </footer>
    </div>
  );
}
