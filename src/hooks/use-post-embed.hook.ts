import { useState } from "react";
import { Quill } from "react-quill";
import FacebookBlot, {
  embedFacebookLink,
} from "../components/Editor/Blots/FacebookBlot";
import TwitterBlot, {
  embedTwitterLink,
} from "../components/Editor/Blots/TwitterBlot";
import InstagramBlot, {
  embedInstagramLink,
} from "../components/Editor/Blots/InstagramBlot";
import TikTokBlot, {
  embedTikTokLink,
} from "../components/Editor/Blots/TiktokBlot";
import { validateInputUrl } from "../validations";

Quill.register(FacebookBlot, true);
Quill.register(TwitterBlot, true);
Quill.register(InstagramBlot, true);
Quill.register(TikTokBlot, true);

export const usePostEmbed = (quillRef: any) => {
  const [socialMediaProviders] = useState<string[]>([
    "Facebook",
    "Twitter",
    "Instagram",
    "Tiktok",
  ]);
  const [selectedPostProvider, setSelectedPostProvider] =
    useState<string>("Facebook");
  const [socialMediaEmbedModalOpen, setSocialMediaEmbedModalOpen] =
    useState<boolean>(false);
  const [postUrl, setPostUrl] = useState<string>("");
  const [errors, setErrors] = useState({});

  const handleEmbedPost = () => {
    const newErrors = {};
    const valid = validateInputUrl(
      postUrl,
      selectedPostProvider.toLowerCase(),
      newErrors
    );

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    switch (selectedPostProvider) {
      case "Facebook":
        embedFacebookLink(quillRef, postUrl);
        break;
      case "Twitter":
        embedTwitterLink(quillRef, postUrl);
        break;
      case "Instagram":
        embedInstagramLink(quillRef, postUrl);
        break;
      case "Tiktok":
        embedTikTokLink(quillRef, postUrl);
        break;
    }

    setSocialMediaEmbedModalOpen(false);
  };

  return {
    socialMediaProviders,
    selectedPostProvider,
    setSelectedPostProvider,
    socialMediaEmbedModalOpen,
    setSocialMediaEmbedModalOpen,
    postUrl,
    setPostUrl,
    handleEmbedPost,
    errors,
    setErrors,
  };
};
