import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useNotes } from "../../context/NotesProvider";
import { Note } from "../../types/note";

export const NoteDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getNote, deleteNote } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async (): Promise<void> => {
    try {
      setLoading(true);
      if (id) {
        const loadedNote = await getNote(id);
        setNote(loadedNote);
      }
    } catch (error) {
      console.error("Error loading note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!note) return;

    try {
      if (deleteConfirm) {
        await deleteNote(note.id);
        navigate("/notes");
      } else {
        setDeleteConfirm(true);
        setTimeout(() => setDeleteConfirm(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse text-purple-600 dark:text-purple-400">
            Loading note...
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 mt-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Note not found
          </h2>
          <button
            onClick={() => navigate("/notes")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 transition-colors duration-300 mt-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Notes
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400 mb-4">
            {note.title || "Untitled"}
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex gap-4">
            <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
            <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
          </div>
          <div
            className="prose prose-purple dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>

        <div className="flex gap-2 float-right mt-4">
          <button
            onClick={() => navigate(`/editor/${note.id}`)}
            className="px-4 py-2 bg-transparent rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <Edit3 size={16} className="text-purple-600" />
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 ${
              deleteConfirm && "bg-red-600 hover:bg-red-700"
            } text-gray-300 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2`}
          >
            <Trash2
              size={16}
              className={deleteConfirm ? "text-gray-300" : "text-red-600"}
            />
            {deleteConfirm && "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
