import React, { Fragment } from 'react';
import { FacebookIcon, TwitterIcon } from 'react-share';

import InstagramIcon from '../../assets/images/InstagramIcon';

const FooterSocialLinks = () => {
  const iconSize = 40;

  return (
    <Fragment>
      <a href="https://www.facebook.com/covidactnow">
        <FacebookIcon size={iconSize} borderRadius={10} />
      </a>
      <a href="https://www.instagram.com/covidactnow/">
        <InstagramIcon size={iconSize} />
      </a>
      <a href="https://twitter.com/CovidActNow">
        <TwitterIcon size={iconSize} borderRadius={10} />
      </a>
    </Fragment>
  );
};

export default FooterSocialLinks;
