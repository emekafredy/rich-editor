import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { Modal } from "../Modal";
import { Select, Input } from "../Forms";
import { VideoEmbedModalType } from "../../types/editor";

export const VideoEmbedModal: FC<VideoEmbedModalType> = ({
  videoEmbedModalOpen,
  setVideoEmbedModalOpen,
  videoUrl,
  setVideoUrl,
  handleEmbedVideo,
  videoProviders,
  selectedProvider,
  setSelectedProvider,
  errors,
  setErrors,
}) => {
  return (
    <>
      {videoEmbedModalOpen && (
        <Modal
          showModal={videoEmbedModalOpen}
          setShowModal={setVideoEmbedModalOpen}
          disabled={videoUrl.trim() === ""}
          handleEmbed={handleEmbedVideo}
        >
          <p className="font-bold text-md"> Embed </p>

          <Select
            formLabel="Video Provider"
            optionsData={videoProviders}
            selected={selectedProvider}
            setSelected={setSelectedProvider}
          />

          <Input
            formLabel="URL"
            inputType="text"
            value={videoUrl}
            setValue={setVideoUrl}
            formTitle={selectedProvider.toLowerCase()}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
    </>
  );
};
