import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);
const CHAVE_STORAGE = "edusec_acessibilidade";

const padrao = {
  tamanhoTexto: "padrao",
  altoContraste: false,
  espacamento: false,
  reduzirMovimento: false,
};

export function AccessibilityProvider({ children }) {
  const [config, setConfig] = useState(() => {
    if (typeof window === "undefined") return padrao;
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
      return salvo ? { ...padrao, ...salvo } : padrao;
    } catch {
      return padrao;
    }
  });
  const [painelAberto, setPainelAberto] = useState(false);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.remove("a11y-texto-media", "a11y-texto-grande");
    if (config.tamanhoTexto === "media") raiz.classList.add("a11y-texto-media");
    if (config.tamanhoTexto === "grande") raiz.classList.add("a11y-texto-grande");

    raiz.classList.toggle("a11y-alto-contraste", config.altoContraste);
    raiz.classList.toggle("a11y-espacado", config.espacamento);
    raiz.classList.toggle("a11y-sem-animacao", config.reduzirMovimento);

    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(config));
  }, [config]);

  function atualizar(chave, valor) {
    setConfig((prev) => ({ ...prev, [chave]: valor }));
  }

  function restaurarPadrao() {
    setConfig(padrao);
  }

  return (
    <AccessibilityContext.Provider value={{ config, atualizar, restaurarPadrao, painelAberto, setPainelAberto }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}