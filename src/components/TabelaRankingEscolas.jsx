const corSelo = { ouro: "#F5C451", prata: "#94A3B8", bronze: "#B08968", em_progresso: "#CBD5E1" };
const nomeSelo = { ouro: "Ouro", prata: "Prata", bronze: "Bronze", em_progresso: "Em progresso" };

function TabelaRankingEscolas({ ranking, onSelecionar }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-3 pr-4 font-semibold">#</th>
            <th className="py-3 pr-4 font-semibold">Escola</th>
            <th className="py-3 pr-4 font-semibold">Região</th>
            <th className="py-3 pr-4 font-semibold">Selo</th>
            <th className="py-3 pr-4 font-semibold">Alertas</th>
            <th className="py-3 pr-4 font-semibold text-right">Índice</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((escola, i) => (
            <tr
              key={escola.id}
              onClick={() => onSelecionar(escola)}
              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <td className="py-3 pr-4 font-semibold text-slate-400">{i + 1}º</td>
              <td className="py-3 pr-4 font-medium text-brand-navy">{escola.nome}</td>
              <td className="py-3 pr-4 text-slate-500">{escola.cidade} — {escola.regiao}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: corSelo[escola.nivel], color: "#1E293B" }}>
                  {nomeSelo[escola.nivel]}
                </span>
              </td>
              <td className="py-3 pr-4">
                {escola.alertas.length > 0 ? (
                  <span className="text-red-600 font-semibold">{escola.alertas.length}</span>
                ) : (
                  <span className="text-green-600 font-semibold">0</span>
                )}
              </td>
              <td className="py-3 pr-4 text-right font-bold text-brand-navy">{escola.indice}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaRankingEscolas;