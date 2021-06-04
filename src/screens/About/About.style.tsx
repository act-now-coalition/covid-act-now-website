import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from 'assets/theme';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { Heading1, Heading2, Heading3 } from 'components/Markdown';
import { LargeOutlinedButton } from 'components/ButtonSystem';

export const AboutHeading1 = styled(Heading1)`
  margin: 0 0 2.25rem;
`;

export const AboutHeading2 = styled(Heading2)`
  margin: 0rem 0 1.5rem;
  padding-top: 3rem;
`;

export const AboutHeading3 = styled(Heading3)`
  margin: 2rem 0;
`;

/*
  Note(Chelsi): HashWrapper is used for scroll spy in the sidebar. Previously the sidebar
  label was highlighted only when the corresponding section's header was in view.
  Placing the id on a wrapping div makes sure the sidebar item remains
  highlighted when the section's content is in view but its header is not.
*/
export const HashWrapper = styled.div``;

export const PartnersSectionWrapper = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: ${materialSMBreakpoint}) {
    ${AboutHeading3} {
      margin: 1rem auto;
    }
  }
`;

export const StyledGridContainer = styled(Grid)`
  margin: 0.5rem 0 1.25rem;
`;

export const PartnersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 3rem;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: ${materialSMBreakpoint}) {
    margin: 0;
    gap: 1.5rem;
  }
`;

// set a max width so that if a row has two items they won't grow to fill
// the remaining space, instead, they'll be centered via justify-content
// for mobile / small displays we need to show them bigger (but not too big)
export const LogoWrapper = styled.div`
  max-width: 26%;
`;

// on large displays, center the icons to the descriptions.
// but on smaller displays, including mobile, put the icon at the top
export const CommitmentItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: flex-start;

  @media (max-width: ${materialSMBreakpoint}) {
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const CommitmentIcon = styled.img`
  margin: 1rem;

  @media (max-width: ${materialSMBreakpoint}) {
    margin: 0.25rem 0 0 0;
  }
`;

// needed to override end margin for markdown text.
export const CommitmentBody = styled.div`
  p {
    margin-block-end: 0;
  }
`;

export const SectionContent = styled.div``;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  column-gap: 2rem;

  @media (max-width: ${materialSMBreakpoint}) {
    flex-wrap: wrap;
    row-gap: 1rem;
    ${LargeOutlinedButton} {
      width: 100%;
    }
  }
`;

// needed to offset the -12px margins of the grid container
export const TeamGroupContainer = styled.div`
  padding-bottom: 0.75rem;
`;
