// a layer of indirection to make react-router easier to replace later
import React from 'react';
import {
  useHistory,
  //useLocation,
  //useParams,
  useRouteMatch,
  matchPath,
} from 'react-router-dom';
import useLocation from './useLocationHack';
import useParams from './useParamsHack';

import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Redirect,
  Switch,
} from 'react-router-dom';

//import { NavLink, Link, NavLinkProps, LinkProps } from 'react-router-dom';
//import { HashLink, HashLinkProps, NavHashLink } from 'react-router-hash-link';
import NavLink, { NavLinkProps } from './NavLink';
import Link, { LinkProps } from './Link';
import HashLink, { HashLinkProps } from './HashLink';
import NavHashLink from './NavHashLink';

export type { HashLinkProps, LinkProps, NavLinkProps, RouteComponentProps };
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
  BrowserRouter,
  Route,
  Redirect,
  Switch,
};
