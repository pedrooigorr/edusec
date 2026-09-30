import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import Selo from "./Selo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Termometro({ nomeEscola, dados }) {
  const data = {
    labels: ["Conhecem canais de apoio", "Professores capacitados", "Percepção de segurança"],
    datasets: [
      {
        label: nomeEscola,
        data: [dados.conhecemCanais, dados.professoresCapacitados, dados.percepcaoSeguranca],
        backgroundColor: "#2563EB"
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + "%"
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-slate-700">{nomeEscola}</h2>
        <Selo nivel={dados.nivel} />
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Termometro;