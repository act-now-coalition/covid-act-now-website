import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading1, Heading2, Heading3 } from 'components/Markdown';
import Grid from '@material-ui/core/Grid';

export const AboutHeading1 = styled(Heading1)`
  margin: 0 0 2.25rem;
`;

export const AboutHeading2 = styled(Heading2)`
  margin: 0rem 0 1.5rem;
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
`;

export const StyledGridContainer = styled(Grid)`
  margin: 0.5rem 0 1.25rem;
`;

export const CommitmentItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
`;

export const CommitmentIcon = styled.img`
  margin: 1rem;
`;

// needed to override end margin for markdown text.
export const CommitmentBody = styled.div`
  p {
    margin-block-end: 0;
  }
`;

export const SectionContent = styled.div`
  margin-bottom: 2.25rem;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(6)}px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;
