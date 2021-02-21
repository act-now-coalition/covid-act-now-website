import React from 'react';
import instagram_logo_png from './instagram_icon.png';

const InstagramIcon = ({ size }) => (
  <img
    src={instagram_logo_png}
    style={{ width: size, height: size }}
    alt="Instagram Logo"
  ></img>
);

export default InstagramIcon;
