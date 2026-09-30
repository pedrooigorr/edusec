import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BotaoExportarPDF({ targetId }) {
  async function exportarPDF() {
    const elemento = document.getElementById(targetId);
    if (!elemento) return;

    const canvas = await html2canvas(elemento, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const largura = pdf.internal.pageSize.getWidth();
    const altura = (canvas.height * largura) / canvas.width;

    pdf.text("Relatório EduSec - Ambiente Digital Escolar", 10, 10);
    pdf.addImage(imgData, "PNG", 0, 15, largura, altura);
    pdf.save("relatorio-edusec.pdf");
  }

  return (
    <button
      onClick={exportarPDF}
      className="inline-flex items-center rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
    >
      Exportar relatório em PDF
    </button>
  );
}

export default BotaoExportarPDF;