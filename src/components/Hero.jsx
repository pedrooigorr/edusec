import { Link } from "react-router-dom";
function IconeSeta(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function IconeChat(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}

function FundoBandeira() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gAmarelo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE14D" />
          <stop offset="1" stopColor="#F5A100" />
        </linearGradient>
        <linearGradient id="gVerde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset="1" stopColor="#0E8F4F" />
        </linearGradient>
        <linearGradient id="gAzul" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E7BFF" />
          <stop offset="1" stopColor="#0B3FA8" />
        </linearGradient>
        <radialGradient id="brilho" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2F7BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2F7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="1080" cy="380" r="430" fill="url(#brilho)" />

      <polygon points="0,0 240,0 0,300" fill="url(#gVerde)" opacity="0.95" />
      <polygon points="0,0 150,0 0,190" fill="url(#gAmarelo)" />
      <path d="M0 470 C 60 420 130 330 230 250" stroke="#1E7BFF" strokeWidth="2" fill="none" opacity="0.5" />

      <polygon points="1440,0 1200,0 1440,300" fill="url(#gVerde)" opacity="0.55" />
      <polygon points="1440,0 1330,0 1440,140" fill="url(#gAmarelo)" opacity="0.9" />

      <polygon points="0,720 0,540 190,720" fill="url(#gVerde)" opacity="0.9" />
      <ellipse cx="40" cy="700" rx="180" ry="90" fill="#FFD400" opacity="0.28" />

      <polygon points="1440,720 1440,470 1180,720" fill="url(#gAmarelo)" opacity="0.95" />
      <polygon points="1440,720 1440,580 1300,720" fill="url(#gVerde)" />
      <polygon points="1440,720 1440,650 1370,720" fill="url(#gAzul)" />
      <line x1="1440" y1="560" x2="1290" y2="720" stroke="#FFE14D" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden text-white bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1]">
      <FundoBandeira />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 min-h-[640px] grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <div className="relative z-10">
          <span className="inline-flex items-center rounded-full border-2 border-brand-gold px-5 py-2 text-sm md:text-base font-bold uppercase tracking-wide text-brand-gold mb-8">Proteção Integral · Hackathon TeenTech</span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] mb-6 lg:whitespace-nowrap">
            Um retrato vivo da<br />
            <span className="text-green-500">segurança digital</span><br />
            nas escolas brasileiras
          </h1>

          <p className="text-lg text-white/90 leading-relaxed max-w-lg mb-10">
            O EduSec mede, certifica e conecta o clima de proteção digital de escolas em todo o Brasil, para que famílias e gestores públicos saibam exatamente onde agir.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/plataforma" className="inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 font-bold uppercase text-brand-navy hover:brightness-95 transition">Explorar o mapa<IconeSeta /></Link>
            <a href="#feedback" className="inline-flex items-center gap-3 rounded-full border border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"><IconeChat />Responder feedback</a>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end lg:translate-x-40">
          <img src="/logo-edusec-detalhado.png" alt="" aria-hidden="true" className="w-full max-w-[34rem] lg:max-w-none lg:w-[145%] drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

export default Hero;