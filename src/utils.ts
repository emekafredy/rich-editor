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
