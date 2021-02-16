import React from 'react';
import { composeUrl, decomposeUrl, useLocation } from './index';
import Link from './Link';

export interface HashLinkProps extends React.ComponentProps<typeof Link> {
  // function signature to match legacy one, but we don't really use 'match' here
  // not sure if we need it more work necessary to figure this out
  scroll?: (el: HTMLElement) => void;
  smooth?: boolean;
}

const HashLink = (props: HashLinkProps) => {
  // FIXME: Eat the scroll param for now.  Next/link allows scrolling to IDs but doesn't
  // allow a custom scroll function (which we use to provide a scroll offset parameter,
  // it looks like, to not have the scrolled thing hidden by the banner)
  // FIXME: Find a way to fix the scroll offset.
  const { scroll, to, children, ...linkOwnProps } = props;

  const { pathname, search, hash } = decomposeUrl(to as string);
  const location = useLocation();

  const safeTarget = composeUrl({
    // if the url is created with just a hash (i.e., is the emptry string ''), prepend the current location.
    pathname: pathname || location.pathname,
    search,
    hash,
  });
  return (
    <Link {...linkOwnProps} to={safeTarget}>
      {children}
    </Link>
  );
};

export default HashLink;
