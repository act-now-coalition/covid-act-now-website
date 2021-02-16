import React from 'react';
import NextLink from 'next/link';
import { Link as ReactRouterLink } from 'react-router-dom';

export interface LinkProps
  extends React.ComponentProps<typeof ReactRouterLink> {}

const Link = (props: LinkProps) => {
  const { to, onClick, children, className, ...linkOwnProps } = props;

  // FIXME: deal with 'to' string coercion
  return (
    <NextLink href={to as string} {...linkOwnProps} passHref>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
