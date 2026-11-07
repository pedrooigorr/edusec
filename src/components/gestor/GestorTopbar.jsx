import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { School, Bell, ChevronDown, LogOut, CircleCheck, TriangleAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function DecoracaoTopbar() {
  return (
    <svg className="absolute top-0 right-0 w-40 h-20" viewBox="0 0 160 80" fill="none" aria-hidden="true">
      <polygon points="160,0 160,80 60,0" fill="#0E8F4F" opacity="0.5" />
      <polygon points="160,0 160,50 100,0" fill="#F5A100" opacity="0.6" />
      <polygon points="160,0 160,25 130,0" fill="#1E5AA8" opacity="0.5" />
    </svg>
  );
}

function GestorTopbar({ titulo, subtitulo, notificacoes = [] }) {
  const navigate = useNavigate();
  const { setPerfil } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const [sinoAberto, setSinoAberto] = useState(false);
  const [lidas, setLidas] = useState(false);
  const menuRef = useRef(null);
  const sinoRef = useRef(null);

  useEffect(() => {
    function fechar(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAberto(false);
      if (sinoRef.current && !sinoRef.current.contains(e.target)) setSinoAberto(false);
    }
    document.addEventListener("mousedown", fechar);
    return () => document.removeEventListener("mousedown", fechar);
  }, []);

  function alternarSino() {
    setSinoAberto((v) => !v);
    setMenuAberto(false);
    setLidas(true);
  }

  function sair() {
    setPerfil(null);
    navigate("/login");
  }

  return (
    <header className="relative z-30 bg-white border-b border-slate-200 px-8 py-5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecoracaoTopbar />
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Olá, Gestor!</p>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">{titulo}</h1>
          {subtitulo && <p className="text-sm text-slate-500 mt-1">{subtitulo}</p>}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
            <School size={16} className="text-brand-blue" />
            Estado do Ceará
          </span>

          <div ref={sinoRef} className="relative">
            <button
              onClick={alternarSino}
              className="relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label={`Notificações (${notificacoes.length})`}
              aria-expanded={sinoAberto}
            >
              <Bell size={18} />
              {!lidas && notificacoes.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {notificacoes.length}
                </span>
              )}
            </button>

            {sinoAberto && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden z-50">
                <p className="px-4 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">Notificações</p>
                {notificacoes.map((n) => {
                  const bom = n.tipo === "positivo";
                  const Icone = bom ? CircleCheck : TriangleAlert;
                  return (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-t border-slate-100 ${bom ? "bg-green-50/60" : "bg-red-50/60"}`}>
                      <Icone size={18} className={`shrink-0 mt-0.5 ${bom ? "text-green-600" : "text-red-600"}`} />
                      <div>
                        <p className={`text-sm font-semibold ${bom ? "text-green-800" : "text-red-800"}`}>{n.titulo}</p>
                        <p className="text-xs text-slate-600 leading-snug">{n.texto}</p>
                      </div>
                    </div>
                  );
                })}
                <p className="px-4 py-2.5 text-[11px] text-slate-400 border-t border-slate-100">Baseado em dados simulados para demonstração.</p>
              </div>
            )}
          </div>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => { setMenuAberto((v) => !v); setSinoAberto(false); }}
              className="flex items-center gap-2 border border-slate-200 rounded-full pl-2 pr-3 py-1.5 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-blue text-white text-xs font-bold">GP</span>
              <span className="hidden sm:inline text-sm font-medium text-brand-navy">Gestor Público</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${menuAberto ? "rotate-180" : ""}`} />
            </button>

            {menuAberto && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden z-50">
                <button onClick={sair} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} />Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default GestorTopbar;