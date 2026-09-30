import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { escolas } from "../data/escolas";
import L from "leaflet";

const cores = {
  ouro: "#F5C451",
  prata: "#94A3B8",
  bronze: "#B08968",
  em_progresso: "#CBD5E1"
};

function criarIcone(nivel) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${cores[nivel]}; width:20px; height:20px; border-radius:50%; border:2px solid white;"></div>`,
    iconSize: [20, 20]
  });
}

function AjustarVisao({ pontos }) {
  const map = useMap();

  useEffect(() => {
    if (pontos.length > 0) {
      const bounds = L.latLngBounds(pontos.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [pontos, map]);

  return null;
}

function Mapa() {
  return (
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <AjustarVisao pontos={escolas} />

      {escolas.map((escola) => (
        <Marker
          key={escola.id}
          position={[escola.lat, escola.lng]}
          icon={criarIcone(escola.nivel)}
        >
          <Popup>
            <strong>{escola.nome}</strong>
            <br />
            {escola.estado} — {escola.regiao}
            <br />
            Nível: {escola.nivel}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Mapa;