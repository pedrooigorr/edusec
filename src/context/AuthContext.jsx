import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const CHAVE_STORAGE = "edusec_perfil";

export function AuthProvider({ children }) {
  const [perfil, setPerfilState] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CHAVE_STORAGE) || null;
  });

  function setPerfil(novoPerfil) {
    setPerfilState(novoPerfil);
    if (novoPerfil) {
      localStorage.setItem(CHAVE_STORAGE, novoPerfil);
    } else {
      localStorage.removeItem(CHAVE_STORAGE);
    }
  }

  const podeResponderFeedback = perfil === "aluno" || perfil === "professor";

  return (
    <AuthContext.Provider value={{ perfil, setPerfil, podeResponderFeedback }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}