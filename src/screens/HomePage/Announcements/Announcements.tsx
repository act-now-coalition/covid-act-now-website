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
          We’re excited to announce a new project at Covid Act Now! The Act Now
          Coalition, the non-profit behind Covid Act Now, is partnering with the
          non-profit{' '}
          <ExternalLink href="https://www.rewiringamerica.org">
            Rewiring America
          </ExternalLink>{' '}
          to build accessible data models and share clear, comprehensive
          information that will support the electrification of American
          households to slow climate change, save people money and create new
          American jobs. Read more{' '}
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
