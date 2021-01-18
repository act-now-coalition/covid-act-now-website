import React from 'react';
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
        COVID Explained is joining the Covid Act Now team
      </AnnouncementIntro>
      <Date>TUESDAY, Jan 19, 2021</Date>
      <AnnouncementBodyCopy>
        We are excited to announce that{' '}
        <ExternalLink href="https://explaincovid.org/">
          COVID Explained
        </ExternalLink>{' '}
        is joining the Covid Act Now team with the shared goal of translating
        complex COVID concepts into simple, research-driven guidance. Moving
        forward, COVID Explained content will be available on the Covid Act Now
        website.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton href="/learn" target="_blank" rel="noopener">
          Continue to Covid Act Now's Learn page
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
