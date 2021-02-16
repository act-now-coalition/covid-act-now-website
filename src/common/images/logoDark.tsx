import React from 'react';

const can_logo_dark_svg = './assets/images/covid-act-now-logo-dark.svg';

const Logo = ({ height }: { height?: number }) => (
  <img
    src={can_logo_dark_svg}
    height={height || 40}
    alt="Covid Act Now Logo"
  ></img>
);

export default Logo;
