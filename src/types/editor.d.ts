export type RichTextEditorType = {
  value: string;
  onChange: (value: string) => void;
};

export type VideoEmbedType = {
  videoEmbedModalOpen: boolean;
  setVideoEmbedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleEmbedVideo: () => void;
  videoProviders: string[];
  selectedProvider: string;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string>>;
};
