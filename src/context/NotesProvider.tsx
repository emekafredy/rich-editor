import { createContext, useContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/context";
import { Note, NotesContextProps } from "../types/note";

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (): Promise<void> => {
    try {
      const result = await window.storage.list("note:");
      if (result && result.keys) {
        const loadedNotes = await Promise.all(
          result.keys.map(async (key: string) => {
            try {
              const data = await window.storage.get(key);
              return data ? (JSON.parse(data.value) as Note) : null;
            } catch (e) {
              return null;
            }
          })
        );
        setNotes(
          loadedNotes
            .filter((note): note is Note => note !== null)
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
        );
      }
    } catch (error) {
      console.log("Loading notes for first time");
      setNotes([]);
    }
    setLoading(false);
  };

  const saveNote = async (note: Partial<Note>): Promise<Note> => {
    try {
      const noteToSave: Note = {
        id: note.id || `note_${Date.now()}`,
        title: note.title || "Untitled",
        content: note.content || "",
        updatedAt: new Date().toISOString(),
        createdAt: note.createdAt || new Date().toISOString(),
      };

      await window.storage.set(
        `note:${noteToSave.id}`,
        JSON.stringify(noteToSave)
      );
      await loadNotes();
      return noteToSave;
    } catch (error) {
      console.error("Error saving note:", error);
      throw error;
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    try {
      await window.storage.delete(`note:${id}`);
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const getNote = async (id: string): Promise<Note | null> => {
    try {
      const result = await window.storage.get(`note:${id}`);
      return result ? (JSON.parse(result.value) as Note) : null;
    } catch (error) {
      console.error("Error getting note:", error);
      return null;
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, loading, saveNote, deleteNote, getNote, loadNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextProps => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
