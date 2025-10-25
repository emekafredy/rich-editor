import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RichTextEditor from "../../components/Editor";
import { Button } from "../../components/Forms";
import { useNotes } from "../../context/NotesProvider";

import "./TextEditor.css";

export const QuillEditor = () => {
  const navigate = useNavigate();
  const { saveNote, getNote } = useNotes();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [richTextValue, setRichTextValue] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadNoteForEditing();
    }
  }, [id]);

  const loadNoteForEditing = async (): Promise<void> => {
    try {
      setLoading(true);
      const note = await getNote(id!);
      if (note) {
        setTitle(note.title);
        setRichTextValue(note.content);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error loading note for editing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (): Promise<void> => {
    if (richTextValue.trim() === "") return;

    try {
      setLoading(true);
      const noteData = {
        id: isEditing ? id : undefined,
        title: title.trim() || "Untitled",
        content: richTextValue,
      };

      const savedNote = await saveNote(noteData);

      navigate(`/note/${savedNote.id}`);
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 mt-8 mb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse text-purple-600 dark:text-purple-400">
            Loading note...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-24 px-6 transition-colors duration-300 mt-8 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
            {isEditing ? "Edit Note" : "New Note"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isEditing
              ? "Update your note content"
              : "Write your thoughts and embed rich content"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="px-6 pt-6 pb-4">
            <input
              type="text"
              value={title}
              autoFocus={!isEditing}
              onChange={handleTitleChange}
              placeholder="Add note title..."
              className="w-full text-2xl sm:text-3xl font-bold bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>

          <div className="editor-container">
            <RichTextEditor value={richTextValue} onChange={setRichTextValue} />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button
            size="medium"
            content="Cancel"
            btnClass="transparent"
            handleClick={() => navigate(-1)}
          />

          <Button
            size="medium"
            btnClass="purple"
            content={
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {isEditing ? "Update Note" : "Save Note"}
              </div>
            }
            handleClick={handleSaveNote}
            disabled={richTextValue.trim() === "" || loading}
          />
        </div>
      </div>
    </div>
  );
};
