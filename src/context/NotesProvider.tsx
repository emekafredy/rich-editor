import { createContext, useContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/context";
import { Note, NotesContextProps } from "../types/note";

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (): Promise<void> => {
    try {
      setLoading(true);
      const savedNotes = localStorage.getItem("rich-text-notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotesToStorage = (updatedNotes: Note[]): void => {
    localStorage.setItem("rich-text-notes", JSON.stringify(updatedNotes));
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const saveNote = async (noteData: Partial<Note>): Promise<Note> => {
    try {
      const now = new Date().toISOString();

      if (noteData.id) {
        const updatedNotes = notes.map((note) =>
          note.id === noteData.id
            ? {
                ...note,
                ...noteData,
                updatedAt: now,
              }
            : note
        );
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);

        const updatedNote = updatedNotes.find(
          (note) => note.id === noteData.id
        );
        if (!updatedNote) throw new Error("Note not found after update");
        return updatedNote;
      } else {
        const newNote: Note = {
          id: generateId(),
          title: noteData.title || "Untitled",
          content: noteData.content || "",
          createdAt: now,
          updatedAt: now,
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);
        return newNote;
      }
    } catch (error) {
      console.error("Error saving note:", error);
      throw error;
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const getNote = async (id: string): Promise<Note | null> => {
    let savedNotes = notes;

    if (savedNotes.length === 0) {
      const fromStorage = localStorage.getItem("rich-text-notes") as string;
      savedNotes = JSON.parse(fromStorage);
    }

    try {
      const note = savedNotes.find((note) => note.id === id);
      return note || null;
    } catch (error) {
      console.error("Error getting note:", error);
      return null;
    }
  };

  const value: NotesContextProps = {
    notes,
    loading,
    saveNote,
    deleteNote,
    getNote,
    loadNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
