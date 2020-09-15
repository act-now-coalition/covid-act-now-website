import React, { Fragment } from 'react';
import { FacebookIcon, TwitterIcon } from 'react-share';
import InstagramIcon from 'assets/images/InstagramIcon';

const FooterSocialLinks = props => {
  const iconSize = 40;

  return (
    <Fragment>
      <a href="https://www.facebook.com/covidactnow" aria-label="Facebook">
        <FacebookIcon size={iconSize} borderRadius={10} />
      </a>
      <a href="https://www.instagram.com/covidactnow/" aria-label="Instagram">
        <InstagramIcon size={iconSize} />
      </a>
      <a href="https://twitter.com/CovidActNow" aria-label="Twitter">
        <TwitterIcon size={iconSize} borderRadius={10} />
      </a>
    </Fragment>
  );
};

export default FooterSocialLinks;
