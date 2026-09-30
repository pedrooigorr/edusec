import { escolas } from "./escolas";

const perfilPorNivel = {
  ouro: { protecao: 4.6, educacao: 4.7, acolhimento: 4.5, canais: 4.4, social: 4.6, riscoSimPct: 0.05 },
  prata: { protecao: 3.6, educacao: 3.5, acolhimento: 3.7, canais: 3.4, social: 3.6, riscoSimPct: 0.15 },
  bronze: { protecao: 2.6, educacao: 2.5, acolhimento: 2.7, canais: 2.3, social: 2.6, riscoSimPct: 0.3 },
  em_progresso: { protecao: 2.0, educacao: 1.9, acolhimento: 2.1, canais: 1.8, social: 2.0, riscoSimPct: 0.4 },
};

function variar(base) {
  const delta = (Math.random() - 0.5) * 1;
  return Math.min(5, Math.max(1, Math.round((base + delta) * 10) / 10));
}

function gerarRespostasEscola(escola, quantidade = 10) {
  const perfil = perfilPorNivel[escola.nivel] ?? perfilPorNivel.prata;
  const respostas = [];
  for (let i = 0; i < quantidade; i++) {
    const sorteio = Math.random();
    const jaViveuRisco = sorteio < perfil.riscoSimPct ? "sim" : sorteio < perfil.riscoSimPct + 0.1 ? "prefiro_nao_dizer" : "nao";
    respostas.push({
      escola: escola.nome,
      jaViveuRisco,
      notas: {
        protecao: variar(perfil.protecao),
        educacao: variar(perfil.educacao),
        acolhimento: variar(perfil.acolhimento),
        canais: variar(perfil.canais),
        social: variar(perfil.social),
      },
    });
  }
  return respostas;
}

export const respostasSeedPorEscola = Object.fromEntries(
  escolas.map((escola) => [escola.nome, gerarRespostasEscola(escola)])
);