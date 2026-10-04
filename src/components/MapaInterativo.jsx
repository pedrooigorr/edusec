import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import { useEffect } from "react";
import { escolas } from "../data/escolas";
import { contornoCeara, anelExternoMascara } from "../data/cearaBoundary";
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

function CentralizarEscola({ escola }) {
  const map = useMap();
  useEffect(() => {
    if (escola) {
      map.flyTo([escola.lat, escola.lng], 9, { duration: 0.8 });
    }
  }, [escola, map]);
  return null;
}

function MapaInterativo({ escolaSelecionadaId, onSelecionar, escolaParaCentralizar }) {
  return (
    <MapContainer center={[-5.2, -39.3]} zoom={7} style={{ height: "100%", width: "100%", minHeight: "480px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

      {/* Máscara: cobre tudo fora do Ceará com a cor de fundo do mapa */}
      <Polygon
        positions={[anelExternoMascara, contornoCeara]}
        pathOptions={{ color: "transparent", fillColor: "#eef2f7", fillOpacity: 1, stroke: false }}
      />

      {/* Linha do contorno do estado, por cima da máscara */}
      <Polygon
        positions={contornoCeara}
        pathOptions={{ color: "#0E8F4F", weight: 2, fillOpacity: 0 }}
      />

      <AjustarVisao pontos={escolas} />
      <CentralizarEscola escola={escolaParaCentralizar} />

      {escolas.map((escola) => (
        <Marker
          key={escola.id}
          position={[escola.lat, escola.lng]}
          icon={criarIcone(escola.nivel, escola.id === escolaSelecionadaId)}
          eventHandlers={{ click: () => onSelecionar(escola) }}
        >
          <Popup>
            <strong>{escola.nome}</strong><br />{escola.cidade} — {escola.regiao}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaInterativo;