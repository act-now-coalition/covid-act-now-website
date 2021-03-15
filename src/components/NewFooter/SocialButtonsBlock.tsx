import React from 'react';
import { Link } from 'react-router-dom';
import { SocialButtonsRow } from './Menu.style';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const SocialButtonsBlock = () => {
  return (
    <SocialButtonsRow>
      <a href="https://www.facebook.com/covidactnow" aria-label="Facebook">
        <FacebookIcon />
      </a>
      <a href="https://www.instagram.com/covidactnow/" aria-label="Instagram">
        <InstagramIcon />
      </a>
      <a href="https://twitter.com/CovidActNow" aria-label="Twitter">
        <TwitterIcon />
      </a>
      <a
        href="https://www.linkedin.com/company/covid-act-now/?viewAsMember=true"
        aria-label="Linkedin"
      >
        <LinkedInIcon />
      </a>
      <Link to="/terms" aria-label="Terms">
        Terms
      </Link>
    </SocialButtonsRow>
  );
};

export default SocialButtonsBlock;
