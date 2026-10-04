import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", id: "topo", label: "Início" },
  { to: "/plataforma", id: "mapa", label: "Mapa" },
  { to: "/#termometro", id: "termometro", label: "Termômetro" },
];

const secoesObservadas = ["topo", "mapa", "termometro"];

function IconeAcessibilidade(props) {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="24" height="24" {...props}>
      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6l1.5-4.5c.3-.8-.1-1.7-.9-2-.8-.3-1.7.1-2 .9L12 8H9c-.6 0-1 .4-1 1s.4 1 1 1h2.4l-.8 2.4c-.6 1.7.2 3.6 1.9 4.2.3.1.6.2.9.2.3 0 .6-.1.9-.2l3.1-1.6c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.3-.5l-2.7 1.4-.6-1.8L16 11h5c.6 0 1-.4 1-1s-.4-1-1-1zM8.5 15.5c-.4 1.5-1.8 2.5-3.4 2.3-1.9-.2-3.3-2-3.1-3.9.2-1.7 1.6-3 3.3-3.1l.5-1.9C3.5 9.2 1.3 11.4 1 14c-.3 2.8 1.7 5.4 4.6 5.9 2.8.5 5.5-1.2 6.3-3.9l-3.4-.5z" />
    </svg>
  );
}

function IconeEnviar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

function Header() {
  const location = useLocation();
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState("topo");

  useEffect(() => {
    if (location.pathname === "/plataforma") {
      setAtivo("mapa");
      return;
    }
    const secoes = secoesObservadas.map((id) => document.getElementById(id)).filter(Boolean);
    if (secoes.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setAtivo(entrada.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    secoes.forEach((secao) => observer.observe(secao));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="h-0.5 bg-brand-gold" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center"><img src="/logo-edusec.png" alt="EduSec" className="h-14 w-auto" /></Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={ativo === link.id ? "text-sm font-semibold pb-1 border-b-2 transition-all duration-200 hover:scale-105 text-brand-green border-brand-green" : "text-sm font-semibold pb-1 border-b-2 transition-all duration-200 hover:scale-105 text-[#0B2F7A] border-transparent hover:text-brand-green hover:border-brand-green"}>{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:block h-8 w-px bg-slate-300" />

          <button className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0B2F7A] hover:bg-brand-blue transition-colors" aria-label="Opções de acessibilidade">
            <IconeAcessibilidade width={18} height={18} />
          </button>

          <Link to="/plataforma" className="hidden md:inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"><IconeEnviar />Responder feedback</Link>

          <button className="md:hidden text-brand-ink" onClick={() => setAberto(!aberto)} aria-label="Abrir menu" aria-expanded={aberto}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-brand-gold" />

      {aberto && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setAberto(false)} className="text-base font-semibold text-[#0B2F7A]">{link.label}</Link>
          ))}
          <Link to="/plataforma" onClick={() => setAberto(false)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"><IconeEnviar />Responder feedback</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;