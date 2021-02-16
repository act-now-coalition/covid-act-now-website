// a layer of indirection to make react-router easier to replace later
import React from 'react';

import { useRouter } from 'next/router';
import { useHistory, matchPath } from 'react-router-dom';
import useLocation, { Location } from './useLocationHack';
import useParams from './useParamsHack';
import { composeUrl } from './composeUrl';
import { decomposeUrl } from './decomposeUrl';

import { Route, RouteComponentProps, Redirect, Switch } from 'react-router-dom';
//import { NavLink, Link, NavLinkProps, LinkProps } from 'react-router-dom';
//import { HashLink, HashLinkProps, NavHashLink } from 'react-router-hash-link';
import NavLink, { NavLinkProps } from './NavLink';
import Link, { LinkProps } from './Link';
import HashLink, { HashLinkProps } from './HashLink';
import NavHashLink from './NavHashLink';

// we only use the 'url' from the route match, so we can fake it with location.pathname
function useRouteMatch() {
  const router = useRouter();
  return {
    url: router.asPath,
  };
}

export type {
  HashLinkProps,
  LinkProps,
  NavLinkProps,
  RouteComponentProps,
  Location,
};
export {
  HashLink,
  NavHashLink,
  Link,
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  matchPath,
  Route,
  Redirect,
  Switch,
  composeUrl,
  decomposeUrl,
};
