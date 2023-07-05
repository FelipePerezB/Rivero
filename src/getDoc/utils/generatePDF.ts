// import html2pdf from "html2pdf.js";

import resize from "./resize";

export async function generatePdf() {
  const $doc = document.getElementById("doc");
  if ($doc) {
    $doc.style.width = "450px";
    $doc.style.fontSize = "13px";
    $doc.style.gap = "0";

    const data = await import("html2pdf.js" as any);
    const html2pdf = data.default;
    const pdf = html2pdf()
      .set({
        filename: "Sistema de ecuaciones.pdf",
        html2canvas: {
          scale: 4, // A mayor escala, mejores gráficos, pero más peso
          letterRendering: true,
        },
        jsPDF: {
          unit: "px",
          format: "a4",
        },
      })
      .from($doc);
    await pdf.save();

      resize(0.5)
      $doc.style.gap = "1.4em";

  }
}
