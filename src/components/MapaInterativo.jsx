import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { escolas } from "../data/escolas";
import L from "leaflet";

const cores = {
  ouro: "#F5C451",
  prata: "#94A3B8",
  bronze: "#B08968",
  em_progresso: "#CBD5E1",
};

function criarIcone(nivel, selecionado) {
  const tamanho = selecionado ? 28 : 20;
  return L.divIcon({
    className: "",
    html: `<div style="background:${cores[nivel]}; width:${tamanho}px; height:${tamanho}px; border-radius:50%; border:${selecionado ? 3 : 2}px solid white; box-shadow:0 0 0 ${selecionado ? 4 : 0}px rgba(37,99,235,0.4);"></div>`,
    iconSize: [tamanho, tamanho],
  });
}

function AjustarVisao({ pontos }) {
  const map = useMap();
  useEffect(() => {
    if (pontos.length > 0) {
      const bounds = L.latLngBounds(pontos.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [pontos, map]);
  return null;
}

function MapaInterativo({ escolaSelecionadaId, onSelecionar }) {
  return (
    <MapContainer center={[-14.235, -51.9253]} zoom={4} style={{ height: "100%", width: "100%", minHeight: "480px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      <AjustarVisao pontos={escolas} />
      {escolas.map((escola) => (
        <Marker
          key={escola.id}
          position={[escola.lat, escola.lng]}
          icon={criarIcone(escola.nivel, escola.id === escolaSelecionadaId)}
          eventHandlers={{ click: () => onSelecionar(escola) }}
        >
          <Popup>
            <strong>{escola.nome}</strong><br />{escola.estado} — {escola.regiao}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaInterativo;