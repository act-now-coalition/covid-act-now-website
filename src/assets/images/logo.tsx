import React from 'react';
import can_logo_png from './covid-act-now-logo.png';

const Logo = ({ height }: { height?: number }) => (
  <img src={can_logo_png} height={height || 40} alt="Covid Act Now Logo"></img>
);

export default Logo;
