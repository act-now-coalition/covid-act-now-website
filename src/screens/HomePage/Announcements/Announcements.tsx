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

const Announcements = () => {
  return (
    <Wrapper>
      <AnnouncementsSectionHeader>Announcements</AnnouncementsSectionHeader>
      <AnnouncementIntro>
        Introducing Northern Mariana Islands and Puerto Rico to our COVID Risk
        Mapping
      </AnnouncementIntro>
      <Date>WEDNESDAY, Sept 9, 2020</Date>
      <AnnouncementBodyCopy>
        We are happy to announce the launch of two U.S. territories, Northern
        Mariana Islands and Puerto Rico, in our U.S. Coverage Map! We believe
        that this is an important development given that U.S. territories are
        affected by American public policy and COVID. Until now, there were no
        visualizations for county-level COVID data for either territory. To
        learn more read{' '}
        <ExternalLink href="https://blog.covidactnow.org/introducing-puerto-rico-covid-mapping-to-our-u-s-coverage/">
          Puerto Rico's launch
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://blog.covidactnow.org/introducing-northern-mariana-islands-to-the-u-s-covid-coverage-map/">
          Northern Mariana Islands'
        </ExternalLink>{' '}
        launch.
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://blog.covidactnow.org/introducing-northern-mariana-islands-to-the-u-s-covid-coverage-map/"
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
