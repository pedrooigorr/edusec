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

const niveis = [
  {
    src: "/selo-bronze.png",
    nome: "BRONZE",
    titulo: "Primeiros passos",
    descricao: "Canal de denúncia visível e equipe iniciando a capacitação.",
    bg: "from-orange-50 to-amber-100",
    borda: "border-amber-200",
    faixa: "bg-[#8B5A2B]",
  },
  {
    src: "/selo-prata.png",
    nome: "PRATA",
    titulo: "Práticas consolidadas",
    descricao: "Boas práticas estabelecidas e feedback consistente.",
    bg: "from-slate-50 to-slate-200",
    borda: "border-slate-300",
    faixa: "bg-slate-500",
  },
  {
    src: "/selo-ouro.png",
    nome: "OURO",
    titulo: "Referência nacional",
    descricao: "Protocolo documentado, equipe capacitada e indicadores altos.",
    bg: "from-yellow-50 to-amber-100",
    borda: "border-amber-300",
    faixa: "bg-brand-gold",
  },
];

function SecaoSelos() {
  return (
    <section id="selos" className="relative overflow-hidden bg-white border-y border-slate-200 py-28">
      <DecoracaoCantos />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-4 text-xs font-bold tracking-wide text-brand-navy">
            <span className="h-px w-10 bg-brand-gold" />
            <span className="border border-brand-navy/20 rounded-full px-5 py-2 uppercase">Níveis de certificação EduSec</span>
            <span className="h-px w-10 bg-brand-blue" />
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-center text-brand-navy mb-4">
          Um selo que precisa ser <span className="text-brand-blue">mantido</span>
        </h2>
        <p className="text-center text-brand-muted max-w-2xl mx-auto leading-relaxed mb-14">
          A cada rodada, a escola precisa demonstrar que continua seguindo boas práticas de segurança digital. O selo é renovado periodicamente com base no Termômetro EduSec e no checklist de boas práticas.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 items-start">
          {niveis.map((nivel, i) => (
            <div key={nivel.nome} className="relative">
              <div className={`group bg-gradient-to-b ${nivel.bg} border ${nivel.borda} rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                <img
                  src={nivel.src}
                  alt={`Selo ${nivel.nome}`}
                  className="w-36 h-36 mx-auto mb-5 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className={`inline-block w-full rounded-lg ${nivel.faixa} text-white font-bold text-sm tracking-wide py-2 mb-4`}>
                  {nivel.nome}
                </span>
                <h3 className="font-display font-bold text-brand-navy mb-2">{nivel.titulo}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{nivel.descricao}</p>
              </div>

              {i < niveis.length - 1 && (
                <svg className="hidden sm:block absolute top-1/3 -right-6 text-slate-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SecaoSelos;