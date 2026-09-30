import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { escolas } from "../data/escolas";
import { perguntasDigital, perguntasSocial } from "../data/perguntas";

const perguntasEscala = [...perguntasDigital, ...perguntasSocial].filter((p) => p.tipo === "escala");
const perguntaRisco = perguntasDigital.find((p) => p.tipo === "opcao");

function EscalaPergunta({ pergunta, valor, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{pergunta.texto} (1 = discordo, 5 = concordo totalmente)</label>
      <input type="range" min="1" max="5" value={valor} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
      <div className="text-sm text-slate-500 text-center">{valor}</div>
    </div>
  );
}

function FormularioFeedback({ escolaFixa }) {
  const [escolaSelecionada, setEscolaSelecionada] = useState(escolaFixa || "");
  const [notas, setNotas] = useState(() => Object.fromEntries(perguntasEscala.map((p) => [p.id, 3])));
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
    perguntasEscala.forEach((pergunta) => {
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
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-green-600 font-semibold">Obrigado! Sua resposta foi registrada de forma anônima.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Escola</label>
        <select value={escolaSelecionada} onChange={(e) => setEscolaSelecionada(e.target.value)} disabled={!!escolaFixa} className="w-full border border-slate-300 rounded-md p-2 disabled:bg-slate-100">
          <option value="">Selecione sua escola</option>
          {escolas.map((escola) => (
            <option key={escola.id} value={escola.nome}>{escola.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-blue mb-4">Ambiente digital</p>
        <div className="space-y-5">
          {perguntasDigital.filter((p) => p.tipo === "escala").map((pergunta) => (
            <EscalaPergunta key={pergunta.id} pergunta={pergunta} valor={notas[pergunta.id]} onChange={(v) => atualizarNota(pergunta.id, v)} />
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{perguntaRisco.texto}</label>
            <select value={jaViveuRisco} onChange={(e) => setJaViveuRisco(e.target.value)} className="w-full border border-slate-300 rounded-md p-2">
              {perguntaRisco.opcoes.map((opcao) => (
                <option key={opcao.valor} value={opcao.valor}>{opcao.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-green mb-4">Ambiente social e institucional</p>
        <div className="space-y-5">
          {perguntasSocial.map((pergunta) => (
            <EscalaPergunta key={pergunta.id} pergunta={pergunta} valor={notas[pergunta.id]} onChange={(v) => atualizarNota(pergunta.id, v)} />
          ))}
        </div>
      </div>

      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      <button type="submit" disabled={enviando} className="bg-brand-green text-white font-semibold rounded-md px-4 py-2 hover:bg-emerald-700 disabled:opacity-50">
        {enviando ? "Enviando..." : "Enviar resposta"}
      </button>
    </form>
  );
}

export default FormularioFeedback;