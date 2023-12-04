import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatVimeoVideoUrl, formatYouTubeVideoUrl } from "../../utils";
import { RichTextEditorType } from "../../types/editor";
import { VideoEmbed } from "./VideoEmbed";

const RichTextEditor: React.FC<RichTextEditorType> = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const [videoProviders] = useState<string[]>(["Youtube", "Vimeo"]);
  const [selectedProvider, setSelectedProvider] = useState<string>("Youtube");

  const [toolbarOptions] = useState([
    [{ header: [1, 2, 3, 4, false] }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["bold", "italic"],
    [{ list: "bullet" }, { list: "ordered" }],
    [{ indent: "-1" }, { indent: "+1" }],
  ]);
  const [videoEmbedModalOpen, setVideoEmbedModalOpen] =
    useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleEmbedVideo = () => {
    const editor = (quillRef.current as any).getEditor();
    const range = editor.getSelection(true);
    let url;
    if (selectedProvider === "Youtube") {
      url = formatYouTubeVideoUrl(videoUrl);
    } else {
      url = formatVimeoVideoUrl(videoUrl);
    }

    if (quillRef && range) {
      editor.insertText(range.index, "\n");
      editor.insertEmbed(range.index + 1, "video", url);
      editor.setSelection(range.index + 2, 0, "silent");
      setVideoEmbedModalOpen(false);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          video: () => setVideoEmbedModalOpen(!videoEmbedModalOpen),
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "link",
    "image",
    "video",
    "align",
    "bold",
    "italic",
    "list",
    "bullet",
    "indent",
  ];

  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={(_content, _delta, _source, editor) =>
          onChange(editor.getHTML())
        }
        modules={modules}
        formats={formats}
        placeholder={"Add content"}
      />

      <VideoEmbed
        videoEmbedModalOpen={videoEmbedModalOpen}
        setVideoEmbedModalOpen={setVideoEmbedModalOpen}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        handleEmbedVideo={handleEmbedVideo}
        videoProviders={videoProviders}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
      />
    </>
  );
};

export default RichTextEditor;
