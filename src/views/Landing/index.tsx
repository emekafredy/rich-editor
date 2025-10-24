import { Edit3, FileText, Moon, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      <div className="landing-container mx-auto px-6 pt-32 pb-20">
        <div className="mx-auto text-center mt-10">
          <div className="mb-8 animate-fade-in">
            <h1
              className="text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Write. Create.{" "}
              <span className="text-xl font-extralight">
                Share (coming soon)
              </span>
              .
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              A simple editor for your jottings. Embed videos, images, and
              social media - in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/editor")}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Plus size={24} />
              Create Note
            </button>
            <button
              onClick={() => navigate("/notes")}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FileText size={24} />
              View My Notes
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3
                  size={32}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-500">
                Rich Text Editing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Format your text with simple editing tools. Bold, italic, lists,
                and more.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText
                  size={32}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-500">
                Embed Media
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add YouTube videos, images, and social media posts directly into
                your notes.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon
                  size={32}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-500">
                Dark Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easy on the eyes with dark mode support for late-night writing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
