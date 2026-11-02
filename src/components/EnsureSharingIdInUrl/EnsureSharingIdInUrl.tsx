import { useLocation, useHistory } from 'react-router-dom';
import { ensureSharingIdInQueryParams } from 'common/urls';

/**
 * Component that adds a short unique string to the URL, corresponding to the
 * currently published sharing preview images. This is important to make sure
 * that the URL is unique enough so that if somebody shares it, then
 * Facebook/Twitter/whoever will re-fetch it and get the latest sharing image.
 */
export default function EnsureSharingIdInUrl() {
  const location = useLocation();
  const history = useHistory();
  const params: { [key: string]: string } = {};
  new URLSearchParams(location.search).forEach((value, key) => {
    params[key] = value;
  });
  if (ensureSharingIdInQueryParams(params)) {
    history.replace({
      ...location,
      search: new URLSearchParams(params).toString(),
    });
  }

  return null;
}
