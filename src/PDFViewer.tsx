import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/cjs/Page/AnnotationLayer.css";
import "react-pdf/dist/cjs/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(text);
      setSelectionRect(rect);
      console.log("選択されたテキスト:", text);
      console.log("選択された位置:", rect);
    }
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <Document
        file="../assets/example.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      {selectedText && (
        <div>
          <h4>選択されたテキスト:</h4>
          <p>{selectedText}</p>
          {selectionRect && (
            <div>
              <h4>選択範囲の位置:</h4>
              <p>上: {selectionRect.top}</p>
              <p>左: {selectionRect.left}</p>
              <p>幅: {selectionRect.width}</p>
              <p>高さ: {selectionRect.height}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
