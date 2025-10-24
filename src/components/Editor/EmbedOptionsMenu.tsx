import { Plus, X } from "lucide-react";
import { FC } from "react";
import "react-quill/dist/quill.snow.css";

import { ImagePlus, Link2, Video } from "lucide-react";
import { EmbedOptionsMenuType } from "../../types/editor";

const embedOptions = [
  {
    title: "Picture",
    footNote: "jpeg, png",
  },
  {
    title: "Video",
    footNote: "Embed a youtube or vimeo video links",
  },
  {
    title: "Social Media link",
    footNote: "Embed Instagram, Twitter, Tiktok, Facebook links",
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
      case "Social Media link":
        setSocialMediaEmbedModalOpen(true);
        setShowEmbedMenu(false);
        break;
    }
  };

  const optionsIcon = (title: string) => {
    switch (title) {
      case "Picture":
        return <ImagePlus />;
      case "Video":
        return <Video />;
      case "Social Media link":
        return <Link2 />;
    }
  };

  return (
    <>
      {showEmbedMenu && (
        <div className="bg-white-100 absolute bottom-[60px] left-[40px] shadow-md rounded w-[300px] py-4">
          <p className="font-light text-xs uppercase mb-4 px-4"> Embeds </p>

          {embedOptions.map((opt) => {
            return (
              <div
                key={opt.title}
                className="px-4 py-3 flex items-start justify-start gap-4 hover:bg-green-100 cursor-pointer"
                onClick={() => openEmbedModal(opt.title)}
              >
                {optionsIcon(opt.title)}
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
        className="absolute z-[1000] bg-purple-600 p-3 rounded-full bottom-[10px] left-[20px] text-purple-100 transition-all duration-300"
        onClick={() => setShowEmbedMenu(!showEmbedMenu)}
      >
        {showEmbedMenu ? <X /> : <Plus />}
      </button>
    </>
  );
};
