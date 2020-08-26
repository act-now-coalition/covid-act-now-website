import React, { useEffect } from 'react';

/**
 * This component redirects the user to the provided external URL.
 */
const ExternalRedirect: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
};

export default ExternalRedirect;
