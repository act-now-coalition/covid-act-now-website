import { Redirect, useLocation } from 'react-router-dom';
import React from 'react';

/**
 * Component that detects the presence of a ?redirectTo=... query param and
 * implements the desired redirect.  Used as part of our meta tag / share images
 * strategy.
 */
export default function HandleRedirectTo() {
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirectTo');
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return null;
}
