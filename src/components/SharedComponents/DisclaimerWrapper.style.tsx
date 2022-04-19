import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const DisclaimerWrapper = styled.div`
  max-width: 600px;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.9rem;
  padding-right: 2rem;

  p {
    font-size: inherit;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 1rem;
  }
`;
