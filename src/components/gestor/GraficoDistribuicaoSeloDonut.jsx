import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const nomeSelo = { ouro: "Ouro", prata: "Prata", bronze: "Bronze", em_progresso: "Em progresso" };
const corSelo = { ouro: "#F5C451", prata: "#3B82F6", bronze: "#B08968", em_progresso: "#CBD5E1" };

function GraficoDistribuicaoSeloDonut({ distribuicao, total }) {
  const chaves = Object.keys(nomeSelo);
  const data = {
    labels: chaves.map((c) => nomeSelo[c]),
    datasets: [
      {
        data: chaves.map((c) => distribuicao[c] ?? 0),
        backgroundColor: chaves.map((c) => corSelo[c]),
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-40 h-40 shrink-0">
        <Doughnut data={data} options={options} />
      </div>
      <ul className="space-y-2.5 flex-1">
        {chaves.map((chave) => {
          const qtd = distribuicao[chave] ?? 0;
          const pct = total ? Math.round((qtd / total) * 100) : 0;
          return (
            <li key={chave} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: corSelo[chave] }} />
                {nomeSelo[chave]}
              </span>
              <span className="font-bold text-brand-navy">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GraficoDistribuicaoSeloDonut;