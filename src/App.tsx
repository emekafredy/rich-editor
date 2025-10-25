import { Route, Routes } from "react-router-dom";

import { Footer } from "./components/Layouts/Footer";
import { Header } from "./components/Layouts/Header";
import { useTheme } from "./context/ThemeProvider";
import { LandingPage } from "./views/Landing";
import { NoteDetailsPage } from "./views/Note";
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
        <Route
          path="/editor/:id"
          element={
            <>
              <Header />
              <QuillEditor />
            </>
          }
        />

        <Route
          path="/note/:id"
          element={
            <>
              <Header />
              <NoteDetailsPage />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
