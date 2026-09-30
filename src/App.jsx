import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plataforma from "./pages/Plataforma";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plataforma" element={<Plataforma />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;