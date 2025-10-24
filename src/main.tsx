import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { NotesProvider } from "./context/NotesProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
