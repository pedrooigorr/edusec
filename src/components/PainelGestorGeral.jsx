import { School, Gauge, AlertTriangle, Trophy } from "lucide-react";
import GaugeIndice from "./GaugeIndice";
import GraficoBarrasCategorias from "./GraficoBarrasCategorias";
import GraficoDistribuicaoSelo from "./GraficoDistribuicaoSelo";
import GraficoMediaRegional from "./GraficoMediaRegional";
import TabelaRankingEscolas from "./TabelaRankingEscolas";

function CartaoKpi({ Icone, label, valor, cor }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
      <span className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${cor}`}>
        <Icone size={22} className="text-white" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{label}</p>
        <p className="font-display text-xl font-bold text-brand-navy">{valor}</p>
      </div>
    </div>
  );
}

function PainelGestorGeral({ resumoRede, onSelecionarEscola }) {
  const { indiceMedio, distribuicaoSelo, mediaPorCategoria, totalAlertas, mediaPorRegiao, ranking } = resumoRede;
  const melhorEscola = ranking[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CartaoKpi Icone={School} label="Escolas monitoradas" valor={ranking.length} cor="bg-brand-blue" />
        <CartaoKpi Icone={Gauge} label="Índice médio da rede" valor={`${indiceMedio}%`} cor="bg-brand-green" />
        <CartaoKpi Icone={AlertTriangle} label="Alertas ativos na rede" valor={totalAlertas} cor="bg-red-500" />
        <CartaoKpi Icone={Trophy} label="Melhor índice" valor={melhorEscola ? melhorEscola.nome.split(" ").slice(0, 3).join(" ") : "—"} cor="bg-amber-500" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center mb-10">
          <div className="flex flex-col items-center">
            <GaugeIndice valor={indiceMedio} tamanho={160} />
            <p className="text-sm uppercase tracking-wide text-brand-muted mt-2 font-semibold">Índice Médio da Rede</p>
          </div>
          <div>
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide mb-4">Distribuição por Selo</h4>
            <div className="h-56">
              <GraficoDistribuicaoSelo distribuicao={distribuicaoSelo} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide mb-4">Média da rede por categoria</h4>
            <div className="h-72">
              <GraficoBarrasCategorias medias={mediaPorCategoria} />
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide mb-4">Índice médio por região</h4>
            <div className="h-72">
              <GraficoMediaRegional mediaPorRegiao={mediaPorRegiao} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h4 className="font-display font-bold text-brand-navy uppercase text-sm tracking-wide mb-5">Ranking de escolas</h4>
        <TabelaRankingEscolas ranking={ranking} onSelecionar={onSelecionarEscola} />
      </div>
    </div>
  );
}

export default PainelGestorGeral;