import { Link } from "react-router-dom";
import { MapPin, Gauge, MessageSquarePlus, ArrowRight } from "lucide-react";

function FundoSecao() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="msVerde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset="1" stopColor="#0E8F4F" />
        </linearGradient>
        <linearGradient id="msAmarelo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE14D" />
          <stop offset="1" stopColor="#F5A100" />
        </linearGradient>
      </defs>
      <polygon points="0,0 170,0 0,220" fill="url(#msVerde)" opacity="0.45" />
      <polygon points="0,0 100,0 0,130" fill="url(#msAmarelo)" opacity="0.75" />
      <polygon points="1440,640 1440,470 1250,640" fill="url(#msAmarelo)" opacity="0.75" />
      <polygon points="1440,640 1440,560 1350,640" fill="url(#msVerde)" opacity="0.55" />
    </svg>
  );
}

function GaugeSimbolico({ valor = 78 }) {
  const raio = 46;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (valor / 100) * circunferencia;
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 shrink-0">
      <circle cx="60" cy="60" r={raio} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
      <circle cx="60" cy="60" r={raio} fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray={`${preenchido} ${circunferencia}`} strokeLinecap="round" transform="rotate(-90 60 60)" />
      <text x="60" y="58" textAnchor="middle" fontSize="26" fontWeight="700" fill="white">{valor}</text>
      <text x="60" y="76" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)">/100</text>
    </svg>
  );
}

const indicadoresFicticios = [
  { nome: "Proteção", valor: 82 },
  { nome: "Educação digital", valor: 75 },
  { nome: "Acolhimento", valor: 79 },
  { nome: "Canais de apoio", valor: 68 },
];

function TabelaFicticia() {
  return (
    <div className="flex-1 space-y-2.5 w-full">
      {indicadoresFicticios.map((item) => (
        <div key={item.nome}>
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>{item.nome}</span>
            <span className="font-semibold text-white">{item.valor}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-green-400" style={{ width: `${item.valor}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MapaTermometroExplicacao() {
  return (
    <section id="mapa" className="relative overflow-hidden text-white bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1]">
      <FundoSecao />
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl font-bold mb-3">Mapa e Termômetro</h2>
          <p className="text-white/80 leading-relaxed">
            Cada escola participante aparece no mapa com uma nota de segurança digital, calculada a partir das respostas anônimas da própria comunidade escolar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15 hover:border-white/25">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/20">
                <MapPin className="text-green-400" size={24} />
              </span>
              <h3 className="font-display text-lg font-bold">Mapa da proteção</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">
              Veja, cidade por cidade, como está o ambiente digital das escolas do Ceará e onde a atenção é mais urgente.
            </p>
            <div className="mt-auto flex items-center justify-center h-40">
              <img src="/mapa-simples.png" alt="Ilustração do mapa do Brasil com marcadores coloridos por nível de selo" className="h-full w-auto object-contain" />
            </div>
          </div>

          <div id="termometro" className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15 hover:border-white/25">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400/20">
                <Gauge className="text-blue-300" size={24} />
              </span>
              <h3 className="font-display text-lg font-bold">Termômetro escolar</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">
              Um índice único, de 0 a 100, resume os indicadores de proteção, acolhimento e educação digital de cada escola.
            </p>
            <div className="flex items-center gap-5">
              <GaugeSimbolico valor={78} />
              <TabelaFicticia />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15 hover:border-white/25">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400/20">
                <MessageSquarePlus className="text-emerald-300" size={24} />
              </span>
              <h3 className="font-display text-lg font-bold">Feedback</h3>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6">
              Quer ajudar a atualizar a nota da sua escola? Sua opinião é anônima, leva menos de um minuto e alimenta diretamente o Termômetro.
            </p>
            <div className="flex items-center justify-center h-40 mb-4">
              <img src="/imagem-feedback.png" alt="Ilustração mostrando respostas de feedback virando um relatório e um selo de segurança" className="h-full w-auto object-contain" />
            </div>
            <Link to="/plataforma" className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
              <MessageSquarePlus size={18} />Enviar feedback
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/plataforma" className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-4 font-bold uppercase text-brand-navy hover:brightness-95 transition">
            Ver o mapa completo<ArrowRight size={18} />
          </Link>
          <p className="text-xs text-white/50 mt-3">Dados ilustrativos. O mapa interativo utiliza dados simulados para demonstração do protótipo.</p>
        </div>
      </div>
    </section>
  );
}

export default MapaTermometroExplicacao;