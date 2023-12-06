import { useState } from "react";
import { formatVimeoVideoUrl, formatYouTubeVideoUrl } from "../utils";
import { validateInputUrl } from "../validations";

export const useVideoEmbed = (quillRef: any) => {
  const [videoProviders] = useState<string[]>(["Youtube", "Vimeo"]);
  const [selectedProvider, setSelectedProvider] = useState<string>("Youtube");
  const [videoEmbedModalOpen, setVideoEmbedModalOpen] =
    useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [errors, setErrors] = useState({});

  const handleEmbedVideo = () => {
    const newErrors = {};
    const valid = validateInputUrl(
      videoUrl,
      selectedProvider.toLowerCase(),
      newErrors
    );

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

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
      editor.insertText(range.index + 3, "\n");
      setVideoEmbedModalOpen(false);
      setVideoUrl("");
    }
  };

  return {
    videoProviders,
    selectedProvider,
    setSelectedProvider,
    videoEmbedModalOpen,
    setVideoEmbedModalOpen,
    videoUrl,
    setVideoUrl,
    handleEmbedVideo,
    errors,
    setErrors,
  };
};
