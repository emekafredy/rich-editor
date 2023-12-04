import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { Modal } from "../Modal";
import { Select, Input, Button } from "../Forms";
import { VideoEmbedType } from "../../types/editor";

export const VideoEmbed: FC<VideoEmbedType> = ({
  videoEmbedModalOpen,
  setVideoEmbedModalOpen,
  videoUrl,
  setVideoUrl,
  handleEmbedVideo,
  videoProviders,
  selectedProvider,
  setSelectedProvider,
}) => {
  return (
    <>
      {videoEmbedModalOpen && (
        <Modal
          showModal={videoEmbedModalOpen}
          setShowModal={setVideoEmbedModalOpen}
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
          />

          <div>
            <Button
              content="Embed"
              size="small"
              btnClass="primary"
              handleClick={() => handleEmbedVideo()}
              disabled={videoUrl.trim() === ""}
            />

            <Button
              content="Cancel"
              size="small"
              btnClass="secondary"
              handleClick={() => setVideoEmbedModalOpen(false)}
              bordered
              disabled={false}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
