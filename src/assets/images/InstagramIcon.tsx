import React from 'react';

const instagram_logo_png = '/assets/images/instagram_icon.png';

const InstagramIcon = ({ size }: { size: number }) => (
  <img
    src={instagram_logo_png}
    style={{ width: size, height: size }}
    alt="Instagram Logo"
  ></img>
);

export default InstagramIcon;
