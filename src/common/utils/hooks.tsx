import { useLocation, useParams } from 'react-router-dom';
import {
  EMBED_HEIGHT,
  EMBED_WIDTH,
  US_MAP_EMBED_HEIGHT,
  US_MAP_EMBED_WIDTH,
} from 'screens/Embed/EmbedEnums';

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const { stateId } = useParams();

  const isEmbed = pathname.includes('/embed');
  const hostPath = window.location.origin;

  const getEmbedHeight = (countyFipsCode: string | null) =>
    !stateId && !countyFipsCode ? US_MAP_EMBED_HEIGHT : EMBED_HEIGHT;

  const getEmbedWidth = (countyFipsCode: string | null) =>
    !stateId && !countyFipsCode ? US_MAP_EMBED_WIDTH : EMBED_WIDTH;

  const getPath = (countyFipsCode: string) =>
    // Either "/us/county/:countyId" or "/us/:stateId"
    `us/${countyFipsCode ? 'county/' + countyFipsCode : stateId || ''}`;

  const getIframePath = (countyFipsCode: string) =>
    `${hostPath}/embed/${getPath(countyFipsCode)}`;

  const getIframeCodeSnippet = (countyFipsCode: string) =>
    '<iframe ' +
    `src="${getIframePath(countyFipsCode)}" ` +
    'title="CoVid Act Now" ' +
    `width="${getEmbedWidth(countyFipsCode)}" ` +
    `height="${getEmbedHeight(countyFipsCode)}" ` +
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
    getEmbedWidth,
    getEmbedHeight,
    getIframeCodeSnippet,
    getIframePath,
    getJsCodeSnippet,
  };
}
