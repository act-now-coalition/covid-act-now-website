import React from 'react';

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

const Announcements = () => {
  return (
    <Wrapper>
      <AnnouncementsSectionHeader>Announcements</AnnouncementsSectionHeader>
      <AnnouncementIntro>
        Introducing our newest key indicator, “Daily New Cases Per 100K
        Population”
      </AnnouncementIntro>
      <Date>Wednesday, July 22, 2020</Date>
      <AnnouncementBodyCopy>
        Today, we are adding an important fifth metric to our COVID warning
        system: “daily new cases per 100K population.” The addition of this
        metric rounds out our warning system by incorporating a measure of how
        much COVID there is in each community today.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://blog.covidactnow.org/"
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
