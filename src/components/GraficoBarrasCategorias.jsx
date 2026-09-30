import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { categorias } from "../data/perguntas";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function GraficoBarrasCategorias({ medias }) {
  const ids = Object.keys(categorias);
  const data = {
    labels: ids.map((id) => categorias[id].nome),
    datasets: [
      {
        label: "Índice (%)",
        data: ids.map((id) => medias[id] ?? 0),
        backgroundColor: ids.map((id) => categorias[id].cor),
        borderRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + "%" } } },
  };
  return <Bar data={data} options={options} />;
}

export default GraficoBarrasCategorias;