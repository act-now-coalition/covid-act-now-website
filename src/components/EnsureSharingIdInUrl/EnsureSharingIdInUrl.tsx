import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as QueryString from 'query-string';
import { ensureSharingIdInQueryParams } from 'common/urls';
import RenderContext, { RenderType } from 'contexts/RenderContext';

/**
 * Component that adds a short unique string to the URL, corresponding to the
 * currently published sharing preview images. This is important to make sure
 * that the URL is unique enough so that if somebody shares it, then
 * Facebook/Twitter/whoever will re-fetch it and get the latest sharing image.
 */
export default function EnsureSharingIdInUrl() {
  const renderContext = useContext(RenderContext);
  const history = useHistory();

  if (renderContext.type === RenderType.SSR) {
    return null;
  }

  const params = QueryString.parse(window.location.search);
  if (ensureSharingIdInQueryParams(params)) {
    history.replace({
      ...window.location,
      search: QueryString.stringify(params),
    });
  }

  return null;
}
