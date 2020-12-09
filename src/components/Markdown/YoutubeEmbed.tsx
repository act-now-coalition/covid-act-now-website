import React from 'react';
import { ParentSize } from '@vx/responsive';

export function isYouTubeEmbed(embedUrl: string) {
  return embedUrl.startsWith('https://www.youtube.com/embed/');
}

const maxWidth = 560;
const maxHeight = 315;

const YouTubeEmbed: React.FC<{ embedUrl: string }> = ({ embedUrl }) => {
  return (
    <div style={{ width: '100%' }}>
      <ParentSize>
        {({ width }) => {
          // Make sure that the embed keeps the original aspect ratio without
          // being wider than the container.
          const scaledWidth = Math.min(width, maxWidth);
          const scaledHeight = (maxHeight / maxWidth) * scaledWidth;
          // TODO(pablo): We need to add a meaningful title to the embeds
          return (
            <iframe
              title="YouTube embed"
              width={scaledWidth}
              height={scaledHeight}
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          );
        }}
      </ParentSize>
    </div>
  );
};

export default YouTubeEmbed;
