import { useLocation, useParams } from 'react-router-dom';

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const { id, countyId } = useParams();
  const isEmbed = pathname.includes('/embed');
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  let path = `us/`;
  if (id) {
    path += id;
    if (countyId) {
      path += `/county/${countyId}`;
    }
  }
  const iFrameCodeSnippet =
    '<iframe ' +
    `src="${protocol}//${
      hostname === 'localhost' ? 'localhost:3000' : hostname
    }/embed/${path}" ` +
    'title="CoVid Act Now" ' +
    'width="350" ' +
    'height="700" ' +
    'frameBorder="0" ' +
    'scrolling="no"' +
    '></iframe>';

  return { isEmbed, iFrameCodeSnippet };
}
