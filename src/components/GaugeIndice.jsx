function corPorValor(valor) {
  if (valor >= 80) return "#22C55E";
  if (valor >= 60) return "#F59E0B";
  return "#EF4444";
}

function GaugeIndice({ valor, tamanho = 140 }) {
  const raio = 46;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (valor / 100) * circunferencia;
  const cor = corPorValor(valor);
  return (
    <svg viewBox="0 0 120 120" width={tamanho} height={tamanho}>
      <circle cx="60" cy="60" r={raio} fill="none" stroke="#E2E8F0" strokeWidth="10" />
      <circle cx="60" cy="60" r={raio} fill="none" stroke={cor} strokeWidth="10" strokeDasharray={`${preenchido} ${circunferencia}`} strokeLinecap="round" transform="rotate(-90 60 60)" />
      <text x="60" y="60" textAnchor="middle" fontSize="30" fontWeight="800" fill="#0B2545">{valor}</text>
      <text x="60" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={cor}>/100</text>
    </svg>
  );
}

export default GaugeIndice;