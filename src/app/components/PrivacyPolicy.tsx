export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-300 leading-relaxed">
      <button onClick={onBack} className="mb-8 text-pink-500 font-bold uppercase tracking-widest text-xs">← Back to Home</button>
      <h1 className="text-4xl font-black text-white mb-6 uppercase italic">Privacy Policy</h1>
      <p className="mb-4 text-sm">Welcome to Kick My Song. Your privacy is critically important to us.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">1. Information We Collect</h2>
      <p className="mb-4 text-sm opacity-80 text-justify">Kick My Song is a client-side tool. We do NOT store your audio files on any server. All audio processing (Slowed + Reverb) happens directly in your browser. We may collect minimal data like browser type for analytics to improve our service.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">2. Cookies and Ads</h2>
      <p className="mb-4 text-sm opacity-80 text-justify">We use Google AdSense to serve ads. Google may use cookies to show ads based on your visits to this and other websites. You can opt-out by visiting Google’s Ad settings.</p>
      <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">3. Contact Us</h2>
      <p className="mb-4 text-sm opacity-80">If you have any questions, reach out to us at: <span className="text-pink-500 font-bold uppercase italic">soloartistcontact@gmail.com</span></p>
    </div>
  );
}
