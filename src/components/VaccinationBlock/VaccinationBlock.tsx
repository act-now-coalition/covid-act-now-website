import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import {
  Heading2,
  Heading3,
  Paragraph,
  Container,
  FeedbackBox,
  ButtonContainer,
} from './VaccinationBlock.style';
import {
  VaccinationLink,
  getElegibilityLinksByFipsCode,
  getVaccinationOptionsLinksByFipsCode,
} from './utils';
import LinkButton from './LinkButton';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

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
        <LinkButton
          href={url}
          key={label}
          onClick={() => trackVaccinationLink(label)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </LinkButton>
      ))}
    </ButtonContainer>
  </Fragment>
);

function trackVaccinationLink(label: string) {
  trackEvent(EventCategory.VACCINATION, EventAction.CLICK_LINK, label);
}

export default VaccinationBlock;
