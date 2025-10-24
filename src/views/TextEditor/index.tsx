import { Plus } from "lucide-react";
import { useState } from "react";

import RichTextEditor from "../../components/Editor";
import { Button } from "../../components/Forms";

import "./TextEditor.css";

export const QuillEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [richTextValue, setRichTextValue] = useState<string>("");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-24 px-6 transition-colors duration-300 mt-8 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
            New Note
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Write your thoughts and embed rich content
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="px-6 pt-6 pb-4">
            <input
              autoFocus
              type="text"
              value={title}
              placeholder="Add note title..."
              onChange={(e: any) => setTitle(e.target.value)}
              className="w-full text-2xl sm:text-3xl font-bold bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors duration-200"
            />
          </div>

          <div className="editor-container">
            <RichTextEditor value={richTextValue} onChange={setRichTextValue} />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            size="medium"
            btnClass="purple"
            content={
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Save Note
              </div>
            }
            handleClick={() => null}
            disabled={richTextValue.trim() === ""}
          />
        </div>
      </div>
    </div>
  );
};
