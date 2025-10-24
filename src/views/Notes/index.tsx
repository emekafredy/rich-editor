import { Edit3, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotes } from "../../context/NotesProvider";
import { Note } from "../../types/note";

export const NotesPage: React.FC = () => {
  const { notes, loading, deleteNote } = useNotes();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredNotes = notes.filter(
    (note: Note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleDelete = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.stopPropagation();
    if (deleteConfirm === id) {
      await deleteNote(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse text-purple-600 dark:text-purple-400">
            Loading notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 transition-colors duration-300 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-500">
            My Notes
          </h1>
          <button
            onClick={() => navigate("/editor")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search notes..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            />
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <FileText
              size={64}
              className="mx-auto mb-4 text-purple-200 dark:text-gray-600"
            />
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Start creating your first note"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate("/editor")}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Create Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note: Note) => (
              <div
                key={note.id}
                onClick={() => navigate(`/note/${note.id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 truncate">
                    {note.title || "Untitled"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {stripHtml(note.content)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          navigate(`/editor/${note.id}`);
                        }}
                        className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg transition-all duration-300"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleDelete(note.id, e)
                        }
                        className={`p-2 ${
                          deleteConfirm === note.id
                            ? "text-red-600 bg-red-50 dark:bg-red-900"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } rounded-lg transition-all duration-300`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
