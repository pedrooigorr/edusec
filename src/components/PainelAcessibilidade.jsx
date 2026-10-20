import { X, Type, Contrast, AlignJustify, PauseCircle, RotateCcw } from "lucide-react";
import { useAccessibility } from "../context/AccessibilityContext";

function Opcao({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        props["aria-pressed"]
          ? "bg-brand-green text-white border-brand-green"
          : "bg-white text-brand-navy border-slate-300 hover:border-brand-green"
      }`}
    >
      {children}
    </button>
  );
}

function Interruptor({ label, Icone, ativo, onChange, descricao }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <Icone className="text-brand-blue shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-semibold text-brand-navy">{label}</p>
          {descricao && <p className="text-xs text-slate-500">{descricao}</p>}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={ativo}
        onClick={() => onChange(!ativo)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${ativo ? "bg-brand-green" : "bg-slate-300"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${ativo ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

function PainelAcessibilidade() {
  const { config, atualizar, restaurarPadrao, painelAberto, setPainelAberto } = useAccessibility();

  if (!painelAberto) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-start justify-end p-4 bg-black/40" onClick={() => setPainelAberto(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl mt-16 md:mt-20 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-brand-navy text-white">
          <h3 className="font-display font-bold">Acessibilidade</h3>
          <button onClick={() => setPainelAberto(false)} className="text-white/80 hover:text-white" aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center gap-3 mb-2">
            <Type className="text-brand-blue" size={20} />
            <p className="text-sm font-semibold text-brand-navy">Tamanho do texto</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <Opcao aria-pressed={config.tamanhoTexto === "padrao"} onClick={() => atualizar("tamanhoTexto", "padrao")}>Padrão</Opcao>
            <Opcao aria-pressed={config.tamanhoTexto === "media"} onClick={() => atualizar("tamanhoTexto", "media")}>Médio</Opcao>
            <Opcao aria-pressed={config.tamanhoTexto === "grande"} onClick={() => atualizar("tamanhoTexto", "grande")}>Grande</Opcao>
          </div>
        </div>

        <div className="px-5 divide-y divide-slate-100 border-t border-slate-100">
          <Interruptor
            label="Alto contraste"
            descricao="Aumenta o contraste entre texto e fundo"
            Icone={Contrast}
            ativo={config.altoContraste}
            onChange={(v) => atualizar("altoContraste", v)}
          />
          <Interruptor
            label="Espaçamento ampliado"
            descricao="Mais espaço entre letras e linhas"
            Icone={AlignJustify}
            ativo={config.espacamento}
            onChange={(v) => atualizar("espacamento", v)}
          />
          <Interruptor
            label="Reduzir animações"
            descricao="Desativa transições e efeitos de movimento"
            Icone={PauseCircle}
            ativo={config.reduzirMovimento}
            onChange={(v) => atualizar("reduzirMovimento", v)}
          />
        </div>

        <div className="px-5 py-4 border-t border-slate-100">
          <button
            onClick={restaurarPadrao}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 px-4 py-2.5 text-sm font-semibold transition-colors"
          >
            <RotateCcw size={16} />Restaurar padrão
          </button>
        </div>
      </div>
    </div>
  );
}

export default PainelAcessibilidade;