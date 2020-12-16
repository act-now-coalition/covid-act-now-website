import React from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from 'components/ExternalLink';
import { Subtitle1 } from 'components/Typography';
import {
  AnnouncementIntro,
  Wrapper,
  Date,
  AnnouncementBodyCopy,
  ButtonsContainer,
  ReadMoreButton,
  ViewAllLink,
} from './Announcements.style';

const Announcements: React.FC = () => {
  return (
    <Wrapper>
      <Subtitle1>Announcements</Subtitle1>
      <AnnouncementIntro>
        Covid Act Now and Covid Exit Strategy are now one team
      </AnnouncementIntro>
      <Date>MONDAY, Dec 14, 2020</Date>
      <AnnouncementBodyCopy>
        We’re excited to officially announce that{' '}
        <ExternalLink href="https://www.covidexitstrategy.org">
          Covid Exit Strategy (CES)
        </ExternalLink>{' '}
        and <Link to="/">Covid Act Now (CAN)</Link> are joining forces. Updates
        to CES will continue until December 20, with the CES team joining CAN to
        grow the data and tools we provide for you.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://blog.covidactnow.org/covid-exit-strategy-covid-act-now/"
          target="_blank"
          rel="noopener"
        >
          Continue reading
        </ReadMoreButton>
        <ViewAllLink
          href="https://blog.covidactnow.org/"
          target="_blank"
          rel="noopener"
        >
          View all announcements
        </ViewAllLink>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Announcements;
