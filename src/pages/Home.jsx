import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CicloExplicativo from "../components/CicloExplicativo";
import MapaTermometroExplicacao from "../components/MapaTermometroExplicacao";
import SecaoSelos from "../components/SecaoSelos";
import Footer from "../components/Footer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const idParaRolar = location.state?.scrollTo;
    if (!idParaRolar) return;
    const tempo = setTimeout(() => {
      const elemento = document.getElementById(idParaRolar);
      if (elemento) elemento.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => clearTimeout(tempo);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header />
      <Hero />
      <CicloExplicativo />
      <MapaTermometroExplicacao />
      <SecaoSelos />
      <Footer />
    </div>
  );
}

export default Home;