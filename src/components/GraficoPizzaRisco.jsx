import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoPizzaRisco({ distribuicao }) {
  const data = {
    labels: ["Não viveu", "Já viveu", "Prefiro não dizer"],
    datasets: [
      {
        data: [distribuicao.nao, distribuicao.sim, distribuicao.prefiro_nao_dizer],
        backgroundColor: ["#22C55E", "#EF4444", "#94A3B8"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 12 } } } },
  };
  return <Pie data={data} options={options} />;
}

export default GraficoPizzaRisco;