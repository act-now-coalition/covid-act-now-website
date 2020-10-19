import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo';
import * as Style from './NavBar.style';

const navigationLinks = [
  {
    to: '/',
    label: 'Map',
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/resources',
    label: 'Resources',
  },
  {
    to: '/blog',
    label: 'Blog',
  },
  {
    to: '/contact',
    label: 'Contact Us',
  },
];

const NavBar: React.FC = () => {
  return (
    <Style.AppBar position="static" color="transparent" elevation={0}>
      <Style.Toolbar>
        <Link to="/">
          <Logo />
        </Link>
        {/* space */}
        <Style.Spacer />
        {navigationLinks.map(({ to, label }) => (
          <Style.NavLink to={to} key={to} activeClassName="active">
            {label}
          </Style.NavLink>
        ))}
        {/* Donate */}
        {/* Mobile */}
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
