import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";
import { escolas } from "../data/escolas";

const configSelo = {
  ouro: { cor: "#F5C451", nome: "Ouro" },
  prata: { cor: "#94A3B8", nome: "Prata" },
  bronze: { cor: "#B08968", nome: "Bronze" },
  em_progresso: { cor: "#CBD5E1", nome: "Em progresso" },
};

function BuscaEscola({ onSelecionar }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const containerRef = useRef(null);

  const escolasFiltradas = escolas.filter((e) =>
  e.nome.toLowerCase().includes(termo.toLowerCase()) ||
  e.cidade.toLowerCase().includes(termo.toLowerCase()) ||
  e.regiao.toLowerCase().includes(termo.toLowerCase())
);

  useEffect(() => {
    function fecharAoClicarFora(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  function selecionarEscola(escola) {
    onSelecionar(escola);
    setTermo(escola.nome);
    setAberto(false);
  }

  function limpar() {
    setTermo("");
    setAberto(true);
  }

  return (
    <div ref={containerRef} className="relative mb-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-brand-blue" />
        <div className="absolute right-0 top-0 h-full w-1.5 bg-brand-gold" />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70" size={18} />
        <input
          type="text"
          value={termo}
          onChange={(e) => { setTermo(e.target.value); setAberto(true); }}
          onFocus={() => setAberto(true)}
          placeholder="Buscar escola por nome, região ou estado..."
          className="w-full bg-brand-green/90 pl-12 pr-10 py-3.5 text-sm text-white placeholder:text-white/75 focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        {termo && (
          <button onClick={limpar} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white" aria-label="Limpar busca">
            <X size={16} />
          </button>
        )}
      </div>

      {aberto && (
        <div className="absolute z-[1000] mt-2 w-full max-h-72 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl">
          {escolasFiltradas.length === 0 ? (
            <p className="px-4 py-4 text-sm text-slate-500 text-center">Nenhuma escola encontrada.</p>
          ) : (
            escolasFiltradas.map((escola) => {
              const selo = configSelo[escola.nivel];
              return (
                <button
                  key={escola.id}
                  onClick={() => selecionarEscola(escola)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                >
                  <MapPin className="text-slate-400 shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-navy truncate">{escola.nome}</p>
                    <p className="text-xs text-slate-500">{escola.cidade} — {escola.regiao}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase rounded-full px-2 py-1" style={{ backgroundColor: selo.cor, color: "#1E293B" }}>
                    {selo.nome}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default BuscaEscola;