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
import { trackVoteClick } from 'components/Analytics';

const renderSecondaryButton = (
  redirect: string,
  cta: string,
  trackLabel: string,
  i: number,
) => {
  const Button = i === 0 ? MainButton : SecondaryButton;

  return (
    <ExternalLink href={redirect} key={i}>
      <Button
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
        onClick={() => {
          trackVoteClick(trackLabel);
        }}
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
      trackLabel: 'Register',
    },
    {
      redirect: 'https://www.vote.org/am-i-registered-to-vote/',
      cta: 'Check registration status',
      trackLabel: 'Check registration',
    },
    {
      redirect: 'https://www.vote.org/absentee-voting-rules/',
      cta: 'View mail-in info',
      trackLabel: 'Mail-in',
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
            information you need.
          </Body>
        </div>
        <ButtonContainer>
          {buttonsForMap.map((button, i) =>
            renderSecondaryButton(
              button.redirect,
              button.cta,
              button.trackLabel,
              i,
            ),
          )}
        </ButtonContainer>
      </Section>
    </BannerContainer>
  );
};

export default VoteBanner;
