import React, { useEffect } from 'react';

/**
 * This component redirects the user to the provided external URL.
 */
const ExternalRedirect: React.FC<{ url: string; onRedirect?: () => void }> = ({
  url,
  onRedirect = () => {},
}) => {
  useEffect(() => {
    onRedirect();
    window.location.href = url;
  }, [url, onRedirect]);
  return null;
};

export default ExternalRedirect;
