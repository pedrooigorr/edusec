import { Lightbulb, Target } from "lucide-react";

function PlanoDeAcao({ alertas }) {
  if (alertas.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800 flex items-start gap-3">
        <Target className="text-blue-600 shrink-0 mt-0.5" size={18} />
        Nenhuma ação corretiva necessária no momento. A escola está com bons indicadores.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {alertas.map((alerta) => (
        <div key={alerta.categoriaId} className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="text-blue-600 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">{alerta.nome}</p>
            <p className="text-sm text-slate-600">{alerta.sugestao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanoDeAcao;