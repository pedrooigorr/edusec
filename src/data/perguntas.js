export const categorias = {
  protecao: { nome: "Proteção Digital", cor: "#2563EB" },
  educacao: { nome: "Educação Digital", cor: "#0E8F4F" },
  acolhimento: { nome: "Acolhimento", cor: "#7C3AED" },
  canais: { nome: "Canais de Apoio", cor: "#F59E0B" },
  social: { nome: "Ambiente Social e Institucional", cor: "#DC2626" },
};

export const planosDeAcao = {
  protecao: "Promover oficinas práticas de reconhecimento de golpes, assédio e outras situações de risco online.",
  educacao: "Ampliar a carga horária de letramento digital nas aulas e capacitações da escola.",
  acolhimento: "Treinar a equipe pedagógica para acolhimento ativo de relatos ligados ao ambiente digital.",
  canais: "Divulgar de forma visível o canal de denúncia nos murais, site e grupos oficiais da escola.",
  social: "Implementar uma campanha educativa contra o cyberbullying, com participação ativa dos próprios alunos.",
};

export const perguntasDigital = [
  {
    id: "reconhecimento_risco",
    categoria: "protecao",
    texto: "Eu sei reconhecer uma situação de risco online (golpe, assédio, conteúdo perigoso).",
    tipo: "escala",
  },
  {
    id: "ja_viveu_risco",
    categoria: null,
    texto: "Já presenciei ou passei por uma situação de risco digital.",
    tipo: "opcao",
    opcoes: [
      { valor: "sim", label: "Sim" },
      { valor: "nao", label: "Não" },
      { valor: "prefiro_nao_dizer", label: "Prefiro não dizer" },
    ],
  },
  {
    id: "educacao_digital",
    categoria: "educacao",
    texto: "A escola já me ensinou sobre segurança e uso responsável da internet.",
    tipo: "escala",
  },
  {
    id: "acolhimento",
    categoria: "acolhimento",
    texto: "Se eu precisar de ajuda sobre algo que aconteceu online, me sinto à vontade para procurar um adulto da escola.",
    tipo: "escala",
  },
  {
    id: "canais_apoio",
    categoria: "canais",
    texto: "Eu sei a quem recorrer (professor, coordenação, canal de denúncia) se algo de errado acontecer online.",
    tipo: "escala",
  },
];

export const perguntasSocial = [
  {
    id: "combate_bullying",
    categoria: "social",
    texto: "A escola atua ativamente na prevenção e combate ao cyberbullying.",
    tipo: "escala",
  },
  {
    id: "convivencia",
    categoria: "social",
    texto: "Sinto que a escola promove um ambiente social acolhedor, sem exclusão ou discriminação entre os alunos.",
    tipo: "escala",
  },
  {
    id: "resposta_institucional",
    categoria: "social",
    texto: "Quando um caso de bullying ou cyberbullying é identificado, a escola toma providências claras e eficazes.",
    tipo: "escala",
  },
];