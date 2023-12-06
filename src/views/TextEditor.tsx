import { useState } from "react";
import RichTextEditor from "../components/Editor";
import { Button } from "../components/Forms";

const QuillEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [richTextValue, setRichTextValue] = useState<string>("");

  return (
    <div className="container">
      <h1 className="text-[22] sm:text-[26px] font-bold uppercase mb-4">
        Create Post
      </h1>
      <div className="form-container">
        <div className="h-12 border-b border-b-gray-100" />

        <div className="px-4 pt-6">
          <input
            autoFocus
            type="text"
            value={title}
            className="text-[20] sm:text-[24px] font-bold focus:outline-none mb-4 bg-white-200"
            placeholder="Add post title"
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>
        <RichTextEditor value={richTextValue} onChange={setRichTextValue} />
      </div>

      <div className="text-right">
        <Button
          content="Post"
          size="small"
          btnClass="primary"
          handleClick={() => null}
          disabled={richTextValue.trim() === ""}
        />
      </div>
    </div>
  );
};

export default QuillEditor;
