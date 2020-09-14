import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as QueryString from 'query-string';

/**
 * Component that detects the presence of a ?redirectTo=... query param and
 * implements the desired redirect.  Used as part of our meta tag / share images
 * strategy.
 */
export default function HandleRedirectTo() {
  const location = useLocation();
  const history = useHistory();
  const params = QueryString.parse(location.search);
  const redirectTo = params['redirectTo'] as string;
  if (redirectTo) {
    history.replace(redirectTo);
  }

  return null;
}
