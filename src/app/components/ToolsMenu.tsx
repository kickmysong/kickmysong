import { Music, Zap, Disc, Scissors, MoveHorizontal, ArrowLeft } from 'lucide-react';

const tools = [
  { id: 'slowed', name: 'Slowed + Reverb', desc: 'Lofi vibes, studio quality', icon: <Music />, color: 'from-pink-500 to-purple-500' },
  { id: 'bass', name: 'Bass Boost (Xtreme)', desc: 'Thumping low-end for speakers', icon: <Zap />, color: 'from-blue-500 to-cyan-500' },
  { id: '8d', name: '8D Audio Surround', desc: '360° immersive experience', icon: <MoveHorizontal />, color: 'from-orange-500 to-red-500' },
  { id: 'split', name: 'Song Splitter (AI)', desc: 'Separate Vocals & Instruments', icon: <Scissors />, color: 'from-green-500 to-emerald-500' },
];

export default function ToolsMenu({ onBack, onSelectTool }: { onBack: () => void, onSelectTool: (id: string) => void }) {
  return (
    <div className="min-h-screen bg-[#080617] p-6 max-w-5xl mx-auto animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            KICK MY <span className="text-pink-500">TOOLS</span>
          </h1>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            onClick={() => onSelectTool(tool.id)} // 1. YE CLICK LOGIC HAI
            className="group relative cursor-pointer"
          >
            {/* 2. COMING SOON TAG LOGIC */}
            {tool.id !== 'slowed' && (
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-white/5 border border-white/10 text-[8px] px-3 py-1 rounded-full uppercase tracking-[0.2em] text-slate-500 font-bold backdrop-blur-md">
                  Coming Soon
                </span>
              </div>
            )}

            {/* Card UI */}
            <div className="relative p-[1px] rounded-[32px] bg-white/5 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-500 overflow-hidden">
              <div className="bg-[#0b081a] p-8 rounded-[31px] h-full transition group-hover:bg-[#0b081a]/90">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{tool.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
