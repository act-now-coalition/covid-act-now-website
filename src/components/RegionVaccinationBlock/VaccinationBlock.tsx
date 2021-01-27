import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import {
  Heading2,
  Heading3,
  Paragraph,
  ButtonContainer,
} from './RegionVaccinationBlock.style';
import {
  VaccinationLink,
  getElegibilityLinksByFipsCode,
  getVaccinationOptionsLinksByFipsCode,
} from './utils';
import LinkButton from './LinkButton';
import FeedbackBox from './FeedbackBox';
import { trackVaccinationLink } from './utils';

const VaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const { fipsCode } = region;
  const eligibilityLinks = getElegibilityLinksByFipsCode(fipsCode);
  const vaccinationOptionsLinks = getVaccinationOptionsLinksByFipsCode(
    fipsCode,
  );

  // Do not render if we don't have any useful links for a given location
  if (eligibilityLinks.length === 0 || vaccinationOptionsLinks.length === 0) {
    return null;
  }

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
