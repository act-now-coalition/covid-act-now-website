import React from 'react';
import Countdown from 'react-countdown';
import {
  Container,
  Measure,
  Count,
  CountdownWrapper,
  CountSection,
  SubCopy,
  BannerSection,
  FlagIcon,
  StyledLink,
} from './ElectionCountdown.style';
import { trackVoteClick } from 'components/Analytics';
import { VoteBanner } from 'components/Banner';
import {
  ElectionCountdownContainer,
  BannerContainer,
} from 'screens/HomePage/HomePage.style';

const CountdownContent = (props: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const { days, hours, minutes, seconds, completed } = props;
  const countdownSections = [
    {
      measure: 'days',
      amount: days,
    },
    {
      measure: 'hrs',
      amount: hours,
    },
    {
      measure: 'min',
      amount: minutes,
    },
    {
      measure: 'sec',
      amount: seconds,
    },
  ];

  const flagIconPath = 'images/misc/flag_of_the_united_states.svg';

  const linkProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  if (completed) {
    return (
      <BannerContainer>
        <VoteBanner />
      </BannerContainer>
    );
  }
  return (
    <ElectionCountdownContainer>
      <FlagIcon src={flagIconPath} alt="American flag" />
      <Container>
        <BannerSection>
          <CountdownWrapper>
            {countdownSections.map(section => (
              <CountSection key={section.measure}>
                <Count>{section.amount}</Count>
                <Measure>{section.measure}</Measure>
              </CountSection>
            ))}
          </CountdownWrapper>
          <SubCopy>until election day!</SubCopy>
        </BannerSection>
        <BannerSection>
          <StyledLink
            {...linkProps}
            onClick={() => trackVoteClick('Polling place')}
            href="https://www.vote.org/polling-place-locator/"
          >
            Confirm your polling place
          </StyledLink>
          <StyledLink
            {...linkProps}
            onClick={() => trackVoteClick('Ballot dropbox')}
            href="https://www.vote.org/dropbox-locator/"
          >
            Locate a ballot dropbox
          </StyledLink>
        </BannerSection>
      </Container>
    </ElectionCountdownContainer>
  );
};

const ElectionCountdown: React.FC = () => (
  <Countdown date="2020-11-03T00:00:00" renderer={CountdownContent} />
);

export default ElectionCountdown;
