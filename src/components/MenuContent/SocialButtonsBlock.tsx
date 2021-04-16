import React from 'react';
import { Link } from 'react-router-dom';
import { SocialButtonsRow } from './Menu.style';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ExternalLink from 'components/ExternalLink';

const SocialButtonsBlock: React.FC<{ showTerms: boolean }> = ({
  showTerms,
}) => {
  return (
    <SocialButtonsRow>
      <ExternalLink
        href="https://www.facebook.com/covidactnow"
        aria-label="Facebook"
      >
        <FacebookIcon />
      </ExternalLink>
      <ExternalLink
        href="https://www.instagram.com/covidactnow/"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </ExternalLink>
      <ExternalLink href="https://twitter.com/CovidActNow" aria-label="Twitter">
        <TwitterIcon />
      </ExternalLink>
      {showTerms && <Link to="/terms">Terms</Link>}
    </SocialButtonsRow>
  );
};

export default SocialButtonsBlock;
