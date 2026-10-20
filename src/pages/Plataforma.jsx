import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapaInterativo from "../components/MapaInterativo";
import PainelResumoEscola from "../components/PainelResumoEscola";
import PainelDadosEscola from "../components/PainelDadosEscola";
import PainelGestorGeral from "../components/PainelGestorGeral";
import BuscaEscola from "../components/BuscaEscola";
import LegendaMapa from "../components/LegendaMapa";
import AvisoDadosSimulados from "../components/AvisoDadosSimulados";
import SeletorPerfil from "../components/SeletorPerfil";
import { escolas } from "../data/escolas";
import { respostasSeedPorEscola } from "../data/respostasSeed";
import { calcularMediasPorCategoria, calcularIndiceGeral, calcularDistribuicaoRisco, gerarAlertas } from "../utils/indiceSeguranca";
import { calcularResumoRede } from "../utils/indicadoresRede";

function FundoAzulTopo() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="plVerde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset="1" stopColor="#0E8F4F" />
        </linearGradient>
        <linearGradient id="plAmarelo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE14D" />
          <stop offset="1" stopColor="#F5A100" />
        </linearGradient>
      </defs>
      <polygon points="1440,0 1440,320 1020,0" fill="url(#plVerde)" opacity="0.55" />
      <polygon points="1440,0 1440,160 1230,0" fill="url(#plAmarelo)" opacity="0.85" />
      <polygon points="1440,0 1440,80 1360,0" fill="#0E8F4F" opacity="0.5" />

      <polygon points="0,760 0,420 440,760" fill="url(#plVerde)" opacity="0.55" />
      <polygon points="0,760 0,560 230,760" fill="url(#plAmarelo)" opacity="0.85" />
      <polygon points="0,760 0,680 90,760" fill="#0E8F4F" opacity="0.5" />
    </svg>
  );
}

function Plataforma() {
  const { ehGestor } = useAuth();
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);
  const [respostasLive, setRespostasLive] = useState([]);
  const [respostasLivePorEscola, setRespostasLivePorEscola] = useState({});
  const [abaGestor, setAbaGestor] = useState("geral");

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

  useEffect(() => {
    if (!ehGestor) return;
    const unsubscribe = onSnapshot(collection(db, "respostas_feedback"), (snapshot) => {
      const agrupado = {};
      snapshot.docs.forEach((doc) => {
        const dado = doc.data();
        if (!agrupado[dado.escola]) agrupado[dado.escola] = [];
        agrupado[dado.escola].push(dado);
      });
      setRespostasLivePorEscola(agrupado);
    });
    return () => unsubscribe();
  }, [ehGestor]);

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

  const resumoRede = ehGestor ? calcularResumoRede(escolas, respostasLivePorEscola) : null;

  function selecionarEEscolaDoRanking(escola) {
    setEscolaSelecionada(escola);
    setAbaGestor("mapa");
  }

  const mostrarVisaoGeral = ehGestor && abaGestor === "geral";

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />

      <section className="relative overflow-hidden text-white bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1] py-16">
        <FundoAzulTopo />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Mapa da Proteção Digital Escolar do Ceará</h1>
              <p className="text-white/80">
                {ehGestor ? "Acompanhe os indicadores agregados da rede ou explore uma escola específica." : "Clique em uma escola no mapa para ver seu índice de segurança, diagnóstico e enviar feedback."}
              </p>
            </div>
            <SeletorPerfil />
          </div>

          <div className="mb-6">
            <AvisoDadosSimulados variante="escuro" />
          </div>

          {ehGestor && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setAbaGestor("geral")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${abaGestor === "geral" ? "bg-brand-gold text-brand-navy" : "bg-white/10 text-white hover:bg-white/15"}`}
              >
                Visão Geral da Rede
              </button>
              <button
                onClick={() => setAbaGestor("mapa")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${abaGestor === "mapa" ? "bg-brand-gold text-brand-navy" : "bg-white/10 text-white hover:bg-white/15"}`}
              >
                Mapa por Escola
              </button>
            </div>
          )}

          {!mostrarVisaoGeral && (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
              <div>
                <BuscaEscola onSelecionar={setEscolaSelecionada} />
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-lg h-[480px] lg:h-[516px]">
                  <MapaInterativo
                    escolaSelecionadaId={escolaSelecionada?.id}
                    onSelecionar={setEscolaSelecionada}
                    escolaParaCentralizar={escolaSelecionada}
                  />
                  <LegendaMapa />
                </div>
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
          )}
        </div>
      </section>

      {mostrarVisaoGeral && (
        <section className="bg-white py-16 flex-1">
          <div className="max-w-7xl mx-auto px-6">
            <PainelGestorGeral resumoRede={resumoRede} onSelecionarEscola={selecionarEEscolaDoRanking} />
          </div>
        </section>
      )}

      {!mostrarVisaoGeral && escolaSelecionada && (
        <section className="bg-white py-16 flex-1">
          <div className="max-w-7xl mx-auto px-6">
            <PainelDadosEscola escola={escolaSelecionada} medias={medias} distribuicaoRisco={distribuicaoRisco} alertas={alertas} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Plataforma;