import { useNavigate } from "react-router-dom";
import { Eye, GraduationCap, BookOpen, Landmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FundoLogin() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lgVerde" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22C55E" />
          <stop offset="1" stopColor="#0E8F4F" />
        </linearGradient>
        <linearGradient id="lgAmarelo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE14D" />
          <stop offset="1" stopColor="#F5A100" />
        </linearGradient>
      </defs>
      <polygon points="0,0 170,0 0,220" fill="url(#lgVerde)" opacity="0.45" />
      <polygon points="0,0 100,0 0,130" fill="url(#lgAmarelo)" opacity="0.75" />
      <polygon points="1440,720 1440,520 1240,720" fill="url(#lgAmarelo)" opacity="0.75" />
      <polygon points="1440,720 1440,610 1330,720" fill="url(#lgVerde)" opacity="0.55" />
    </svg>
  );
}

const opcoes = [
  { id: "visitante", titulo: "Visitante", descricao: "Visualize o mapa, os índices e os dados das escolas. Sem enviar feedback.", Icone: Eye, cor: "bg-slate-600 group-hover:bg-slate-700" },
  { id: "aluno", titulo: "Aluno Online", descricao: "Acesse com seu perfil de aluno. Veja os dados e envie feedback da sua escola.", Icone: GraduationCap, cor: "bg-brand-green group-hover:bg-emerald-700" },
  { id: "professor", titulo: "Professor Online", descricao: "Acesse com seu perfil de professor. Veja os dados e envie feedback da sua escola.", Icone: BookOpen, cor: "bg-brand-blue group-hover:bg-blue-800" },
];

function Login() {
  const navigate = useNavigate();
  const { setPerfil } = useAuth();

  function entrar(id) {
    setPerfil(id);
    navigate("/plataforma");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative overflow-hidden flex-1 flex items-center text-white bg-gradient-to-br from-[#031339] via-[#0a2a72] to-[#0d47a1] py-16">
        <FundoLogin />
        <div className="relative max-w-5xl mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Como você quer acessar o EduSec?</h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Escolha seu perfil para continuar. Essa seleção define se você pode apenas visualizar os dados ou também enviar feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {opcoes.map((opcao) => (
              <button
                key={opcao.id}
                onClick={() => entrar(opcao.id)}
                className="group bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/15 hover:border-white/25"
              >
                <span className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${opcao.cor} mb-4 transition-colors`}>
                  <opcao.Icone className="text-white" size={26} />
                </span>
                <h3 className="font-display text-lg font-bold mb-2">{opcao.titulo}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{opcao.descricao}</p>
              </button>
            ))}

            <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-6 text-left opacity-60 cursor-not-allowed">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-500 mb-4">
                <Landmark className="text-white" size={26} />
              </span>
              <h3 className="font-display text-lg font-bold mb-2">Gestor Público</h3>
              <p className="text-sm text-white/75 leading-relaxed">Em breve: acesso dedicado para gestores e representantes públicos de educação.</p>
            </div>
          </div>

          <p className="text-center text-xs text-white/50 mt-10">
            Login apenas para fins de demonstração do protótipo — não envolve senha ou dados pessoais reais.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;