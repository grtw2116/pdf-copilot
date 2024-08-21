import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/cjs/Page/AnnotationLayer.css";
import "react-pdf/dist/cjs/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer() {
  return (
    <Document file="../assets/example.pdf">
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>
  );
}
