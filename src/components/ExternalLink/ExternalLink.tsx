import React, { DetailedHTMLProps } from 'react';

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const ExternalLink: React.FC<AnchorLinkType> = ({
  href,
  children,
  onClick = () => {},
  ...otherProps
}) => (
  <a
    href={href}
    onClick={onClick}
    {...otherProps}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default ExternalLink;
