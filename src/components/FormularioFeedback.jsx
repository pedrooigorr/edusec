import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { escolas } from "../data/escolas";
import { perguntasDigital, perguntasSocial } from "../data/perguntas";
import { Monitor, Users, Building2, BarChart3, Send } from "lucide-react";

const perguntasEscalaDigital = perguntasDigital.filter((p) => p.tipo === "escala");
const perguntaRisco = perguntasDigital.find((p) => p.tipo === "opcao");

function Cabecalho() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pr-10">
      <div className="flex items-center gap-4">
        <img src="/marca-edusec.png" alt="EduSec" className="h-20 w-auto" />
        <span className="w-px h-10 bg-brand-navy/20" />
        <div>
          <p className="font-display text-xl font-extrabold text-brand-navy leading-none">FEEDBACK</p>
          <p className="text-xs text-brand-navy/70 leading-tight mt-1">
            Comunidade Escolar<br />por um ambiente mais seguro
          </p>
        </div>
      </div>
      <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-brand-navy shadow">
        <BarChart3 size={16} className="text-blue-700" />
        Sua opinião fortalece a proteção!
      </span>
    </div>
  );
}

function CartaoEscola({ valor, onChange, fixa }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 mb-6">
      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-700 shrink-0">
        <Building2 size={22} />
      </span>
      <div className="flex-1">
        <label className="block text-sm font-semibold text-slate-500 mb-1">Escola</label>
        <select value={valor} onChange={(e) => onChange(e.target.value)} disabled={!!fixa} className="w-full border border-slate-300 rounded-lg p-2.5 text-base disabled:bg-slate-100">
          <option value="">Selecione sua escola</option>
          {escolas.map((escola) => (
            <option key={escola.id} value={escola.nome}>{escola.nome}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SecaoBanner({ Icone, titulo, descricao, cor }) {
  const fundo = cor === "verde" ? "bg-brand-green" : "bg-brand-navy";
  return (
    <div className={`relative rounded-2xl ${fundo} text-white px-5 py-4 flex items-center gap-4 shadow-md mb-5`}>
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 shrink-0">
        <Icone size={24} />
      </span>
      <h4 className="font-display font-extrabold text-base md:text-lg uppercase shrink-0">{titulo}</h4>
      <span className="hidden sm:block w-px h-10 bg-white/30 shrink-0" />
      <p className="hidden sm:block text-sm text-white/90 leading-snug">{descricao}</p>
    </div>
  );
}

function PerguntaEscala({ numero, texto, valor, onChange, cor }) {
  const circulo = cor === "verde" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
  const pill = cor === "verde" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  const slider = cor === "verde" ? "accent-green-600" : "accent-blue-700";
  return (
    <div className="relative mb-5">
      <span className={`absolute -left-3 top-5 z-10 flex items-center justify-center w-9 h-9 rounded-full font-display font-bold text-base shadow ${circulo}`}>
        {numero}
      </span>
      <div className="bg-white rounded-2xl shadow-md p-6 pl-9">
        <div className="flex items-start justify-between gap-4 mb-1">
          <p className="font-display font-bold text-brand-navy text-base md:text-lg leading-snug">{texto}</p>
          <span className={`shrink-0 rounded-full px-4 py-1.5 font-display font-bold text-lg ${pill}`}>{valor}</span>
        </div>
        <p className="text-sm text-slate-400 mb-4">(1 = discordo, 5 = concordo totalmente)</p>
        <input type="range" min="1" max="5" value={valor} onChange={(e) => onChange(Number(e.target.value))} className={`w-full ${slider}`} />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>1</span><span>5</span>
        </div>
      </div>
    </div>
  );
}

function PerguntaOpcao({ numero, texto, valor, onChange, opcoes }) {
  return (
    <div className="relative mb-5">
      <span className="absolute -left-3 top-5 z-10 flex items-center justify-center w-9 h-9 rounded-full font-display font-bold text-base shadow bg-blue-100 text-blue-700">
        {numero}
      </span>
      <div className="bg-white rounded-2xl shadow-md p-6 pl-9">
        <p className="font-display font-bold text-brand-navy text-base md:text-lg mb-4">{texto}</p>
        <select value={valor} onChange={(e) => onChange(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 text-base">
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function FormularioFeedback({ escolaFixa }) {
  const [escolaSelecionada, setEscolaSelecionada] = useState(escolaFixa || "");
  const [notas, setNotas] = useState(() =>
    Object.fromEntries([...perguntasEscalaDigital, ...perguntasSocial].map((p) => [p.id, 3]))
  );
  const [jaViveuRisco, setJaViveuRisco] = useState("nao");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  function atualizarNota(id, valor) {
    setNotas((prev) => ({ ...prev, [id]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!escolaSelecionada) {
      setErro("Selecione uma escola antes de enviar.");
      return;
    }

    setEnviando(true);

    const notasPorCategoria = {};
    [...perguntasEscalaDigital, ...perguntasSocial].forEach((pergunta) => {
      notasPorCategoria[pergunta.categoria] = notas[pergunta.id];
    });

    try {
      await addDoc(collection(db, "respostas_feedback"), {
        escola: escolaSelecionada,
        notas: notasPorCategoria,
        jaViveuRisco,
        criadoEm: serverTimestamp(),
      });
      setEnviado(true);
    } catch (err) {
      setErro("Erro ao enviar. Tente novamente.");
      console.error(err);
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <p className="text-green-600 font-semibold text-lg">Obrigado! Sua resposta foi registrada de forma anônima.</p>
      </div>
    );
  }

  let contador = 0;

  return (
    <form onSubmit={handleSubmit}>
      <Cabecalho />
      <CartaoEscola valor={escolaSelecionada} onChange={setEscolaSelecionada} fixa={escolaFixa} />

      <SecaoBanner
        Icone={Monitor}
        titulo="Ambiente Digital"
        descricao="Avalie os aspectos relacionados ao uso da internet, segurança e proteção de dados na escola."
        cor="azul"
      />
      {perguntasEscalaDigital.map((pergunta) => {
        contador += 1;
        return (
          <PerguntaEscala
            key={pergunta.id}
            numero={contador}
            texto={pergunta.texto}
            valor={notas[pergunta.id]}
            onChange={(v) => atualizarNota(pergunta.id, v)}
            cor="azul"
          />
        );
      })}
      {(() => {
        contador += 1;
        return (
          <PerguntaOpcao
            numero={contador}
            texto={perguntaRisco.texto}
            valor={jaViveuRisco}
            onChange={setJaViveuRisco}
            opcoes={perguntaRisco.opcoes}
          />
        );
      })()}

      <SecaoBanner
        Icone={Users}
        titulo="Ambiente Institucional e Social"
        descricao="Avalie aspectos ligados à gestão, acolhimento, prevenção e combate ao cyberbullying."
        cor="verde"
      />
      {perguntasSocial.map((pergunta) => {
        contador += 1;
        return (
          <PerguntaEscala
            key={pergunta.id}
            numero={contador}
            texto={pergunta.texto}
            valor={notas[pergunta.id]}
            onChange={(v) => atualizarNota(pergunta.id, v)}
            cor="verde"
          />
        );
      })}

      {erro && <p className="text-red-700 font-medium text-center mb-4">{erro}</p>}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center gap-3 bg-brand-navy text-white font-display font-bold text-lg rounded-full px-10 py-4 shadow-lg hover:bg-blue-950 transition-colors disabled:opacity-50"
        >
          <Send size={20} />
          {enviando ? "Enviando..." : "Enviar resposta"}
        </button>
      </div>
    </form>
  );
}

export default FormularioFeedback;