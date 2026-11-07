export function gerarNotificacoes(resumoRede) {
  const { indiceMedio, totalAlertas, ranking } = resumoRede;
  const total = ranking.length;
  const escolasComAlerta = ranking.filter((e) => e.alertas.length > 0).length;
  const pior = ranking[ranking.length - 1];

  const lista = [];

  if (indiceMedio >= 60) {
    lista.push({
      id: "indice",
      tipo: "positivo",
      titulo: "Índice médio dentro do esperado",
      texto: `O índice médio do estado está em ${indiceMedio}%, acima do mínimo recomendado (60%).`,
    });
  } else {
    lista.push({
      id: "indice",
      tipo: "alerta",
      titulo: "Índice médio abaixo do esperado",
      texto: `O índice médio do estado está em ${indiceMedio}%, abaixo do mínimo recomendado (60%).`,
    });
  }

  if (totalAlertas > 0) {
    lista.push({
      id: "alertas",
      tipo: "alerta",
      titulo: "Pontos de atenção ativos",
      texto: `${totalAlertas} ${totalAlertas === 1 ? "categoria está" : "categorias estão"} abaixo de 60%, em ${escolasComAlerta} de ${total} escolas.`,
    });
  } else {
    lista.push({
      id: "alertas",
      tipo: "positivo",
      titulo: "Nenhum alerta ativo",
      texto: "Nenhuma categoria está abaixo do recomendado em nenhuma escola.",
    });
  }

  if (pior) {
    if (pior.indice < 60) {
      lista.push({
        id: "pior",
        tipo: "alerta",
        titulo: "Escola que precisa de atenção",
        texto: `${pior.nome} tem o menor índice do estado (${pior.indice}%).`,
      });
    } else {
      lista.push({
        id: "pior",
        tipo: "positivo",
        titulo: "Todas as escolas acima do mínimo",
        texto: `O menor índice do estado é ${pior.indice}% (${pior.nome}), acima de 60%.`,
      });
    }
  }

  return lista;
}