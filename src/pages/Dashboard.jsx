import Termometro from "../components/Termometro";
import { indicadores } from "../data/indicadores";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(indicadores).map(([nomeEscola, dados]) => (
        <Termometro key={nomeEscola} nomeEscola={nomeEscola} dados={dados} />
      ))}
    </div>
  );
}

export default Dashboard;