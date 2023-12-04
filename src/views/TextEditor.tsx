import { useState } from "react";
import RichTextEditor from "../components/Editor/RichTextEditor";

const QuillEditor = () => {
  const [richTextValue, setRichTextValue] = useState<string>("");

  return (
    <div className="container">
      <div className="form-container">
        <div className="h-12 border-b border-b-gray-100" />

        <div className="px-4 py-6">
          <h2 className="mb-4 font-bold text-2xl"> Post title </h2>
          <RichTextEditor value={richTextValue} onChange={setRichTextValue} />
        </div>

        <div className="bg-white-100 p-2 mt-4">
          <p className="text-black-100 text-[13px] text-right">1/100 words</p>
        </div>
      </div>

      <div className="text-right">
        <button className="btn" type="button" onClick={() => null}>
          Post
        </button>
      </div>
    </div>
  );
};

export default QuillEditor;
