import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { Heading1, Heading2, Heading3 } from 'components/Markdown';

export const AboutHeading1 = styled(Heading1)`
  margin: 0 0 2.25rem;
`;

export const AboutHeading2 = styled(Heading2)`
  margin: 2.5rem 0 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 3.5rem 0 1.5rem;
  }
`;

export const AboutHeading3 = styled(Heading3)`
  margin: 3rem 0 2rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 4rem 0 2rem;
  }
`;

/*
  Note(Chelsi): HashWrapper is used for scroll spy in the sidebar. Previously the sidebar
  label was highlighted only when the corresponding section's header was in view.
  Placing the id on a wrapping div makes sure the sidebar item remains
  highlighted when the section's content is in view but its header is not.
*/
export const HashWrapper = styled.div``;
