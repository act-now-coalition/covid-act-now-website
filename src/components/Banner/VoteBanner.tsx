import React from 'react';
import {
  BannerContainer,
  Section,
  Header,
  Body,
  ButtonContainer,
  MainButton,
  SecondaryButton,
} from './VoteBanner.style';
import ExternalLink from 'components/ExternalLink';

const renderSecondaryButton = (redirect: string, cta: string, i: number) => {
  const Button = i === 0 ? MainButton : SecondaryButton;

  return (
    <ExternalLink href={redirect} key={i}>
      <Button
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
      >
        {cta}
      </Button>
    </ExternalLink>
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

  return (
    <BannerContainer>
      <Section>
        <div>
          <Header>Today is National Voter Registration Day!</Header>
          <Body>
            We are proud to encourage all U.S. citizens 18 and older to make
            sure their voter registration is current and that you have all the
            info you need.
          </Body>
        </div>
        <ButtonContainer>
          {buttonsForMap.map((button, i) =>
            renderSecondaryButton(button.redirect, button.cta, i),
          )}
        </ButtonContainer>
      </Section>
    </BannerContainer>
  );
};

export default VoteBanner;
