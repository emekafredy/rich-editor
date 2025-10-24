import { Edit3, FileText, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="flex items-center justify-center text-xl font-bold h-12 p-4 border-b-2 rounded-full border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 transition-colors duration-300"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <Edit3
              size={20}
              className="text-purple-600 dark:text-purple-400 mr-2"
            />
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              Editor
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/notes")}
            className="px-4 py-2 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 flex items-center gap-2"
          >
            <FileText size={16} />
            My Notes
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {theme === "dark" ? (
              <Moon size={20} className="text-purple-400" />
            ) : (
              <Sun size={20} className="text-purple-600" />
            )}
          </button>
        </div>
      </header>
    </>
  );
};
