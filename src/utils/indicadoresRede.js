import { respostasSeedPorEscola } from "../data/respostasSeed";
import { calcularMediasPorCategoria, calcularIndiceGeral, gerarAlertas } from "./indiceSeguranca";
import { categorias } from "../data/perguntas";

export function calcularResumoEscola(escola, respostasExtras = []) {
  const seed = respostasSeedPorEscola[escola.nome] ?? [];
  const todas = [...seed, ...respostasExtras];
  const medias = calcularMediasPorCategoria(todas);
  const indice = calcularIndiceGeral(medias);
  const alertas = gerarAlertas(medias);
  return { ...escola, medias, indice, alertas, totalRespostas: todas.length };
}

export function calcularResumoRede(listaEscolas, respostasLivePorEscola = {}) {
  const resumos = listaEscolas.map((e) =>
    calcularResumoEscola(e, respostasLivePorEscola[e.nome] || [])
  );

  const indiceMedio = resumos.length
    ? Math.round(resumos.reduce((acc, r) => acc + r.indice, 0) / resumos.length)
    : 0;

  const distribuicaoSelo = { ouro: 0, prata: 0, bronze: 0, em_progresso: 0 };
  resumos.forEach((r) => {
    if (distribuicaoSelo[r.nivel] !== undefined) distribuicaoSelo[r.nivel] += 1;
  });

  const mediaPorCategoria = {};
  Object.keys(categorias).forEach((catId) => {
    const valores = resumos.map((r) => r.medias[catId]).filter((v) => v !== undefined);
    mediaPorCategoria[catId] = valores.length
      ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
      : 0;
  });

  const totalAlertas = resumos.reduce((acc, r) => acc + r.alertas.length, 0);

  const porRegiao = {};
  resumos.forEach((r) => {
    if (!porRegiao[r.regiao]) porRegiao[r.regiao] = [];
    porRegiao[r.regiao].push(r.indice);
  });
  const mediaPorRegiao = Object.fromEntries(
    Object.entries(porRegiao).map(([regiao, valores]) => [
      regiao,
      Math.round(valores.reduce((a, b) => a + b, 0) / valores.length),
    ])
  );

  const ranking = [...resumos].sort((a, b) => b.indice - a.indice);

  return { resumos, indiceMedio, distribuicaoSelo, mediaPorCategoria, totalAlertas, mediaPorRegiao, ranking };
}