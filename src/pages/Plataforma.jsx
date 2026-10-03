import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapaInterativo from "../components/MapaInterativo";
import PainelResumoEscola from "../components/PainelResumoEscola";
import PainelDadosEscola from "../components/PainelDadosEscola";
import { escolas } from "../data/escolas";
import { respostasSeedPorEscola } from "../data/respostasSeed";
import { calcularMediasPorCategoria, calcularIndiceGeral, calcularDistribuicaoRisco, gerarAlertas } from "../utils/indiceSeguranca";
import AvisoDadosSimulados from "../components/AvisoDadosSimulados";

const nomePerfil = { visitante: "Visitante", aluno: "Aluno", professor: "Professor" };

function Plataforma() {
  const navigate = useNavigate();
  const { perfil } = useAuth();
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);
  const [respostasLive, setRespostasLive] = useState([]);

  useEffect(() => {
    if (!perfil) navigate("/login");
  }, [perfil, navigate]);

  useEffect(() => {
    if (!escolaSelecionada) {
      setRespostasLive([]);
      return;
    }
    const q = query(collection(db, "respostas_feedback"), where("escola", "==", escolaSelecionada.nome));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRespostasLive(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [escolaSelecionada]);

  if (!perfil) return null;

  let medias = {};
  let indice = 0;
  let distribuicaoRisco = { sim: 0, nao: 0, prefiro_nao_dizer: 0 };
  let alertas = [];

  if (escolaSelecionada) {
    const seed = respostasSeedPorEscola[escolaSelecionada.nome] ?? [];
    const todasRespostas = [...seed, ...respostasLive];
    medias = calcularMediasPorCategoria(todasRespostas);
    indice = calcularIndiceGeral(medias);
    distribuicaoRisco = calcularDistribuicaoRisco(todasRespostas);
    alertas = gerarAlertas(medias);
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />

      <section className="relative overflow-hidden text-white bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1] py-16">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
  <div>
    <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Mapa da Proteção Digital Escolar</h1>
    <p className="text-white/80">Clique em uma escola no mapa para ver seu índice de segurança, diagnóstico e enviar feedback.</p>
  </div>
  <span className="text-xs font-semibold uppercase tracking-wide bg-white/10 border border-white/20 rounded-full px-4 py-2">
    Acessando como: {nomePerfil[perfil]}
  </span>
</div>

<div className="mb-8">
  <AvisoDadosSimulados variante="escuro" />
</div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg h-[480px] lg:h-[560px]">
              <MapaInterativo escolaSelecionadaId={escolaSelecionada?.id} onSelecionar={setEscolaSelecionada} />
            </div>

            <div className="lg:h-[560px]">
              {escolaSelecionada ? (
                <PainelResumoEscola escola={escolaSelecionada} indice={indice} onFechar={() => setEscolaSelecionada(null)} />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 h-full flex flex-col items-center justify-center text-center">
                  <p className="text-brand-muted">Selecione uma escola no mapa para ver seus dados.</p>
                  <ul className="mt-4 text-sm text-slate-500 space-y-1">
                    {escolas.map((e) => (<li key={e.id}>{e.nome}</li>))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {escolaSelecionada && (
        <section className="relative overflow-hidden bg-white py-16 flex-1">
          <div className="relative max-w-7xl mx-auto px-6">
            <PainelDadosEscola escola={escolaSelecionada} medias={medias} distribuicaoRisco={distribuicaoRisco} alertas={alertas} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Plataforma;