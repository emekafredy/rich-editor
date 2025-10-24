import { Route, Routes } from "react-router-dom";

import { Footer } from "./components/Layouts/Footer";
import { Header } from "./components/Layouts/Header";
import { useTheme } from "./context/ThemeProvider";
import { LandingPage } from "./views/Landing";
import { NotesPage } from "./views/Notes";
import { QuillEditor } from "./views/TextEditor";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<QuillEditor />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
