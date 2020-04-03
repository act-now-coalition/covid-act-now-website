import { useLocation } from 'react-router-dom';

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const isEmbed = pathname.includes('/embed');
  const iFrameCodeSnippet =
    '<iframe ' +
    `src="${window.location.href}" ` +
    'title="CoVid Act Now" ' +
    'width="350" ' +
    'height="700" ' +
    'frameBorder="0" ' +
    '></iframe>';

  return { isEmbed, iFrameCodeSnippet };
}
