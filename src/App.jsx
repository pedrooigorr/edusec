import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import PainelAcessibilidade from "./components/PainelAcessibilidade";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Plataforma from "./pages/Plataforma";
import GestorVisaoGeral from "./pages/GestorVisaoGeral";

function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <BrowserRouter>
          <PainelAcessibilidade />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plataforma" element={<Plataforma />} />
            <Route path="/gestor" element={<GestorVisaoGeral />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;