import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import Logo from 'assets/images/logo';

import {
  FooterContainer,
  FooterButton,
  FooterButtonContainer,
  FooterSignature,
  FooterLogoWrapper,
} from './Embed.style';

export default function EmbedFooter({ onShare }) {
  return (
    <FooterContainer>
      <FooterButtonContainer>
        <IconButton
          target="_blank"
          href="https://www.covidactnow.org"
          icon={<LaunchIcon />}
          iconPosition="right"
        >
          More&nbsp;
        </IconButton>
        {/* <IconButton onClick={onShare} icon={<ShareIcon />} iconPosition="left">
          &nbsp;Share
        </IconButton> */}
      </FooterButtonContainer>
      <FooterSignature>
        <FooterLogoWrapper>
          <Logo height={25} />
        </FooterLogoWrapper>
        Powered by&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.covidactnow.org"
        >
          CovidActNow.org
        </a>
      </FooterSignature>
    </FooterContainer>
  );
}

function IconButton({ iconPosition, children, icon, ...rest }) {
  return (
    <FooterButton disableElevation variant="contained" {...rest}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </FooterButton>
  );
}
