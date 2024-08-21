import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app"));
root.render(<App />);

function App() {
  return <h2>Hello, React!</h2>;
}
