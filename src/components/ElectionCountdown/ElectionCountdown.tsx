import React, { Fragment } from 'react';
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

const CountdownContent = (props: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const { days, hours, minutes, seconds } = props;
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

  return (
    <Fragment>
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
          <SubCopy>Until election day! Please double check:</SubCopy>
        </BannerSection>
        <BannerSection>
          <StyledLink
            {...linkProps}
            onClick={() => trackVoteClick('Mail-in deadlines')}
            href="https://www.vote.org/absentee-ballot-deadlines/"
          >
            Mail-in deadlines
          </StyledLink>
          <StyledLink
            {...linkProps}
            onClick={() => trackVoteClick('Early voting')}
            href="https://www.vote.org/early-voting-calendar/"
          >
            Early voting dates
          </StyledLink>
        </BannerSection>
      </Container>
    </Fragment>
  );
};

const ElectionCountdown: React.FC = () => (
  <Countdown date="2020-11-03T00:00:00" renderer={CountdownContent} />
);

export default ElectionCountdown;
