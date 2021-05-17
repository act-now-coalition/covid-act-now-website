import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const SectionHeader = styled.h2`
  ${props => props.theme.fonts.regularBookBold};
  font-size: 1.5rem;
  line-height: 1.1;
  margin: 0 0 1rem;
  letter-spacing: 0;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 0 0 1.25rem;
  }
`;
