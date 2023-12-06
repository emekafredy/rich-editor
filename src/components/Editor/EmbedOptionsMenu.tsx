import { FC } from "react";
import "react-quill/dist/quill.snow.css";
import { EmbedOptionsMenuType } from "../../types/editor";
import AddIcon from "../../assets/icons/icon-add.svg";
import ImageIcon from "../../assets/icons/icon-picture.svg";

const embedOptions = [
  {
    title: "Picture",
    footNote: "jpeg, png",
  },
  {
    title: "Video",
    footNote: "Embed a youtube or vimeo video",
  },
  {
    title: "Social",
    footNote: "Embed Instagram, Twitter, Ticktok, Facebook",
  },
];

export const EmbedOptionsMenu: FC<EmbedOptionsMenuType> = ({
  showEmbedMenu,
  setShowEmbedMenu,
  setImageUploadModalOpen,
  setVideoEmbedModalOpen,
  setSocialMediaEmbedModalOpen,
}) => {
  const openEmbedModal = (title: string) => {
    switch (title) {
      case "Picture":
        setImageUploadModalOpen(true);
        setShowEmbedMenu(false);
        break;
      case "Video":
        setVideoEmbedModalOpen(true);
        setShowEmbedMenu(false);
        break;
      case "Social":
        setSocialMediaEmbedModalOpen(true);
        setShowEmbedMenu(false);
        break;
    }
  };

  return (
    <>
      {showEmbedMenu && (
        <div className="bg-white-100 absolute bottom-[40px] left-[35px] shadow-md rounded w-[300px] py-4">
          <p className="font-light text-xs uppercase mb-4 px-4"> Embeds </p>

          {embedOptions.map((opt) => {
            return (
              <div
                key={opt.title}
                className="px-4 py-3 flex items-start justify-start gap-4 hover:bg-green-100 cursor-pointer"
                onClick={() => openEmbedModal(opt.title)}
              >
                <img src={ImageIcon} className="w-6" alt="embed-photo" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-black-100">
                    {opt.title}
                  </span>
                  <span className="text-[8px] text-black-100">
                    {opt.footNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        className={`absolute z-[1000] bg-gray-100 p-3 rounded-full bottom-[10px] left-[20px]`}
        onClick={() => setShowEmbedMenu(!showEmbedMenu)}
      >
        <img src={AddIcon} className="bg-gray-100 rounded-full " alt="" />
      </button>
    </>
  );
};
