import { categorias, planosDeAcao } from "../data/perguntas";

// Converte nota de 1 a 5 em porcentagem de 0 a 100 (1 = 20%, 5 = 100%)
export function notaParaPercentual(nota) {
  return Math.round((nota / 5) * 100);
}

// Recebe um array de respostas (documentos do Firestore) de uma mesma escola
// e devolve a média de cada categoria em porcentagem.
export function calcularMediasPorCategoria(respostas) {
  const somas = {};
  const contagens = {};

  respostas.forEach((resposta) => {
    Object.entries(resposta.notas || {}).forEach(([categoriaId, nota]) => {
      somas[categoriaId] = (somas[categoriaId] || 0) + nota;
      contagens[categoriaId] = (contagens[categoriaId] || 0) + 1;
    });
  });

  const medias = {};
  Object.keys(categorias).forEach((categoriaId) => {
    if (contagens[categoriaId]) {
      medias[categoriaId] = notaParaPercentual(somas[categoriaId] / contagens[categoriaId]);
    }
  });

  return medias;
}

// Índice geral de segurança: média simples das médias de cada categoria.
export function calcularIndiceGeral(mediasPorCategoria) {
  const valores = Object.values(mediasPorCategoria);
  if (valores.length === 0) return 0;
  const soma = valores.reduce((acc, v) => acc + v, 0);
  return Math.round(soma / valores.length);
}

// Categorias abaixo de 60% geram alerta + sugestão de plano de ação.
export function gerarAlertas(mediasPorCategoria) {
  return Object.entries(mediasPorCategoria)
    .filter(([, valor]) => valor < 60)
    .map(([categoriaId, valor]) => ({
      categoriaId,
      nome: categorias[categoriaId]?.nome ?? categoriaId,
      valor,
      sugestao: planosDeAcao[categoriaId],
    }));
}

// Distribuição da pergunta "já viveu risco digital", pronta para o gráfico de pizza.
export function calcularDistribuicaoRisco(respostas) {
  const contagem = { sim: 0, nao: 0, prefiro_nao_dizer: 0 };
  respostas.forEach((r) => {
    if (r.jaViveuRisco && contagem[r.jaViveuRisco] !== undefined) {
      contagem[r.jaViveuRisco] += 1;
    }
  });
  return contagem;
}