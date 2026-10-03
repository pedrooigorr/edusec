import { Info } from "lucide-react";

function AvisoDadosSimulados({ variante = "claro" }) {
  const estilos =
    variante === "escuro"
      ? "bg-white/10 border-white/20 text-white/90"
      : "bg-amber-50 border-amber-200 text-amber-900";

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${estilos}`}>
      <Info className="shrink-0 mt-0.5" size={18} />
      <p>
        <strong>Dados simulados para demonstração.</strong> Este protótipo utiliza respostas fictícias geradas para o MVP do Hackathon TeenTech. A coleta de dados reais de alunos e professores exigiria um processo formal de consentimento, fora do escopo desta fase do projeto.
      </p>
    </div>
  );
}

export default AvisoDadosSimulados;