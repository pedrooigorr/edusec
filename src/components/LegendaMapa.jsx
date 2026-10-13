const niveis = [
  { cor: "#F5C451", nome: "Selo Ouro" },
  { cor: "#94A3B8", nome: "Selo Prata" },
  { cor: "#B08968", nome: "Selo Bronze" },
  { cor: "#CBD5E1", nome: "Em Progresso" },
];

function LegendaMapa() {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-brand-navy/90 backdrop-blur border border-white/15 rounded-xl px-4 py-3 shadow-lg">
      <ul className="space-y-1.5">
        {niveis.map((nivel) => (
          <li key={nivel.nome} className="flex items-center gap-2 text-xs font-medium text-white">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: nivel.cor }} />
            {nivel.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LegendaMapa;