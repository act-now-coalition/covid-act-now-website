import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const DisclaimerWrapper = styled.div`
  max-width: 600px;
  padding: 1.5rem 0 0.75rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.5rem 0 2rem;
  }
`;
