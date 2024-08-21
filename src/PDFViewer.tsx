import { getDocument } from "pdfjs-dist";
import { useEffect, useRef } from "react";

export default function PDFViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPDF = async () => {
      const pdf = await getDocument("../assets/example.pdf").promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      }
    };

    loadPDF();
  }, []);

  return <canvas ref={canvasRef} />;
}
