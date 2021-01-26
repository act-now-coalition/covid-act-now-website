import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import {
  Heading2,
  Heading3,
  Paragraph,
  Container,
  FeedbackBox,
  LocationLink,
  ButtonContainer,
} from './VaccinationBlock.style';
import {
  VaccinationLink,
  getElegibilityLinksByFipsCode,
  getVaccinationOptionsLinksByFipsCode,
} from './utils';

const VaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const eligibilityLinks = getElegibilityLinksByFipsCode(region.fipsCode);
  const vaccinationOptionsLinks = getVaccinationOptionsLinksByFipsCode(
    region.fipsCode,
  );
  // TODO: Return null if there are no links
  if (eligibilityLinks.length === 0 || vaccinationOptionsLinks.length === 0) {
    return null;
  }

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
        />
      )}
      {vaccinationOptionsLinks && (
        <VaccinationLinksBlock
          title="See vaccination options"
          links={vaccinationOptionsLinks}
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
}> = ({ title, links }) => (
  <Fragment>
    <Heading3>{title}</Heading3>
    <ButtonContainer>
      {links.map(({ label, url }) => (
        <LocationLink href={url} key={label}>
          {label}
        </LocationLink>
      ))}
    </ButtonContainer>
  </Fragment>
);

export default VaccinationBlock;
