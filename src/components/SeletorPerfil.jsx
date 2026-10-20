import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, GraduationCap, BookOpen, Landmark, ChevronDown, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const opcoes = [
  { id: "visitante", nome: "Visitante", Icone: Eye },
  { id: "aluno", nome: "Aluno", Icone: GraduationCap },
  { id: "professor", nome: "Professor", Icone: BookOpen },
  { id: "gestor", nome: "Gestor Público", Icone: Landmark },
];

function SeletorPerfil() {
  const { perfil, setPerfil } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef(null);

  const atual = opcoes.find((o) => o.id === perfil) ?? opcoes[1];

  useEffect(() => {
    function fecharAoClicarFora(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  function escolherPerfil(id) {
    setPerfil(id);
    setAberto(false);

    if (id === "gestor") {
      navigate("/gestor");
      return;
    }
    if (location.pathname === "/gestor") {
      navigate("/plataforma");
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide bg-white/10 border border-white/20 hover:bg-white/15 rounded-full px-4 py-2 transition-colors"
      >
        <atual.Icone size={14} />
        Acessando como: {atual.nome}
        <ChevronDown size={14} className={`transition-transform ${aberto ? "rotate-180" : ""}`} />
      </button>

      {aberto && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden z-[1500]">
          <p className="px-4 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Trocar perfil de acesso
          </p>
          {opcoes.map((opcao) => (
            <button
              key={opcao.id}
              onClick={() => escolherPerfil(opcao.id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-brand-navy hover:bg-slate-50 transition-colors"
            >
              <opcao.Icone size={16} className="text-brand-blue" />
              <span className="flex-1">{opcao.nome}</span>
              {perfil === opcao.id && <Check size={16} className="text-brand-green" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeletorPerfil;