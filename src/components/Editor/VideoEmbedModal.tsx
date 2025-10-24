import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { VideoEmbedModalType } from "../../types/editor";
import { Input, Select } from "../Forms";
import { Modal } from "../Modal";

export const VideoEmbedModal: FC<VideoEmbedModalType> = ({
  errors,
  videoUrl,
  setErrors,
  setVideoUrl,
  videoProviders,
  handleEmbedVideo,
  selectedProvider,
  setSelectedProvider,
  videoEmbedModalOpen,
  setVideoEmbedModalOpen,
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
