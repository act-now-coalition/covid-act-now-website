import React from 'react';
import {
  AnnouncementIntro,
  Date,
  AnnouncementBodyCopy,
  Content,
} from './Announcements.style';
import ExternalLink from 'components/ExternalLink';
import {
  SectionWrapper,
  SmallSectionHeader,
} from 'screens/HomePage/HomePage.style';

const Announcements: React.FC = () => {
  return (
    <SectionWrapper>
      <Content>
        <SmallSectionHeader>Announcements</SmallSectionHeader>
        <AnnouncementIntro>
          Act Now Coalition and Rewiring America
        </AnnouncementIntro>
        <Date>FRIDAY, May 21, 2021</Date>
        <AnnouncementBodyCopy>
          We’re excited to announce a new project! Act Now Coalition, the
          non-profit behind Covid Act Now, is partnering with{' '}
          <ExternalLink href="https://www.rewiringamerica.org">
            Rewiring America
          </ExternalLink>{' '}
          to support the electrification of American homes, which will save
          people money, reduce negative health impacts from air pollution,
          create new American jobs, and help us keep global warming below 1.5°C.
          Read more{' '}
          <ExternalLink href="https://www.rewiringamerica.org/newsletter/we-had-a-very-big-week-here-at-rewiring-america">
            here
          </ExternalLink>
          .
        </AnnouncementBodyCopy>
      </Content>
    </SectionWrapper>
  );
};

export default Announcements;
