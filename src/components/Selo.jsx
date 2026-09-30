const config = {
  ouro: { cor: "#F5C451", texto: "#78350F", nome: "Ouro" },
  prata: { cor: "#94A3B8", texto: "#1E293B", nome: "Prata" },
  bronze: { cor: "#B08968", texto: "#431407", nome: "Bronze" },
  em_progresso: { cor: "#CBD5E1", texto: "#334155", nome: "Em progresso" }
};

function Selo({ nivel }) {
  const { cor, texto, nome } = config[nivel];

  return (
    <div
      className="flex items-center justify-center rounded-full w-20 h-20 border-4 border-white shadow"
      style={{ backgroundColor: cor }}
    >
      <span className="text-xs font-bold text-center" style={{ color: texto }}>
        {nome}
      </span>
    </div>
  );
}

export default Selo;