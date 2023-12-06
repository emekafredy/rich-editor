import { SupportedProvidersType } from "./types/form";

export const formatYouTubeVideoUrl = (videoUrl: string): string => {
  const youtubeURLRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?.*v=|embed\/|v\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = videoUrl.match(youtubeURLRegex);

  if (match) {
    const videoId = match[5];
    const formattedUrl = `https://www.youtube.com/embed/${videoId}`;
    return formattedUrl;
  } else {
    return videoUrl;
  }
};

export const formatVimeoVideoUrl = (videoUrl: string): string => {
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com\/)(\d+)/;
  const match = videoUrl.match(vimeoRegex);

  if (match) {
    const videoId = match[4];
    const formattedUrl = `https://player.vimeo.com/video/${videoId}`;
    return formattedUrl;
  } else {
    return videoUrl;
  }
};

export const validateUrl = (
  url: string,
  provider: SupportedProvidersType
): boolean => {
  const providerRegexMap: Record<SupportedProvidersType, RegExp> = {
    youtube: /youtube\.com/,
    vimeo: /vimeo\.com/,
    twitter: /twitter\.com/,
    facebook: /facebook\.com/,
    instagram: /instagram\.com/,
    tiktok: /tiktok\.com/,
  };

  const providerRegex = providerRegexMap[provider];
  return providerRegex.test(url);
};

export const getWordsCount = (text: string): number => {
  text = text.trim();
  const wordCount = text?.split(/\s+/).length;
  const spaceCount = (text.match(/\s/g) || []).length;

  return wordCount + spaceCount;
};
