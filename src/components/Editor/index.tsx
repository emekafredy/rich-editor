import React, { useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";

// components
import { VideoEmbedModal } from "./VideoEmbedModal";
import { ImageUploadModal } from "./ImageUploadModal";
import { EmbedOptionsMenu } from "./EmbedOptionsMenu";
import { SocialMediaEmbedModal } from "./SocialMediaEmbedModal";
import Counter from "./Counter";

// hooks
import { useVideoEmbed } from "../../hooks/use-video-embed.hook";
import { useImageEmbed } from "../../hooks/use-image-embed.hook";
import { usePostEmbed } from "../../hooks/use-post-embed.hook";

// others
import { RichTextEditorType } from "../../types/editor";
import { toolbarOptions, formats } from "../../editor-tools";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/counter", Counter);
const TEXT_LIMIT = 1000;

const RichTextEditor: React.FC<RichTextEditorType> = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const countRef = useRef(null);
  const [showEmbedMenu, setShowEmbedMenu] = useState<boolean>(false);

  const {
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
  } = useVideoEmbed(quillRef);

  const {
    imageUploadModalOpen,
    setImageUploadModalOpen,
    imageFile,
    onFileChange,
    handleEmbedImage,
  } = useImageEmbed(quillRef);

  const {
    socialMediaProviders,
    selectedPostProvider,
    setSelectedPostProvider,
    socialMediaEmbedModalOpen,
    setSocialMediaEmbedModalOpen,
    postUrl,
    setPostUrl,
    handleEmbedPost,
    errors: postErrors,
    setErrors: setPostErrors,
  } = usePostEmbed(quillRef);

  const modules = useMemo(
    () => ({
      counter: {
        container: "#counter",
        unit: "word",
      },
      toolbar: {
        container: toolbarOptions,
        handlers: {
          video: () => setVideoEmbedModalOpen(!videoEmbedModalOpen),
          image: () => setImageUploadModalOpen(!imageUploadModalOpen),
        },
      },
    }),
    []
  );

  const limitReached =
    countRef.current &&
    Number((countRef.current as any)?.innerHTML) >= TEXT_LIMIT;
  const checkCharacterCount = (event) => {
    if (limitReached && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div className={`px-4 ${limitReached ? "border border-red-100" : ""}`}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={(_content, _delta, _source, editor) =>
            onChange(editor.getHTML())
          }
          modules={modules}
          formats={formats}
          placeholder={"Add Content..."}
          onKeyDown={checkCharacterCount}
        />

        {limitReached && (
          <span className="text-red-100 text-xs">Content limit reached</span>
        )}
      </div>

      <div className="bg-white-100 p-2 mt-4">
        <p className="text-black-100 text-[13px] text-right">
          <span ref={countRef} id="counter">
            0
          </span>
          /{TEXT_LIMIT} words
        </p>
      </div>

      <EmbedOptionsMenu
        showEmbedMenu={showEmbedMenu}
        setShowEmbedMenu={setShowEmbedMenu}
        setImageUploadModalOpen={setImageUploadModalOpen}
        setVideoEmbedModalOpen={setVideoEmbedModalOpen}
        setSocialMediaEmbedModalOpen={setSocialMediaEmbedModalOpen}
      />

      <VideoEmbedModal
        videoEmbedModalOpen={videoEmbedModalOpen}
        setVideoEmbedModalOpen={setVideoEmbedModalOpen}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        handleEmbedVideo={handleEmbedVideo}
        videoProviders={videoProviders}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        errors={errors}
        setErrors={setErrors}
      />

      <ImageUploadModal
        imageUploadModalOpen={imageUploadModalOpen}
        setImageUploadModalOpen={setImageUploadModalOpen}
        file={imageFile}
        onFileChange={onFileChange}
        handleEmbedImage={handleEmbedImage}
      />

      <SocialMediaEmbedModal
        socialMediaEmbedModalOpen={socialMediaEmbedModalOpen}
        setSocialMediaEmbedModalOpen={setSocialMediaEmbedModalOpen}
        postUrl={postUrl}
        setPostUrl={setPostUrl}
        handleEmbedPost={handleEmbedPost}
        socialMediaProviders={socialMediaProviders}
        selectedProvider={selectedPostProvider}
        setSelectedProvider={setSelectedPostProvider}
        errors={postErrors}
        setErrors={setPostErrors}
      />
    </div>
  );
};

export default RichTextEditor;
