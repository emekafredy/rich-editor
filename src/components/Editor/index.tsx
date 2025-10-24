import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

// components
import Counter from "./Counter";
import { EmbedOptionsMenu } from "./EmbedOptionsMenu";
import { ImageUploadModal } from "./ImageUploadModal";
import { SocialMediaEmbedModal } from "./SocialMediaEmbedModal";
import { VideoEmbedModal } from "./VideoEmbedModal";

// hooks
import { useImageEmbed } from "../../hooks/use-image-embed.hook";
import { usePostEmbed } from "../../hooks/use-post-embed.hook";
import { useVideoEmbed } from "../../hooks/use-video-embed.hook";

// others
import "react-quill/dist/quill.snow.css";
import { formats, toolbarOptions } from "../../editor-tools";
import { RichTextEditorType } from "../../types/editor";

Quill.register("modules/counter", Counter);
const TEXT_LIMIT = 1000;

const RichTextEditor: React.FC<RichTextEditorType> = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const countRef = useRef(null);
  const [showEmbedMenu, setShowEmbedMenu] = useState<boolean>(false);

  const {
    errors,
    setErrors,
    videoUrl,
    setVideoUrl,
    videoProviders,
    handleEmbedVideo,
    selectedProvider,
    setSelectedProvider,
    videoEmbedModalOpen,
    setVideoEmbedModalOpen,
  } = useVideoEmbed(quillRef);

  const {
    imageFile,
    onFileChange,
    handleEmbedImage,
    imageUploadModalOpen,
    setImageUploadModalOpen,
  } = useImageEmbed(quillRef);

  const {
    postUrl,
    setPostUrl,
    handleEmbedPost,
    socialMediaProviders,
    selectedPostProvider,
    setSelectedPostProvider,
    socialMediaEmbedModalOpen,
    setSocialMediaEmbedModalOpen,
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
      <div
        className={`px-6 py-4 ${
          limitReached
            ? "border-2 border-red-300 dark:border-red-600 rounded-lg"
            : "border-0"
        }`}
      >
        <ReactQuill
          value={value}
          ref={quillRef}
          modules={modules}
          formats={formats}
          className="rich-text-editor"
          onKeyDown={checkCharacterCount}
          placeholder={"Start writing your content... ✨"}
          onChange={(_content, _delta, _source, editor) =>
            onChange(editor.getHTML())
          }
        />

        {limitReached && (
          <div className="flex items-center gap-2 mt-2 text-red-100 dark:text-red-300 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Content limit reached
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-sm text-right">
          <span
            ref={countRef}
            id="counter"
            className={`font-medium ${
              limitReached
                ? "text-red-100 dark:text-red-300"
                : "text-gray-900 dark:text-white"
            }`}
          >
            0
          </span>
          /{TEXT_LIMIT} words
        </p>
      </div>

      <EmbedOptionsMenu
        showEmbedMenu={showEmbedMenu}
        setShowEmbedMenu={setShowEmbedMenu}
        setVideoEmbedModalOpen={setVideoEmbedModalOpen}
        setImageUploadModalOpen={setImageUploadModalOpen}
        setSocialMediaEmbedModalOpen={setSocialMediaEmbedModalOpen}
      />

      <VideoEmbedModal
        errors={errors}
        videoUrl={videoUrl}
        setErrors={setErrors}
        setVideoUrl={setVideoUrl}
        videoProviders={videoProviders}
        handleEmbedVideo={handleEmbedVideo}
        selectedProvider={selectedProvider}
        videoEmbedModalOpen={videoEmbedModalOpen}
        setSelectedProvider={setSelectedProvider}
        setVideoEmbedModalOpen={setVideoEmbedModalOpen}
      />

      <ImageUploadModal
        file={imageFile}
        onFileChange={onFileChange}
        handleEmbedImage={handleEmbedImage}
        imageUploadModalOpen={imageUploadModalOpen}
        setImageUploadModalOpen={setImageUploadModalOpen}
      />

      <SocialMediaEmbedModal
        postUrl={postUrl}
        errors={postErrors}
        setPostUrl={setPostUrl}
        setErrors={setPostErrors}
        handleEmbedPost={handleEmbedPost}
        selectedProvider={selectedPostProvider}
        socialMediaProviders={socialMediaProviders}
        setSelectedProvider={setSelectedPostProvider}
        socialMediaEmbedModalOpen={socialMediaEmbedModalOpen}
        setSocialMediaEmbedModalOpen={setSocialMediaEmbedModalOpen}
      />
    </div>
  );
};

export default RichTextEditor;
