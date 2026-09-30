import Header from "../components/Header";
import Hero from "../components/Hero";
import CicloExplicativo from "../components/CicloExplicativo";
import MapaTermometroExplicacao from "../components/MapaTermometroExplicacao";
import SecaoSelos from "../components/SecaoSelos";
import Footer from "../components/Footer";

function Home() {
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