import { useLocation, useParams } from 'react-router-dom';

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEmbed = pathname.includes('/embed');
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const iFrameCodeSnippet =
    '<iframe ' +
    `src="${protocol}//${
      hostname === 'localhost' ? 'localhost:3000' : hostname
    }/embed/us/${id || ''}" ` +
    'title="CoVid Act Now" ' +
    'width="350" ' +
    'height="700" ' +
    'frameBorder="0" ' +
    '></iframe>';

  return { isEmbed, iFrameCodeSnippet };
}
