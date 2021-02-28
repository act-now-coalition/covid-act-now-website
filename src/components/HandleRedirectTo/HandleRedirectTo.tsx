import { Redirect, useLocation } from 'common/utils/router';
import * as QueryString from 'query-string';
import React from 'react';

/**
 * Component that detects the presence of a ?redirectTo=... query param and
 * implements the desired redirect.  Used as part of our meta tag / share images
 * strategy.
 */
export default function HandleRedirectTo() {
  const location = useLocation();
  const params = QueryString.parse(location.search);
  const redirectTo = params['redirectTo'] as string;
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return null;
}
