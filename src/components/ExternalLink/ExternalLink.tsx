import React, { DetailedHTMLProps } from 'react';

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const ExternalLink: React.FC<AnchorLinkType> = ({
  children,
  ...otherProps
}) => (
  <a target="_blank" rel="noopener noreferrer" {...otherProps}>
    {children}
  </a>
);

export default ExternalLink;
