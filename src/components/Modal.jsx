import { useEffect } from "react";
import { X } from "lucide-react";

function DecoracaoModal() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 1000" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,0 220,0 0,300" fill="#0E8F4F" opacity="0.5" />
      <polygon points="0,0 120,0 0,170" fill="#0B2545" opacity="0.6" />
      <polygon points="800,0 620,0 800,260" fill="#0E8F4F" opacity="0.4" />
      <path d="M800 0 L800 90 L720 0 Z" fill="#0B2545" opacity="0.55" />
      <polygon points="0,1000 0,760 230,1000" fill="#0B2545" opacity="0.55" />
      <polygon points="0,1000 0,860 130,1000" fill="#0E8F4F" opacity="0.45" />
      <polygon points="800,1000 800,740 560,1000" fill="#0E8F4F" opacity="0.45" />
      <polygon points="800,1000 800,870 680,1000" fill="#0B2545" opacity="0.55" />
    </svg>
  );
}

function Modal({ aberto, onFechar, children }) {
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onFechar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#FBC913" }}
      >
        <DecoracaoModal />

        <button
          onClick={onFechar}
          className="absolute top-4 right-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors shadow-md"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 max-h-[90vh] overflow-y-auto p-5 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;