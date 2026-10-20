import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Accessibility, Send, Menu } from "lucide-react";
import { useAccessibility } from "../context/AccessibilityContext";

const linksRota = [
  { to: "/", id: "topo", label: "Início" },
  { to: "/plataforma", id: "mapa", label: "Mapa" },
];

const linksAncora = [
  { id: "termometro", label: "Termômetro" },
  { id: "selos", label: "Selos" },
];

const linkFeedback = { to: "/plataforma", id: "feedback", label: "Feedback" };

const secoesObservadas = ["topo", "mapa", "termometro", "selos"];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState("topo");
  const { setPainelAberto } = useAccessibility();

  function irParaAncora(id) {
    setAberto(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const elemento = document.getElementById(id);
    if (elemento) elemento.scrollIntoView({ behavior: "smooth" });
  }

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

  function classeLink(id) {
    return ativo === id
      ? "text-sm font-semibold pb-1 border-b-2 transition-all duration-200 hover:scale-105 text-brand-green border-brand-green"
      : "text-sm font-semibold pb-1 border-b-2 transition-all duration-200 hover:scale-105 text-[#0B2F7A] border-transparent hover:text-brand-green hover:border-brand-green";
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="h-0.5 bg-brand-gold" />

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center"><img src="/logo-edusec.png" alt="EduSec" className="h-18 w-auto" /></Link>

        <nav className="hidden md:flex items-center gap-8">
          {linksRota.map((link) => (
            <Link key={link.to} to={link.to} className={classeLink(link.id)}>{link.label}</Link>
          ))}
          {linksAncora.map((link) => (
            <button key={link.id} onClick={() => irParaAncora(link.id)} className={classeLink(link.id)}>{link.label}</button>
          ))}
          <Link to={linkFeedback.to} className={classeLink(linkFeedback.id)}>{linkFeedback.label}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:block h-8 w-px bg-slate-300" />

          <button
            onClick={() => setPainelAberto(true)}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0B2F7A] hover:bg-brand-blue transition-colors"
            aria-label="Opções de acessibilidade"
          >
            <Accessibility className="text-white" size={20} />
          </button>

          <Link to="/plataforma" className="hidden md:inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            <Send size={16} />Responder feedback
          </Link>

          <button className="md:hidden text-brand-ink" onClick={() => setAberto(!aberto)} aria-label="Abrir menu" aria-expanded={aberto}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-brand-gold" />

      {aberto && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-4">
          {linksRota.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setAberto(false)} className="text-base font-semibold text-[#0B2F7A]">{link.label}</Link>
          ))}
          {linksAncora.map((link) => (
            <button key={link.id} onClick={() => irParaAncora(link.id)} className="text-base font-semibold text-[#0B2F7A] text-left">{link.label}</button>
          ))}
          <Link to={linkFeedback.to} onClick={() => setAberto(false)} className="text-base font-semibold text-[#0B2F7A]">{linkFeedback.label}</Link>
          <button
            onClick={() => { setPainelAberto(true); setAberto(false); }}
            className="flex items-center gap-2 text-base font-semibold text-[#0B2F7A]"
          >
            <Accessibility size={20} />Acessibilidade
          </button>
          <Link to="/plataforma" onClick={() => setAberto(false)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white">
            <Send size={16} />Responder feedback
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;