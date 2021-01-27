import React, { Fragment } from 'react';
import { Region, RegionType } from 'common/regions';
import {
  Heading2,
  Heading3,
  Paragraph,
  Container,
  FeedbackBox,
  ButtonContainer,
} from './VaccinationBlock.style';
import {
  getVaccinationRegions,
  VaccinationLink,
  //getElegibilityLinksByFipsCode,
  //getVaccinationOptionsLinksByFipsCode,
} from './utils';
import LinkButton from './LinkButton';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import { useRegionVaccineData } from 'cms-content/vaccines';

const VaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const vaccinationRegions = getVaccinationRegions(region);

  // Currently only supporting state vaccines, when county and metro data are
  // in the cms, also include here.
  const vaccinationRegionsData = useRegionVaccineData(
    RegionType.STATE,
    vaccinationRegions,
  );

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
    <Container>
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
      <FeedbackBox>
        {/* TODO: Update with the feedback link */}
        Help us improve by giving feedback or suggesting additional sources.
      </FeedbackBox>
    </Container>
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
          onClick={() =>
            trackVaccinationLink(`${trackingLinkPrefix}: ${label}`)
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </LinkButton>
      ))}
    </ButtonContainer>
  </Fragment>
);

// TODO: Setup a better label
function trackVaccinationLink(label: string) {
  trackEvent(EventCategory.VACCINATION, EventAction.CLICK_LINK, label);
}

export default VaccinationBlock;
