import React from 'react';
import ExternalLink from 'components/ExternalLink';
import {
  AnnouncementIntro,
  Wrapper,
  Date,
  AnnouncementBodyCopy,
  ButtonsContainer,
  ReadMoreButton,
  ViewAllLink,
} from './Announcements.style';
import { Subtitle } from 'components/Typography';

const Announcements = () => {
  return (
    <Wrapper>
      <Subtitle>Announcements</Subtitle>
      <AnnouncementIntro>
        Introducing v2 of the Covid Act Now API
      </AnnouncementIntro>
      <Date>THURSDAY, Sept 24, 2020</Date>
      <AnnouncementBodyCopy>
        We are excited to announce{' '}
        <ExternalLink href="https://apidocs.covidactnow.org">
          v2 of our API
        </ExternalLink>
        . It provides all of the same data that powers Covid Act Now, but now in
        a machine-readable format, made for ease-of-use by those wishing to
        programmatically ingest our data. To gain access, please use this{' '}
        <ExternalLink href="https://apidocs.covidactnow.org/access">
          registration form
        </ExternalLink>{' '}
        to generate your unique key.
        <br />
        <br />
        Please note that daily updates to v1 of our API will end on 10/5/2020.
        See our{' '}
        <ExternalLink href="https://apidocs.covidactnow.org/migration">
          documentation
        </ExternalLink>{' '}
        for migration instructions. For a customizable Google Spreadsheet
        version of our model, see{' '}
        <ExternalLink href="https://covidactnow.org/resources/">
          here
        </ExternalLink>
        .
      </AnnouncementBodyCopy>
      <ButtonsContainer>
        <ReadMoreButton
          href="https://apidocs.covidactnow.org/"
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
