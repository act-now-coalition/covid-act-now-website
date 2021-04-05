import React from 'react';
import {
  Section,
  PhaseDescription,
  PhaseTitle,
} from '../VaccinationEligibilityBlock.style';
import { Heading2, Paragraph } from 'components/Markdown';
import { Container as AllEligibleContainer } from './AllAdultsEligibleBlock.style';
import { StyledLinkButton, ButtonsContainer } from '../ButtonBlock.style';
import { EventCategory, EventAction } from 'components/Analytics';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// TODO: state link as prop
const AllAdultsEligibleBlock: React.FC = () => {
  return (
    <>
      <Heading2>Vaccine eligibility</Heading2>
      {/* TOOD: double check on this copy: */}
      <Paragraph>
        Note: Supply is still likely to be limited for at least the next couple
        of weeks.
      </Paragraph>
      <Section>
        <AllEligibleContainer>
          <PhaseTitle>All adults</PhaseTitle>
          <PhaseDescription
            source={'* People ages 55-64'}
            $currentlyEligible={true}
          />
        </AllEligibleContainer>
      </Section>
      <Section>
        <ButtonsContainer>
          <StyledLinkButton
            $highlighted={true}
            href={'/donate'} // TODO: grab state link from cms
            trackingCategory={EventCategory.VACCINATION}
            trackingAction={EventAction.CLICK_LINK}
            trackingLabel="See where and how to get vaccinated (16+ eligible)"
            endIcon={<OpenInNewIcon />}
          >
            See where and how to get vaccinated
          </StyledLinkButton>
        </ButtonsContainer>
      </Section>
    </>
  );
};

export default AllAdultsEligibleBlock;
