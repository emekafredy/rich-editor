export type RichTextEditorType = {
  value: string;
  onChange: (value: string) => void;
};

export type VideoEmbedModalType = {
  videoEmbedModalOpen: boolean;
  setVideoEmbedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleEmbedVideo: () => void;
  videoProviders: string[];
  selectedProvider: string;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
};

export type ImageUploadModalType = {
  imageUploadModalOpen: boolean;
  setImageUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | undefined;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmbedImage: () => void;
};

export type EmbedOptionsMenuType = {
  showEmbedMenu: boolean;
  setShowEmbedMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoEmbedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSocialMediaEmbedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SocialMediaEmbedModalType = {
  socialMediaEmbedModalOpen: boolean;
  setSocialMediaEmbedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postUrl: string;
  setPostUrl: React.Dispatch<React.SetStateAction<string>>;
  handleEmbedPost: () => void;
  socialMediaProviders: string[];
  selectedProvider: string;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
};
