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
        Introducing Puerto Rico COVID Risk Mapping to our U.S. Coverage
      </AnnouncementIntro>
      <Date>Wednesday, August 19, 2020</Date>
      <AnnouncementBodyCopy>
        We are happy to announce the launch of Puerto Rico in our U.S. Coverage
        Map! We believe that this is an important development given that Puerto
        Rico is a U.S. territory affected by American public policy—but until
        now, there were no visualizations for county-level COVID data for Puerto
        Rico.{' '}
        <ExternalLink href="https://blog.covidactnow.org/introduciendo-puerto-rico-a-nuestro-mapa-de-intervenciones-para-estados-unidos">
          Leer el anuncio en español
        </ExternalLink>
        .
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://blog.covidactnow.org/introducing-puerto-rico-covid-mapping-to-our-u-s-coverage"
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
