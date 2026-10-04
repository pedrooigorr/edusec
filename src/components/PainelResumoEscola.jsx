import { X } from "lucide-react";
import GaugeIndice from "./GaugeIndice";

const imagemSelo = {
  ouro: "/selo-ouro.png",
  prata: "/selo-prata.png",
  bronze: "/selo-bronze.png",
  em_progresso: "/selo-bronze.png",
};

const nomeSelo = {
  ouro: "Ouro",
  prata: "Prata",
  bronze: "Bronze",
  em_progresso: "Em progresso",
};

function PainelResumoEscola({ escola, indice, onFechar }) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center">
      <button onClick={onFechar} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Fechar painel">
        <X size={20} />
      </button>

      <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy uppercase">{escola.nome}</h3>
      <p className="text-sm text-brand-muted mt-1 mb-8">{escola.cidade} — {escola.regiao}</p>

      <GaugeIndice valor={indice} tamanho={160} />
      <GaugeIndice valor={indice} tamanho={160} />
<p className="text-xs uppercase tracking-wide text-brand-muted mt-2 mb-1 font-semibold">Índice de Segurança</p>
<p className="text-[11px] text-slate-400 mb-8">Dados simulados para demonstração</p>

      <img src={imagemSelo[escola.nivel]} alt={`Selo ${nomeSelo[escola.nivel]}`} className="w-32 h-32 object-contain" />
      <p className="font-display font-bold text-brand-navy mt-2 text-lg">{nomeSelo[escola.nivel]}</p>
    </div>
  );
}

export default PainelResumoEscola;