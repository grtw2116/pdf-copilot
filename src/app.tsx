import { createRoot } from "react-dom/client";
import PDFViewer from "./PDFViewer";

const root = createRoot(document.getElementById("app"));
root.render(<App />);

function App() {
  return <PDFViewer />;
}
