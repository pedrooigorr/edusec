import { useEffect } from "react";
import { X } from "lucide-react";

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
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-brand-green/60 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-green/50 pointer-events-none" />
        <div className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full bg-brand-navy/90 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand-navy/80 pointer-events-none" />

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