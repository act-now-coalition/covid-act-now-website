import { useLocation, useParams } from 'react-router-dom';

// TODO: Mv to enums?
const EMBED_WIDTH = 350;
const EMBED_HEIGHT = 395;

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const { stateId } = useParams();

  const isEmbed = pathname.includes('/embed');
  const hostPath = window.location.origin;

  const getPath = (countyFipsCode: string) =>
    // Either "/us/county/:countyId" or "/us/:stateId"
    `us/${countyFipsCode ? 'county/' + countyFipsCode : stateId || ''}`;

  const getIframePath = (countyFipsCode: string) =>
    `${hostPath}/embed/${getPath(countyFipsCode)}`;

  const getIframeCodeSnippet = (countyFipsCode: string) =>
    '<iframe ' +
    `src="${getIframePath(countyFipsCode)}" ` +
    'title="CoVid Act Now" ' +
    `width="${EMBED_WIDTH}" ` +
    `height="${EMBED_HEIGHT}" ` +
    'frameBorder="0" ' +
    'scrolling="no"' +
    '></iframe>';

  const getJsCodeSnippet = (countyFipsCode: string) => {
    return (
      '<div ' +
      'class="covid-act-now-embed" ' +
      (stateId ? `data-state-id="${stateId}" ` : '') +
      (countyFipsCode ? `data-fips-id="${countyFipsCode}" ` : '') +
      '/>' +
      `<script src="${hostPath}/scripts/embed.js"></script>`
    );
  };

  return {
    isEmbed,
    EMBED_WIDTH,
    EMBED_HEIGHT,
    getIframeCodeSnippet,
    getIframePath,
    getJsCodeSnippet,
  };
}
