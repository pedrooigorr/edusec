import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function GraficoMediaRegional({ mediaPorRegiao }) {
  const regioes = Object.keys(mediaPorRegiao);
  const data = {
    labels: regioes,
    datasets: [
      {
        label: "Índice médio (%)",
        data: regioes.map((r) => mediaPorRegiao[r]),
        backgroundColor: "#1E5AA8",
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

export default GraficoMediaRegional;