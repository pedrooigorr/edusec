import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Thermometer, Settings, MessageSquarePlus, PieChart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import GraficoBarrasCategorias from "./GraficoBarrasCategorias";
import GraficoPizzaRisco from "./GraficoPizzaRisco";
import AlertasDiagnostico from "./AlertasDiagnostico";
import PlanoDeAcao from "./PlanoDeAcao";
import FormularioFeedback from "./FormularioFeedback";

function PainelDadosEscola({ escola, medias, distribuicaoRisco, alertas }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { podeResponderFeedback } = useAuth();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Search className="text-purple-600" size={22} />
          <h4 className="font-display font-bold text-brand-navy uppercase text-base tracking-wide">Diagnóstico</h4>
        </div>
        <AlertasDiagnostico alertas={alertas} />
      </div>

      <div>
        <h4 className="font-display font-bold text-brand-navy uppercase text-base tracking-wide mb-5">Termômetro</h4>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          <div className="border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Thermometer className="text-green-700" size={20} />
              <h5 className="font-display font-semibold text-brand-navy">Índice por categoria</h5>
            </div>
            <div className="h-80">
              <GraficoBarrasCategorias medias={medias} />
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <PieChart className="text-blue-600" size={20} />
              <h5 className="font-display font-semibold text-brand-navy">Já viveu risco digital?</h5>
            </div>
            <div className="h-72">
              <GraficoPizzaRisco distribuicao={distribuicaoRisco} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <Settings className="text-orange-500" size={22} />
          <h4 className="font-display font-bold text-brand-navy uppercase text-base tracking-wide">Ação</h4>
        </div>
        <PlanoDeAcao alertas={alertas} />
      </div>

      {!podeResponderFeedback ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-sm text-slate-600 mb-3">
            Você está acessando como <strong>Visitante</strong> e pode apenas visualizar os dados.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Entrar como aluno ou professor
          </Link>
        </div>
      ) : !mostrarFormulario ? (
        <div className="flex justify-center">
          <button onClick={() => setMostrarFormulario(true)} className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-base font-semibold text-white hover:bg-emerald-700 transition-colors">
            <MessageSquarePlus size={18} />Responder feedback
          </button>
        </div>
      ) : (
        <div className="border-t border-slate-200 pt-8">
          <FormularioFeedback escolaFixa={escola.nome} />
        </div>
      )}
    </div>
  );
}

export default PainelDadosEscola;