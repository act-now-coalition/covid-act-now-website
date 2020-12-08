import React from 'react';
import can_logo_url_light_svg from './covid-act-now-logo-url-light.svg';

const Logo = ({ height }: { height?: number }) => (
  <img
    src={can_logo_url_light_svg}
    height={height || 40}
    alt="Covid Act Now Logo"
  ></img>
);

export default Logo;
