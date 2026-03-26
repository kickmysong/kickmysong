export default function TermsOfService({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 text-slate-300 leading-relaxed bg-[#080617] min-h-screen">
      <button 
        onClick={onBack} 
        className="mb-8 text-pink-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">
        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Service</span>
      </h1>

      <div className="space-y-10 text-sm md:text-base opacity-90">
        
        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">1. Acceptance of Terms</h2>
          <p>
            Welcome to Kick My Song (hereinafter referred to as "the Site," "we," "us," or "our"). By accessing, browsing, or using the Site and its associated audio processing tools, you (the "User") acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Kick My Song, powered by Solo Artist. If you do not agree to these terms, you must immediately cease all use of the Site and its services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">2. Description of Services</h2>
          <p>
            Kick My Song provides a high-performance, web-based digital signal processing (DSP) suite specialized in "Slowed + Reverb" audio manipulation. Our platform utilizes advanced Web Audio API technology to process audio files locally within the User's browser environment. 
          </p>
          <p className="mt-4">
            <strong>Non-Server Processing:</strong> Users are hereby notified that Kick My Song operates on a "Client-Side" architecture. We do not upload, store, or transmit your raw audio data to any external servers. All manipulations and final renders occur strictly within your local machine's memory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">3. Intellectual Property Rights</h2>
          <ul className="list-disc ml-6 space-y-4">
            <li><strong>User Content:</strong> You retain full ownership and intellectual property rights to any audio files you upload to the platform. Kick My Song does not claim any rights, title, or interest in your original works.</li>
            <li><strong>Platform Assets:</strong> All software, algorithms, source code, UI designs, logos, and trademarks associated with "Kick My Song" and "Solo Artist" are the exclusive property of the Site owners and are protected by international copyright and trademark laws. Unauthorized reproduction or reverse engineering is strictly prohibited.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">4. User Responsibilities & Copyright Compliance</h2>
          <p>
            The User represents and warrants that they possess the necessary licenses, rights, and permissions to process any audio file used on the Site. Kick My Song is a neutral tool and is not responsible for any copyright infringement committed by the User.
          </p>
          <p className="mt-4">
            You agree NOT to use the Site to process content that is:
            <br />• Infringing on third-party intellectual property or privacy rights.
            <br />• Defamatory, obscene, or harmful to minors.
            <br />• Intended for bulk automated distribution or spamming.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">5. Disclaimer of Warranties</h2>
          <p className="italic uppercase font-bold text-slate-400">
            KICK MY SONG IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p className="mt-4">
            We do not warrant that the audio processing results will meet your specific aesthetic requirements, that the Site will be uninterrupted, or that the rendered files will be compatible with all media players. While we strive for peak performance, technical glitches or browser-specific rendering issues may occur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Kick My Song, its developers, and Solo Artist shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, including but not limited to loss of data, hardware damage, or profit loss, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">7. Third-Party Advertising (AdSense)</h2>
          <p>
            We utilize Google AdSense and other third-party advertising partners to display advertisements on the Site. These partners may use cookies and web beacons to collect non-personal information to provide personalized ads. We are not responsible for the content, privacy policies, or practices of any third-party advertisers or websites linked through our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-white/10 pb-2">8. Modifications and Updates</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Significant changes will be noted via the "Last Updated" date at the bottom of this page. Your continued use of the Site following the posting of any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section className="border-t border-white/10 pt-8 pb-12">
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">9. Contact and Legal Inquiries</h2>
          <p>
            For legal inquiries, copyright claims (DMCA), or technical support regarding these terms, please contact the administrator:
          </p>
          <p className="mt-6 font-black text-white text-xl tracking-tight">
            soloartist.music.official@gmail.com
          </p>
        </section>

        <footer className="text-[10px] text-slate-500 uppercase tracking-[0.3em] py-6 border-t border-white/5">
        • © Kick My Song • All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}