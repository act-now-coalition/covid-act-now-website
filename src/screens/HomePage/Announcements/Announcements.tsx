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
        Population”
      </AnnouncementIntro>
      <Date>Tuesday, July 21, 2020</Date>
      <AnnouncementBodyCopy>
        Today, we are adding an important fifth metric to our COVID warning
        system: “daily new cases per 100K population.” The addition of this
        metric rounds out our warning system by incorporating a measure of how
        much COVID there is in each community today.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://docs.google.com/document/d/15w80AaHsSK1EmqYFKwnaR9kTArQI2_tuQ-rcLWJG0-w/edit#"
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
