function IconeSeta(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function IconeEscudo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

function IconeEquipe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="18" height="18" {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 12.2c2.3.3 4 1.7 4 4.3" />
    </svg>
  );
}

function IconeDocumento(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </svg>
  );
}

function IconeLivro(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M12 6c-1.5-1-4-1.5-6-1v13c2 0 4.5.5 6 1.5M12 6c1.5-1 4-1.5 6-1v13c-2 0-4.5.5-6 1.5M12 6v13.5" />
    </svg>
  );
}

function IconeEnvelope(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconeAcessibilidadeContorno(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="18" height="18" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7 10.5c1.6.7 3.3 1 5 1s3.4-.3 5-1M12 11.5v3.2M9.5 19l2-4.3M14.5 19l-2-4.3" />
    </svg>
  );
}

function IconeInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeGithub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.47 2.87 8.26 6.84 9.6.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.46-1.17-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.54 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.04A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.76-4.57 5.01.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
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

const redesSociais = [
  { href: "https://www.instagram.com/pedrooigor._/", label: "Instagram", Icone: IconeInstagram },
  { href: "https://github.com/pedrooigorr", label: "GitHub", Icone: IconeGithub },
];

function Footer() {
  return (
    <footer className="text-white bg-[#031339]">
      <div className="h-[2px] bg-brand-gold" />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1]">
        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="relative z-10">
              <img src="/logo-edusec-mono.png" alt="EduSec" className="w-48 md:w-60 mb-4" />
              <div className="flex gap-3 mb-3">
                <span className="w-1 rounded-full bg-green-500" />
                <p className="font-display text-lg md:text-xl font-extrabold uppercase leading-tight">Proteção digital que <span className="text-green-500">começa na escola.</span></p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed max-w-md">O EduSec transforma percepção em dados, dados em decisões e decisões em proteção.</p>
            </div>
          </div>

          <div className="relative mt-8 pt-8 border-t border-white/15 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-brand-gold font-bold text-sm tracking-wide mb-2">NAVEGAÇÃO</p>
              <div className="w-8 h-[2px] bg-brand-gold mb-4" />
              <ul className="space-y-2.5 max-w-[16rem]">
                {navegacao.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="group flex items-center justify-between text-sm text-white hover:text-green-400 transition-colors">{item.label}<IconeSeta className="text-green-400 transition-transform group-hover:translate-x-1" /></a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-brand-gold font-bold text-sm tracking-wide mb-2">SOBRE O EDUSEC</p>
              <div className="w-8 h-[2px] bg-brand-gold mb-4" />
              <ul className="space-y-2.5">
                {sobre.map(({ href, label, Icone }) => (
                  <li key={label}>
                    <a href={href} className="flex items-center gap-2.5 text-sm text-white hover:text-green-400 transition-colors"><Icone className="text-blue-300 shrink-0" />{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:border-l md:border-white/15 md:pl-8">
              <button type="button" className="flex items-center gap-2.5 text-sm text-white hover:text-green-400 transition-colors mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/40"><IconeAcessibilidadeContorno /></span>
                Acessibilidade
              </button>

              <p className="text-brand-gold font-bold text-sm tracking-wide mb-2">SIGA-NOS</p>
              <div className="w-8 h-[2px] bg-brand-gold mb-3" />
              <div className="flex gap-2.5">
                {redesSociais.map(({ href, label, Icone }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center hover:border-green-400 hover:text-green-400 transition-colors">
                    <Icone />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#031339]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <IconeEscudo className="text-green-400" width="22" height="22" />
            <span className="font-display font-bold text-sm text-white">EduSec</span>
            <span className="hidden sm:inline text-xs text-slate-300 border-l border-white/25 pl-3">Proteção Integral no ambiente digital escolar</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-300">
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