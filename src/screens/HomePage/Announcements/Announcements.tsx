import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Subtitle1 } from 'components/Typography';
import {
  AnnouncementIntro,
  Wrapper,
  Date,
  AnnouncementBodyCopy,
  ButtonsContainer,
  ViewAllLink,
} from './Announcements.style';
import { scrollWithOffset } from 'components/TableOfContents';

const Announcements: React.FC = () => {
  return (
    <Wrapper>
      <Subtitle1>Announcements</Subtitle1>
      <AnnouncementIntro>Vaccination Data Now Available</AnnouncementIntro>
      <Date>THURSDAY, Jan 21, 2021</Date>
      <AnnouncementBodyCopy>
        You can now see how many people are vaccinated in{' '}
        <HashLink
          to="#search"
          scroll={element => scrollWithOffset(element, -80)}
        >
          each state
        </HashLink>
        , and compare vaccine rollout{' '}
        <HashLink
          to="#compare"
          scroll={element => scrollWithOffset(element, -80)}
        >
          across states
        </HashLink>
        . Due to the widespread, untracked, community spread across all of the
        United States, we will no longer be showing a contact tracing metric on
        our site, although we will continue serving it through our{' '}
        <Link to="/data-api">API</Link>.
      </AnnouncementBodyCopy>
    </Wrapper>
  );
};

export default Announcements;
