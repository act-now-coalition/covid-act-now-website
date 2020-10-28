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
} from './ElectionCountdown.style';
import ExternalLink from 'components/ExternalLink';

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

  const flagIconPath = '/images/misc/american_flag_icon.png';

  return (
    <Fragment>
      <FlagIcon src={flagIconPath} />
      <Container>
        <BannerSection>
          <CountdownWrapper>
            {countdownSections.map(section => (
              <CountSection>
                <Count>{section.amount}</Count>
                <Measure>{section.measure}</Measure>
              </CountSection>
            ))}
          </CountdownWrapper>
          <SubCopy>Until election day! Please double check:</SubCopy>
        </BannerSection>
        <BannerSection>
          <ExternalLink href="https://www.vote.org/absentee-ballot-deadlines/">
            Mail-in deadlines
          </ExternalLink>
          <ExternalLink href="https://www.vote.org/early-voting-calendar/">
            Early voting dates
          </ExternalLink>
        </BannerSection>
      </Container>
    </Fragment>
  );
};

const ElectionCountdown: React.FC = () => (
  <Countdown date="2020-11-03T00:00:00" renderer={CountdownContent} />
);

export default ElectionCountdown;
