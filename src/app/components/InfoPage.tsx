export default function InfoPage({ title, content, onBack }: { title: string, content: React.ReactNode, onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 text-slate-300 bg-[#080617] min-h-screen">
      <button onClick={onBack} className="mb-8 text-pink-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-all">
        ← Back to Home
      </button>
      
      <h1 className="text-4xl md:text-6xl font-black text-white mb-10 uppercase italic italic tracking-tighter">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === title.split(' ').length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500" : ""}>
            {word}{' '}
          </span>
        ))}
      </h1>

      <div className="space-y-8 text-base md:text-lg opacity-90 leading-relaxed text-justify">
        {content}
      </div>
    </div>
  );
}
