import { Users, Thermometer, Search, Settings, ShieldCheck, MapPin, ChevronRight } from "lucide-react";

function DecoracaoCantos() {
  return (
    <>
      <svg className="absolute top-0 left-0 w-40 h-24 pointer-events-none" viewBox="0 0 160 96" fill="none" aria-hidden="true">
        <path d="M0 20h60l20 20" stroke="#F5A100" strokeWidth="2.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-28 h-28 pointer-events-none" viewBox="0 0 112 112" fill="none" aria-hidden="true">
        <rect x="56" y="0" width="48" height="48" rx="6" transform="rotate(45 80 24)" stroke="#22C55E" strokeWidth="2.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-32 h-16 pointer-events-none" viewBox="0 0 128 64" fill="none" aria-hidden="true">
        <path d="M0 64 40 24" stroke="#0B3FA8" strokeWidth="7" strokeLinecap="round" />
        <path d="M20 64 60 24" stroke="#F5A100" strokeWidth="7" strokeLinecap="round" />
        <path d="M40 64 80 24" stroke="#22C55E" strokeWidth="7" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-40 h-28 pointer-events-none" viewBox="0 0 160 112" fill="none" aria-hidden="true">
        <path d="M160 112c-40 0-55-40-100-40" stroke="#1E7BFF" strokeWidth="2.5" />
      </svg>
    </>
  );
}

const etapas = [
  { numero: 1, titulo: "Feedback", descricao: "Alunos, pais e professores compartilham sua percepção sobre o ambiente digital.", Icone: Users, badge: "bg-blue-600", iconBg: "bg-blue-100", iconCor: "text-blue-600" },
  { numero: 2, titulo: "Termômetro", descricao: "As respostas viram indicadores e mostram como está a segurança digital da escola.", Icone: Thermometer, badge: "bg-green-700", iconBg: "bg-green-100", iconCor: "text-green-700" },
  { numero: 3, titulo: "Diagnóstico", descricao: "A escola identifica os principais pontos de atenção.", Icone: Search, badge: "bg-purple-600", iconBg: "bg-purple-100", iconCor: "text-purple-600" },
  { numero: 4, titulo: "Ação", descricao: "O sistema sugere um plano de melhoria personalizado.", Icone: Settings, badge: "bg-orange-500", iconBg: "bg-orange-100", iconCor: "text-orange-500" },
  { numero: 5, titulo: "Selo", descricao: "A escola é certificada em níveis Bronze, Prata ou Ouro.", Icone: ShieldCheck, badge: "bg-amber-600", iconBg: "bg-amber-100", iconCor: "text-amber-600" },
  { numero: 6, titulo: "Mapa", descricao: "Os dados alimentam o mapa e orientam políticas públicas.", Icone: MapPin, badge: "bg-blue-700", iconBg: "bg-blue-100", iconCor: "text-blue-700" },
];

function CicloExplicativo() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      <DecoracaoCantos />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-brand-navy mb-2">Como funciona</h2>
          <p className="text-brand-muted">Um ciclo contínuo para escolas mais seguras.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10">
          {etapas.map((etapa, i) => (
            <div key={etapa.numero} className="relative">
              <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-slate-300">
                <span className={`absolute -top-3 -left-3 w-7 h-7 rounded-full ${etapa.badge} text-white text-sm font-bold flex items-center justify-center`}>
                  {etapa.numero}
                </span>
                <div className={`w-16 h-16 rounded-full ${etapa.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <etapa.Icone className={etapa.iconCor} size={28} strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-brand-navy mb-2">{etapa.titulo}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{etapa.descricao}</p>
              </div>

              {i < etapas.length - 1 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-slate-300 z-10" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CicloExplicativo;