import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Map, FileText, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const itens = [
  { to: "/gestor", label: "Visão Geral da Rede", Icone: LayoutDashboard, ativo: true },
  { to: "/plataforma", label: "Mapa por Escola", Icone: Map, ativo: true },
  { to: "/gestor/relatorios", label: "Relatórios", Icone: FileText, ativo: false },
  { to: "/gestor/configuracoes", label: "Configurações", Icone: Settings, ativo: false },
];

function GestorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setPerfil } = useAuth();

  function sair() {
    setPerfil(null);
    navigate("/login");
  }

  return (
    <aside className="w-64 shrink-0 bg-brand-navy text-white flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <img src="/marca-edusec.png" alt="" className="w-9 h-9 object-contain" />
          <span className="font-display text-xl font-extrabold">EduSec</span>
        </div>
        <p className="text-xs text-white/60 leading-snug">Escolas mais seguras, com dados que importam.</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {itens.map((item) => {
          const atual = location.pathname === item.to;
          if (!item.ativo) {
            return (
              <span
                key={item.to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/35 cursor-not-allowed"
                title="Em breve"
              >
                <item.Icone size={18} />
                {item.label}
              </span>
            );
          }
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                atual ? "bg-brand-green text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.Icone size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-5 border-t border-white/10">
        <button onClick={sair} className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}

export default GestorSidebar;