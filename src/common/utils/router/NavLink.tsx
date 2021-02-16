/**
 * This is a next.js compatible replacement for react-router-dom's
 * NavLink, which we use in a couple of places.
 */

import React from 'react';
import Link from './Link';
import { Location, useLocation } from './index';

export interface NavLinkProps extends React.ComponentProps<typeof Link> {
  // function signature to match legacy one, but we don't really use 'match' here
  // not sure if we need it more work necessary to figure this out
  isActive?: (match: any, location: Location) => boolean;
  activeClassName?: string;
}

const NavLink = (props: NavLinkProps) => {
  const {
    isActive,
    activeClassName,
    children,
    className,
    ...linkOwnProps
  } = props;

  const location = useLocation();
  const path = location.pathname;
  // this may not be sophisticated enough for all cases but seems to work for us
  const match = path === props.to;
  const active = isActive ? isActive(undefined, location) : match;
  const style = active ? ' ' + (activeClassName ?? 'active') : '';

  const newStyles = className + style;

  return (
    <Link {...linkOwnProps} className={newStyles}>
      {children}
    </Link>
  );
};

export default NavLink;
