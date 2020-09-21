import React from 'react';
import {
  BannerContainer,
  Section,
  CopyContainer,
  ButtonContainer,
  MainButton,
  SecondaryButton,
  Redirect,
} from './VoteBanner.style';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const renderSecondaryButton = (redirect: string, cta: string, i: number) => {
  const Button = i === 0 ? MainButton : SecondaryButton;

  return (
    <Redirect href={redirect} target="_blank" rel="noopener noreferrer">
      <Button
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
      >
        {cta}
      </Button>
    </Redirect>
  );
};

const VoteBanner = () => {
  const buttonsForMap = [
    {
      redirect: 'https://www.vote.org/register-to-vote/',
      cta: 'Register To Vote',
    },
    {
      redirect: 'https://www.vote.org/am-i-registered-to-vote/',
      cta: 'Check registration status',
    },
    {
      redirect: 'https://www.vote.org/absentee-ballot/',
      cta: 'View mail-in info',
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <BannerContainer>
      <Section>
        <CopyContainer>
          <h1>Today is National Voter Registration Day!</h1>
          <p>
            We are proud to encourage all U.S. citizens 18 and older to make
            sure their voter registration is current and that you have all the
            info you need.
          </p>
        </CopyContainer>
        <ButtonContainer>
          {buttonsForMap.map((button, i) =>
            renderSecondaryButton(button.redirect, button.cta, i),
          )}
        </ButtonContainer>
      </Section>
      {!isMobile && (
        <Section>
          <img src="/images/misc/usa_flag.png" alt="american flag"></img>
        </Section>
      )}
    </BannerContainer>
  );
};

export default VoteBanner;
