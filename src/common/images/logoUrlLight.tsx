import React from 'react';

const can_logo_url_light_svg =
  './assets/images/covid-act-now-logo-url-light.svg';

const Logo = ({ height }: { height?: number }) => (
  <img
    src={can_logo_url_light_svg}
    height={height || 40}
    alt="Covid Act Now Logo"
  ></img>
);

export default Logo;
