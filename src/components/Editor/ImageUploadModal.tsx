import { X } from "lucide-react";
import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { ImageUploadModalType } from "../../types/editor";
import { Modal } from "../Modal";

export const ImageUploadModal: FC<ImageUploadModalType> = ({
  imageUploadModalOpen,
  setImageUploadModalOpen,
  file,
  onFileChange,
  handleEmbedImage,
}) => {
  return (
    <>
      {imageUploadModalOpen && (
        <Modal
          showModal={imageUploadModalOpen}
          setShowModal={setImageUploadModalOpen}
          disabled={!file}
          handleEmbed={handleEmbedImage}
        >
          <div className="flex items-center justify-between mt-2 mb-3">
            <p className="font-bold text-md"> Embed </p>
            <X onClick={() => setImageUploadModalOpen(false)} />
          </div>

          <p className="font-light text-sm mb-6"> Upload Image </p>

          <label className="block text-gray-200 text-xs font-light uppercase mb-2">
            file upload
          </label>
          <label className="mb-4 flex flex-col items-center justify-center py-12 border border-dashed border-primary rounded bg-white-200">
            <div className="flex flex-col items-center justify-center pt-7">
              <span className="bg-white-100 px-6 py-3 border border-primary rounded m-auto text-xs text-black-100 cursor-pointer hover:bg-green-100">
                {" "}
                Import image from Device{" "}
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="opacity-0"
                onChange={onFileChange}
              />
            </div>
            {file && (
              <div className="flex flex-wrap items-center justify-center gap-2 px-2">
                <span className="font-bold text-xs text-black-100">
                  Image Selected:
                </span>
                <span className="text-xs font-light text-black-100 opacity-90">
                  {file.name}
                </span>
              </div>
            )}
          </label>
        </Modal>
      )}
    </>
  );
};
