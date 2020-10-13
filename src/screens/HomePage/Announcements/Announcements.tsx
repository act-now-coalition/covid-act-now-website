import React from 'react';
import ExternalLink from 'components/ExternalLink';

import {
  AnnouncementsSectionHeader,
  AnnouncementIntro,
  Wrapper,
  Date,
  AnnouncementBodyCopy,
  ButtonsContainer,
  ReadMoreButton,
  ViewAllLink,
} from './Announcements.style';

// TODO (Chelsi)- add blog post link
const Announcements = () => {
  return (
    <Wrapper>
      <AnnouncementsSectionHeader>Announcements</AnnouncementsSectionHeader>
      <AnnouncementIntro>
        Using CAN to understand the impact of COVID on Native American
        communities
      </AnnouncementIntro>
      <Date>MONDAY, Oct 12, 2020</Date>
      <AnnouncementBodyCopy>
        In light of Indigenous Peoples’ Day, our team has added a tool to help
        you visualize the impact of COVID on majority Native American counties.
        <br />
        <br />
        <ExternalLink href="https://apidocs.covidactnow.org/migration">
          Click here
        </ExternalLink>{' '}
        to see some of the trends that our team observed using this tool.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton href="/" target="_blank" rel="noopener">
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
