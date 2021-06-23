import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Label = styled.text`
  font-size: 0.75rem;
  fill: ${COLOR_MAP.GRAY_BODY_COPY};
  dominant-baseline: hanging;
  text-anchor: middle;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 0.875rem;
  }
`;
