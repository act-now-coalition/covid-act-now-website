import React from 'react';
import can_logo_dark_svg from './covid-act-now-logo-dark.svg';

const Logo = ({ height }: { height?: number }) => (
  <img
    src={can_logo_dark_svg}
    height={height || 40}
    alt="Covid Act Now Logo"
  ></img>
);

export default Logo;
