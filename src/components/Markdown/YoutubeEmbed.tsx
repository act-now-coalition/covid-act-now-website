import React from 'react';

export function isYouTubeEmbed(embedUrl: string) {
  return embedUrl.startsWith('https://www.youtube.com/embed/');
}

const YouTubeEmbed: React.FC<{ embedUrl: string }> = ({ embedUrl }) => {
  return (
    <iframe
      title="YouTube embed"
      width={560}
      height={315}
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
    />
  );
};

export default YouTubeEmbed;
