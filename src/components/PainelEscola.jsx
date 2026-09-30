import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { calcularMediasPorCategoria, calcularIndiceGeral, calcularDistribuicaoRisco, gerarAlertas } from "../utils/indiceSeguranca";
import { respostasSeedPorEscola } from "../data/respostasSeed";
import GaugeIndice from "./GaugeIndice";
import GraficoBarrasCategorias from "./GraficoBarrasCategorias";
import GraficoPizzaRisco from "./GraficoPizzaRisco";
import AlertasDiagnostico from "./AlertasDiagnostico";
import PlanoDeAcao from "./PlanoDeAcao";
import FormularioFeedback from "./FormularioFeedback";
import { X, MessageSquarePlus, Search, Thermometer, Settings } from "lucide-react";

const configSelo = {
  ouro: { cor: "#F5C451", texto: "#78350F", nome: "Ouro" },
  prata: { cor: "#94A3B8", texto: "#1E293B", nome: "Prata" },
  bronze: { cor: "#B08968", texto: "#431407", nome: "Bronze" },
  em_progresso: { cor: "#CBD5E1", texto: "#334155", nome: "Em progresso" },
};

function PainelEscola({ escola, onFechar }) {
  const [respostasLive, setRespostasLive] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    if (!escola) return;
    const q = query(collection(db, "respostas_feedback"), where("escola", "==", escola.nome));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRespostasLive(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [escola]);

  if (!escola) return null;

  const seed = respostasSeedPorEscola[escola.nome] ?? [];
  const todasRespostas = [...seed, ...respostasLive];

  const medias = calcularMediasPorCategoria(todasRespostas);
  const indice = calcularIndiceGeral(medias);
  const distribuicaoRisco = calcularDistribuicaoRisco(todasRespostas);
  const alertas = gerarAlertas(medias);
  const selo = configSelo[escola.nivel];

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-1">
      {/* Bloco 1: identificação da escola */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <button onClick={onFechar} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Fechar painel">
          <X size={20} />
        </button>

        <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy text-center uppercase">{escola.nome}</h3>
        <p className="text-sm text-brand-muted text-left mt-1 mb-6">{escola.estado} — {escola.regiao}</p>

        <div className="flex items-center justify-center gap-10">
          <div className="text-center">
            <GaugeIndice valor={indice} tamanho={140} />
            <p className="text-xs uppercase tracking-wide text-brand-muted mt-2 font-semibold">Índice de Segurança</p>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full w-28 h-28 border-4 border-white shadow-lg" style={{ backgroundColor: selo.cor }}>
              <span className="text-base font-extrabold text-center leading-tight" style={{ color: selo.texto }}>{selo.nome}</span>
            </span>
            <p className="text-xs uppercase tracking-wide text-brand-muted mt-2 font-semibold">Selo Atual</p>
          </div>
        </div>
      </div>

      {/* Bloco 2: painel de dados (Diagnóstico → Termômetro → Ação) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-purple-600" size={20} />
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide">Diagnóstico</h4>
          </div>
          <AlertasDiagnostico alertas={alertas} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="text-green-700" size={20} />
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide">Termômetro</h4>
          </div>
          <div className="h-80 mb-8">
            <GraficoBarrasCategorias medias={medias} />
          </div>
          <div className="max-w-xs mx-auto h-72">
            <GraficoPizzaRisco distribuicao={distribuicaoRisco} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="text-orange-500" size={20} />
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide">Ação</h4>
          </div>
          <PlanoDeAcao alertas={alertas} />
        </div>

        {!mostrarFormulario ? (
          <button onClick={() => setMostrarFormulario(true)} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            <MessageSquarePlus size={18} />Responder feedback desta escola
          </button>
        ) : (
          <div className="border-t border-slate-200 pt-6">
            <FormularioFeedback escolaFixa={escola.nome} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PainelEscola;