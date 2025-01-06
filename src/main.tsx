import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import App from "@/App";
import "./index.css";
import "primeicons/primeicons.css";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </PrimeReactProvider>
);
