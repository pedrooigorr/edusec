function IconeSeta(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function IconeEscudo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

function IconeEquipe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="22" height="22" {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 12.2c2.3.3 4 1.7 4 4.3" />
    </svg>
  );
}

function IconeDocumento(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </svg>
  );
}

function IconeLivro(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <path d="M12 6c-1.5-1-4-1.5-6-1v13c2 0 4.5.5 6 1.5M12 6c1.5-1 4-1.5 6-1v13c-2 0-4.5.5-6 1.5M12 6v13.5" />
    </svg>
  );
}

function IconeEnvelope(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconeAcessibilidadeContorno(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="22" height="22" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7 10.5c1.6.7 3.3 1 5 1s3.4-.3 5-1M12 11.5v3.2M9.5 19l2-4.3M14.5 19l-2-4.3" />
    </svg>
  );
}

function IconeInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4 0 4.4 2.6 4.4 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
    </svg>
  );
}

function IconeYoutube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M22 12s0-3.2-.4-4.7a3 3 0 0 0-2.1-2.1C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.5.4A3 3 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a3 3 0 0 0 2.1-2.1C22 15.2 22 12 22 12Z" />
      <path fill="#0a2a72" d="m10 15 5.2-3L10 9Z" />
    </svg>
  );
}

function FundoBandeiraFooter() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fAmarelo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE14D" />
          <stop offset="1" stopColor="#F5A100" />
        </linearGradient>
        <linearGradient id="fVerde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset="1" stopColor="#0E8F4F" />
        </linearGradient>
        <linearGradient id="fAzul" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E7BFF" />
          <stop offset="1" stopColor="#0B3FA8" />
        </linearGradient>
      </defs>
      <polygon points="1440,0 1250,0 1440,210" fill="url(#fVerde)" opacity="0.5" />
      <polygon points="1440,0 1340,0 1440,110" fill="url(#fAmarelo)" opacity="0.85" />
      <polygon points="0,720 0,590 140,720" fill="url(#fVerde)" opacity="0.75" />
      <polygon points="1440,720 1440,520 1240,720" fill="url(#fAmarelo)" opacity="0.8" />
      <polygon points="1440,720 1440,610 1330,720" fill="url(#fVerde)" />
      <polygon points="1440,720 1440,665 1385,720" fill="url(#fAzul)" />
      <path d="M0 60 C 100 60 130 10 230 10" stroke="#2dd4bf" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );
}

const navegacao = [
  { href: "#topo", label: "Início" },
  { href: "#mapa", label: "Mapa" },
  { href: "#termometro", label: "Termômetro" },
  { href: "#selos", label: "Selos" },
  { href: "#feedback", label: "Feedback" },
];

const sobre = [
  { href: "#", label: "Nossa proposta", Icone: IconeEscudo },
  { href: "#", label: "Equipe", Icone: IconeEquipe },
  { href: "#", label: "Hackathon TeenTech", Icone: IconeDocumento },
  { href: "#", label: "Documentação", Icone: IconeLivro },
  { href: "#", label: "Contato", Icone: IconeEnvelope },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden text-slate-300 bg-gradient-to-br from-[#031339] via-[#0c3a52] to-[#0e5a52]">
      <FundoBandeiraFooter />

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-12">
        <div>
          <img src="/logo-edusec-mono.png" alt="EduSec" className="w-96 md:w-[30rem] mb-6" />
          <div className="flex gap-3 mb-4">
            <span className="w-1 rounded-full bg-brand-green" />
            <p className="font-display text-xl font-bold text-white uppercase leading-snug">Proteção digital que <span className="text-brand-green">começa na escola.</span></p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">O EduSec transforma percepção em dados, dados em decisões e decisões em proteção.</p>
        </div>

        <div>
          <p className="text-brand-gold font-bold text-sm mb-1">NAVEGAÇÃO</p>
          <div className="w-8 h-0.5 bg-brand-gold mb-4" />
          <ul className="space-y-3">
            {navegacao.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="group flex items-center justify-between text-sm text-white hover:text-brand-green transition-colors">{item.label}<IconeSeta className="text-brand-green opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-brand-gold font-bold text-sm mb-1">SOBRE O EDUSEC</p>
          <div className="w-8 h-0.5 bg-brand-gold mb-4" />
          <ul className="space-y-3">
            {sobre.map(({ href, label, Icone }) => (
              <li key={label}>
                <a href={href} className="flex items-center gap-3 text-sm text-white hover:text-brand-green transition-colors"><Icone className="text-brand-blue shrink-0" />{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:border-l md:border-white/15 md:pl-8">
          <button type="button" className="flex items-center gap-2 text-sm text-white hover:text-brand-green transition-colors mb-6">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/40"><IconeAcessibilidadeContorno /></span>
            Acessibilidade
          </button>

          <p className="text-brand-gold font-bold text-sm mb-1">SIGA-NOS</p>
          <div className="w-8 h-0.5 bg-brand-gold mb-4" />
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"><IconeInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"><IconeLinkedin /></a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"><IconeYoutube /></a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconeEscudo className="text-brand-green" />
            <span className="font-display font-bold text-white">EduSec</span>
            <span className="hidden sm:inline text-sm text-slate-400 border-l border-white/20 pl-3">Proteção Integral no ambiente digital escolar</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} EduSec. Todos os direitos reservados.</span>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
            <a href="#" className="hover:text-white transition-colors">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;