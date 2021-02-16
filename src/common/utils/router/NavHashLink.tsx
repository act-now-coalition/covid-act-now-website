/**
 * This is a next.js compatible replacement for react-router-dom's
 * NavLink, which we use in a couple of places.
 */

import React from 'react';
import trim from 'lodash/trim';
import NavLink from './NavLink';
import { decomposeUrl, Location } from './index';

interface NavHashLinkProps extends React.ComponentProps<typeof NavLink> {
  scroll?: (elem: HTMLElement) => void;
}

const NavHashLink = (props: NavHashLinkProps) => {
  // FIXME: Eat the scroll param for now.  Next/link allows scrolling to IDs but doesn't
  // allow a custom scroll function (which we use to provide a scroll offset parameter,
  // it looks like, to not have the scrolled thing hidden by the banner)
  // FIXME: Find a way to fix the scroll offset.
  const { scroll, isActive, children, ...linkOwnProps } = props;

  const targetHash = decomposeUrl(String(props.to)).hash;

  let isActiveFn = isActive;
  if (!isActiveFn) {
    isActiveFn = (match, location: Location) => {
      return targetHash == trim(location.hash, '#');
    };
  }

  return (
    <NavLink {...linkOwnProps} isActive={isActiveFn}>
      {children}
    </NavLink>
  );
};

export default NavHashLink;
