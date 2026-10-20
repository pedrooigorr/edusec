import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import GestorSidebar from "../components/gestor/GestorSidebar";
import GestorTopbar from "../components/gestor/GestorTopbar";
import GaugeIndice from "../components/GaugeIndice";
import GraficoBarrasCategorias from "../components/GraficoBarrasCategorias";
import GraficoMediaRegional from "../components/GraficoMediaRegional";
import GraficoDistribuicaoSeloDonut from "../components/gestor/GraficoDistribuicaoSeloDonut";
import TabelaRankingEscolas from "../components/TabelaRankingEscolas";
import AvisoDadosSimulados from "../components/AvisoDadosSimulados";
import { School, Gauge, AlertTriangle, Trophy, ChevronRight } from "lucide-react";
import { escolas } from "../data/escolas";
import { calcularResumoRede } from "../utils/indicadoresRede";

function CartaoKpi({ Icone, label, valor, tendencia, cor, fundo }) {
  return (
    <div className={`rounded-2xl border p-5 ${fundo}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${cor}`}>
          <Icone size={20} className="text-white" />
        </span>
        <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">{label}</p>
      </div>
      <p className="font-display text-2xl font-extrabold text-brand-navy mb-1">{valor}</p>
      {tendencia && <p className="text-xs text-slate-500">{tendencia}</p>}
    </div>
  );
}

function GestorVisaoGeral() {
  const navigate = useNavigate();
  const { perfil, ehGestor } = useAuth();
  const [respostasLivePorEscola, setRespostasLivePorEscola] = useState({});

  useEffect(() => {
    if (!perfil) {
      navigate("/login");
      return;
    }
    if (!ehGestor) {
      navigate("/plataforma");
    }
  }, [perfil, ehGestor, navigate]);

  useEffect(() => {
    if (!ehGestor) return;
    const unsubscribe = onSnapshot(collection(db, "respostas_feedback"), (snapshot) => {
      const agrupado = {};
      snapshot.docs.forEach((doc) => {
        const dado = doc.data();
        if (!agrupado[dado.escola]) agrupado[dado.escola] = [];
        agrupado[dado.escola].push(dado);
      });
      setRespostasLivePorEscola(agrupado);
    });
    return () => unsubscribe();
  }, [ehGestor]);

  if (!ehGestor) return null;

  const resumoRede = calcularResumoRede(escolas, respostasLivePorEscola);
  const { indiceMedio, distribuicaoSelo, mediaPorCategoria, totalAlertas, mediaPorRegiao, ranking } = resumoRede;
  const melhorEscola = ranking[0];

  function irParaEscola(escola) {
    navigate("/plataforma", { state: { escolaId: escola.id } });
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <GestorSidebar />

      <div className="flex-1 flex flex-col">
        <GestorTopbar titulo="Visão Geral da Rede" subtitulo="Acompanhe os dados de segurança digital de toda a rede escolar." />

        <main className="flex-1 px-8 py-6 space-y-6">
          <AvisoDadosSimulados />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CartaoKpi Icone={School} label="Escolas monitoradas" valor={ranking.length} tendencia={`${escolas.length} cadastradas na rede`} cor="bg-brand-blue" fundo="bg-blue-50/60 border-blue-100" />
            <CartaoKpi Icone={Gauge} label="Índice médio da rede" valor={`${indiceMedio}%`} tendencia="Baseado nos dados atuais" cor="bg-brand-green" fundo="bg-green-50/60 border-green-100" />
            <CartaoKpi Icone={AlertTriangle} label="Alertas ativos na rede" valor={totalAlertas} tendencia="Categorias abaixo do recomendado" cor="bg-red-500" fundo="bg-red-50/60 border-red-100" />
            <CartaoKpi Icone={Trophy} label="Melhor índice" valor={melhorEscola ? `${melhorEscola.indice}%` : "—"} tendencia={melhorEscola?.nome} cor="bg-amber-500" fundo="bg-amber-50/60 border-amber-100" />
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1] text-white p-6 flex flex-col items-center justify-center text-center">
              <p className="self-start text-sm font-bold uppercase tracking-wide text-white/80 mb-4">Índice Médio da Rede</p>
              <GaugeIndice valor={indiceMedio} tamanho={150} />
              <p className="text-xs text-white/60 mt-4">O índice médio reflete o conjunto das {ranking.length} escolas monitoradas.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-navy mb-5">Distribuição por Selo</p>
              <GraficoDistribuicaoSeloDonut distribuicao={distribuicaoSelo} total={ranking.length} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-navy mb-1">Comparativo por Categoria</p>
              <p className="text-xs text-slate-400 mb-4">Média da rede</p>
              <div className="h-56">
                <GraficoBarrasCategorias medias={mediaPorCategoria} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-navy mb-1">Médias por Região</p>
              <p className="text-xs text-slate-400 mb-4">Índice médio de segurança digital por região</p>
              <div className="h-64">
                <GraficoMediaRegional mediaPorRegiao={mediaPorRegiao} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">Ranking de Escolas</p>
                <button onClick={() => navigate("/plataforma")} className="flex items-center gap-1 text-sm font-semibold text-brand-green hover:text-emerald-700">
                  Ver todas as escolas<ChevronRight size={16} />
                </button>
              </div>
              <TabelaRankingEscolas ranking={ranking} onSelecionar={irParaEscola} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GestorVisaoGeral;