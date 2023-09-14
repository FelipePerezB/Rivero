import resize from "./resize";

export async function generatePdf() {
  return true;
  // const $container = document.getElementById("doc-container-pdf");
  // const $doc = document.getElementById("doc-pdf");
  // if ($doc && $container) {
  //   $container.style.width = "max-content";
  //   $doc.style.width = "450px";
  //   $doc.style.fontSize = "13px";
  //   $doc.style.gap = "0";
  //   const title = $doc.querySelector('#doc-title')?.innerHTML
  //   const data = await import("html2pdf.js" as any);
  //   const html2pdf = data.default;
  //   const pdf = html2pdf()
  //     .set({
  //       filename: typeof title === "string" ? title.toLowerCase() : "Documento sin titulo",
  //       html2canvas: {
  //         scale: 4, // A mayor escala, mejores gráficos, pero más peso
  //         letterRendering: true,
  //       },
  //       jsPDF: {
  //         unit: "px",
  //         format: "a4",
  //       },
  //     })
  //     .from($doc);
  //   await pdf.save();

  //   resize(0.5);
  //   $doc.style.gap = "1.4em";
  // }
  // return true;
}
