import { Region } from 'common/regions';
import { useLocation, useParams } from 'react-router-dom';
import {
  EMBED_HEIGHT,
  EMBED_WIDTH,
  US_MAP_EMBED_HEIGHT,
  US_MAP_EMBED_WIDTH,
} from 'screens/Embed/EmbedEnums';

export function useEmbed(region?: Region) {
  // Check if we're embedded in an iFrame
  const { stateId } = useParams();

  const hostPath = window.location.origin;

  const getEmbedHeight = () => (region ? EMBED_HEIGHT : US_MAP_EMBED_HEIGHT);

  const getEmbedWidth = () => (region ? EMBED_WIDTH : US_MAP_EMBED_WIDTH);

  const getPath = () => (region ? `us/fips/${region.fipsCode}` : 'us/');

  const getIframePath = () => `${hostPath}/embed/${getPath()}`;

  const getIframeCodeSnippet = () =>
    '<iframe ' +
    `src="${getIframePath()}" ` +
    'title="CoVid Act Now" ' +
    `width="${getEmbedWidth()}" ` +
    `height="${getEmbedHeight()}" ` +
    'frameBorder="0" ' +
    'scrolling="no"' +
    '></iframe>';

  const getJsCodeSnippet = () => {
    return (
      '<div ' +
      'class="covid-act-now-embed" ' +
      (stateId ? `data-state-id="${stateId}" ` : '') +
      (region ? `data-fips-id="${region.fipsCode}" ` : '') +
      '/>' +
      `<script src="${hostPath}/scripts/embed.js"></script>`
    );
  };

  return {
    EMBED_WIDTH,
    EMBED_HEIGHT,
    getEmbedWidth,
    getEmbedHeight,
    getIframeCodeSnippet,
    getIframePath,
    getJsCodeSnippet,
  };
}

export const useIsEmbed = () => {
  const { pathname } = useLocation();
  return pathname.includes('/embed');
};
