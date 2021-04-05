import React from 'react';
import {
  Section,
  PhaseDescription,
  PhaseTitle,
} from '../VaccinationEligibilityBlock.style';
import { Container as AllEligibleContainer } from './AllAdultsEligibleBlock.style';
import { StyledLinkButton, ButtonsContainer } from '../ButtonBlock.style';
import { EventCategory, EventAction } from 'components/Analytics';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// TODO: get button CTAs
const AllAdultsEligibleBlock: React.FC<{ signupLink: string }> = ({
  signupLink,
}) => {
  return (
    <>
      <Section>
        <AllEligibleContainer>
          <PhaseTitle>All adults</PhaseTitle>
          <PhaseDescription
            source={'* Individuals 16+'}
            $currentlyEligible={true}
          />
        </AllEligibleContainer>
      </Section>
      <Section>
        <ButtonsContainer>
          <StyledLinkButton
            $highlighted={false}
            href={'https://vaccinefinder.org/'}
            trackingCategory={EventCategory.VACCINATION}
            trackingAction={EventAction.CLICK_LINK}
            trackingLabel=""
            endIcon={<OpenInNewIcon />}
          >
            Vaccine finder CTA
          </StyledLinkButton>
          <StyledLinkButton
            $highlighted={true}
            href={signupLink}
            trackingCategory={EventCategory.VACCINATION}
            trackingAction={EventAction.CLICK_LINK}
            trackingLabel=""
            endIcon={<OpenInNewIcon />}
          >
            State link CTA
          </StyledLinkButton>
        </ButtonsContainer>
      </Section>
    </>
  );
};

export default AllAdultsEligibleBlock;
