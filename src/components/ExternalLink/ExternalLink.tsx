import React from 'react';

const ExternalLink: React.FC<{ href: string; onClick?: () => void }> = ({
  href,
  children,
  onClick = () => {},
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
    {children}
  </a>
);

export default ExternalLink;
