import { useState } from "react";
import { Quill } from "react-quill";

export const useImageEmbed = (quillRef: any) => {
  const [imageUploadModalOpen, setImageUploadModalOpen] =
    useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | undefined>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setImageFile(fileList[0] as any);
  };

  const handleEmbedImage = async () => {
    const editor = (quillRef.current as any).getEditor();

    const file = imageFile && imageFile;
    if ((file as File).size > 1500000) return null;
    const range = editor.getSelection(true);

    if (/^image\//.test((file as File).type)) {
      editor.insertText(range.index, "\n");
      const Image = Quill.import("formats/image");
      const url = URL.createObjectURL(file as File);
      Image.sanitize = (url) => url;

      editor.insertEmbed(range.index + 1, "image", url);
      editor.insertText(range.index + 3, "\n");
      setImageUploadModalOpen(false);
    } else {
      console.log("error happened");
    }
  };

  return {
    imageUploadModalOpen,
    setImageUploadModalOpen,
    imageFile,
    setImageFile,
    onFileChange,
    handleEmbedImage,
  };
};
