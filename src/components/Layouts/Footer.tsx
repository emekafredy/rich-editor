import { Edit3, Github, Heart, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Edit3
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
              <span
                className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Editor
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Write, create, and share with embedded media support.
            </p>
            <div className="flex gap-4">
              <Link
                to="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-purple-900 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
              >
                <Github size={20} />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-lg bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-purple-900 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
              >
                <Twitter size={20} />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-lg bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-purple-900 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-gray-800 dark:text-gray-500 font-bold mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/editor"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Create Note
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  My Notes
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 dark:text-gray-500 font-bold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              © {currentYear} TextEditor. with{" "}
              <Heart size={16} className="text-red-500 fill-red-500" />
            </p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
