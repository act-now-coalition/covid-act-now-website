import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import {
  RegionVaccinationInfo,
  getVaccinationDataByRegion,
} from 'cms-content/vaccines';
import LinkButton from './LinkButton';
import FeedbackBox from './FeedbackBox';
import Header from './Header';
import { Heading3, ButtonContainer } from './RegionVaccinationBlock.style';
import {
  getVaccinationRegions,
  VaccinationLink,
  trackVaccinationLink,
} from './utils';

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
  const vaccinationOptionsLinks: VaccinationLink[] = vaccinationRegionsData
    .map(data =>
      data.vaccinationSignupUrl
        ? {
            label: data.locationName,
            url: data.vaccinationSignupUrl,
          }
        : null,
    )
    .filter((link): link is VaccinationLink => link !== null);
  return (
    <Fragment>
      <Header />
      {eligibilityLinks && (
        <VaccinationLinksBlock
          title="Where can I get vaccinated if I’m in..."
          links={eligibilityLinks}
          trackingLinkPrefix="Eligibility"
        />
      )}
      {vaccinationOptionsLinks && (
        <VaccinationLinksBlock
          title="Where and how do I get vaccinated if I’m in..."
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
