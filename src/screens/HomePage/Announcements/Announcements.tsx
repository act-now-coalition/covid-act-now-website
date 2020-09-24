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
        Introducing v2 of the Covid Act Now API
      </AnnouncementIntro>
      <Date>THURSDAY, Sept 24, 2020</Date>
      <AnnouncementBodyCopy>
        We’re excited to be announcing{' '}
        <ExternalLink href="https://apidocs.covidactnow.org">
          v2 of our API
        </ExternalLink>
        . it will provide all the same data that powers the public Covid Act Now
        site, but in a machine-readable format, made for ease-of-use by those
        wishing to programmatically ingest our data. (For a customizable Google
        Spreadsheet version of our model, see{' '}
        <ExternalLink href="https://covidactnow.org/resources/">
          here
        </ExternalLink>
        .) To gain access, please use{' '}
        <ExternalLink href="https://apidocs.covidactnow.org/access">
          this registration form
        </ExternalLink>{' '}
        for your unique key. <br />
        Please note that daily updates to v1 of our API will be stop on
        10/5/2020. See our{' '}
        <ExternalLink href="https://apidocs.covidactnow.org/migrate">
          documentation
        </ExternalLink>{' '}
        for migration instructions.
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
