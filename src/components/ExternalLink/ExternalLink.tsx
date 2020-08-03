import React from 'react';

const ExternalLink: React.FunctionComponent<{ href: string }> = ({
  href,
  children,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalLink;
