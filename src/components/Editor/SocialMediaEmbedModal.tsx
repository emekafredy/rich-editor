import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { Modal } from "../Modal";
import { Select, Input } from "../Forms";
import { SocialMediaEmbedModalType } from "../../types/editor";

export const SocialMediaEmbedModal: FC<SocialMediaEmbedModalType> = ({
  socialMediaEmbedModalOpen,
  setSocialMediaEmbedModalOpen,
  postUrl,
  setPostUrl,
  handleEmbedPost,
  socialMediaProviders,
  selectedProvider,
  setSelectedProvider,
  errors,
  setErrors,
}) => {
  return (
    <>
      {socialMediaEmbedModalOpen && (
        <Modal
          showModal={socialMediaEmbedModalOpen}
          setShowModal={setSocialMediaEmbedModalOpen}
          disabled={postUrl.trim() === ""}
          handleEmbed={handleEmbedPost}
        >
          <p className="font-bold text-md"> Embed </p>

          <Select
            formLabel="Social Media Platform"
            optionsData={socialMediaProviders}
            selected={selectedProvider}
            setSelected={setSelectedProvider}
          />

          <Input
            formLabel="URL"
            inputType="text"
            value={postUrl}
            setValue={setPostUrl}
            formTitle={selectedProvider.toLowerCase()}
            errors={errors}
            setErrors={setErrors}
          />
        </Modal>
      )}
    </>
  );
};
