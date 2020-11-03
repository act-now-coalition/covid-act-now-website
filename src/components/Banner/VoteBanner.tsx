import React from 'react';
import {
  BannerContainer,
  Section,
  Header,
  Body,
  ButtonContainer,
  SecondaryButton,
  GradientWrapper,
} from './VoteBanner.style';
import ExternalLink from 'components/ExternalLink';
import { trackVoteClick } from 'components/Analytics';

const renderSecondaryButton = (
  redirect: string,
  cta: string,
  trackLabel: string,
  i: number,
) => {
  return (
    <ExternalLink href={redirect} key={i}>
      <SecondaryButton
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
        disableElevation
        onClick={() => {
          trackVoteClick(trackLabel);
        }}
      >
        {cta}
      </SecondaryButton>
    </ExternalLink>
  );
};

const VoteBanner = () => {
  const buttonsForMap = [
    {
      redirect: 'https://www.vote.org/polling-place-locator/',
      cta: 'Confirm your polling place',
      trackLabel: 'Confirm polling place',
    },
    {
      redirect: 'https://www.vote.org/election-protection/',
      cta: 'Know your rights',
      trackLabel: 'Voter rights',
    },
  ];

  return (
    <GradientWrapper>
      <BannerContainer>
        <Section>
          <div>
            <Header>Today is Election Day!</Header>
            <Body>
              We are proud to encourage all eligible voters to make their voices
              heard. Here are some important resources:
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
    </GradientWrapper>
  );
};

export default VoteBanner;
