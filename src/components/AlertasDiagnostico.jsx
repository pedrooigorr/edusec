import { AlertTriangle } from "lucide-react";

function AlertasDiagnostico({ alertas }) {
  if (alertas.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-green-800">
        Nenhum ponto crítico identificado no momento. Continue mantendo as boas práticas.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {alertas.map((alerta) => (
        <div key={alerta.categoriaId} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-semibold text-red-800">{alerta.nome} está em {alerta.valor}% — abaixo do recomendado.</p>
        </div>
      ))}
    </div>
  );
}

export default AlertasDiagnostico;