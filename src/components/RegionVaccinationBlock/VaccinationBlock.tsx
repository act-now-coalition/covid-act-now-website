import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import {
  Heading2,
  Heading3,
  Paragraph,
  ButtonContainer,
} from './RegionVaccinationBlock.style';
import { getVaccinationRegions, VaccinationLink } from './utils';
import LinkButton from './LinkButton';
import {
  RegionVaccinationInfo,
  getVaccinationDataByRegion,
} from 'cms-content/vaccines';
import FeedbackBox from './FeedbackBox';
import { trackVaccinationLink } from './utils';

const VaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const vaccinationRegions = getVaccinationRegions(region);

  const vaccinationRegionsData = vaccinationRegions
    .map(getVaccinationDataByRegion)
    .filter((data): data is RegionVaccinationInfo => data !== null);

  if (!vaccinationRegionsData) {
    return null;
  }
  const eligibilityLinks: VaccinationLink[] = vaccinationRegionsData.map(
    data => {
      return { label: data.locationName, url: data.eligibilityInfoUrl };
    },
  );
  const vaccinationOptionsLinks: VaccinationLink[] = vaccinationRegionsData.map(
    data => {
      return { label: data.locationName, url: data.vaccinationSignupUrl || '' };
    },
  );
  return (
    <Fragment>
      <Heading2>How to get vaccinated</Heading2>
      <Paragraph>
        Depending on your location, you may have to schedule an appointment or
        get on a waitlist.
      </Paragraph>
      {eligibilityLinks && (
        <VaccinationLinksBlock
          title="Check eligibility"
          links={eligibilityLinks}
          trackingLinkPrefix="Eligibility"
        />
      )}
      {vaccinationOptionsLinks && (
        <VaccinationLinksBlock
          title="See vaccination options"
          links={vaccinationOptionsLinks}
          trackingLinkPrefix="Options"
        />
      )}
      <FeedbackBox />
    </Fragment>
  );
};

// TODO: Add tracking for these links
const VaccinationLinksBlock: React.FC<{
  title: string;
  links: VaccinationLink[];
  trackingLinkPrefix: string;
}> = ({ title, links, trackingLinkPrefix }) => (
  <Fragment>
    <Heading3>{title}</Heading3>
    <ButtonContainer>
      {links.map(({ label, url }) => (
        <LinkButton
          href={url}
          key={label}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackVaccinationLink(`${trackingLinkPrefix}: ${label}`)
          }
        >
          {label}
        </LinkButton>
      ))}
    </ButtonContainer>
  </Fragment>
);

export default VaccinationBlock;
