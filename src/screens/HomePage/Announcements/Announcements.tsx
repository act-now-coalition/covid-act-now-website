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

//TODO(Chelsi): replace ReadMoreButton's href with blog post

const Announcements = () => {
  return (
    <Wrapper>
      <AnnouncementsSectionHeader>Announcements</AnnouncementsSectionHeader>
      <AnnouncementIntro>
        Introducing our newest key indicator, “Daily New Cases Per 100K
        Population.”
      </AnnouncementIntro>
      <Date>Tuesday, July 1, 2020</Date>
      <AnnouncementBodyCopy>
        Today, we are excited to announce a fifth metric added to our COVID
        warning system: daily new cases per 100K population. The technical,
        epidemiological term is “case incidence.”
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
