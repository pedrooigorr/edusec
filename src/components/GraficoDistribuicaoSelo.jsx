import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const nomeSelo = { ouro: "Ouro", prata: "Prata", bronze: "Bronze", em_progresso: "Em progresso" };
const corSelo = { ouro: "#F5C451", prata: "#94A3B8", bronze: "#B08968", em_progresso: "#CBD5E1" };

function GraficoDistribuicaoSelo({ distribuicao }) {
  const chaves = Object.keys(nomeSelo);
  const data = {
    labels: chaves.map((c) => nomeSelo[c]),
    datasets: [
      {
        data: chaves.map((c) => distribuicao[c] ?? 0),
        backgroundColor: chaves.map((c) => corSelo[c]),
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

export default GraficoDistribuicaoSelo;