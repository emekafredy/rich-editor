export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type NotesContextProps = {
  notes: Note[];
  loading: boolean;
  saveNote: (note: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  getNote: (id: string) => Promise<Note | null>;
  loadNotes: () => Promise<void>;
};
