import React from 'react';
import { Caption, StyledFigure } from './Markdown.style';

/**
 * Custom image component for Markdown content.
 * Includes a caption generated with the image's title.
 * If the image isn't intended to have a caption, the title
 * is set as 'none' in the CMS.
 */

const MarkdownImage: React.FC<{
  src: string;
  title: string;
  alt: string;
}> = ({ src, title, alt }) => {
  const showTitle = title !== 'none';

  return (
    <StyledFigure>
      <img src={src} alt={alt} />
      {showTitle && <Caption>{title}</Caption>}
    </StyledFigure>
  );
};

export default MarkdownImage;
