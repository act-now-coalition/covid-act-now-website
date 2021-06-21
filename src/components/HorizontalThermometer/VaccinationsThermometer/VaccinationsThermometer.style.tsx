import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Label = styled.text`
  font-size: 0.875rem;
  fill: ${COLOR_MAP.GRAY_BODY_COPY};
  dominant-baseline: hanging;
  text-anchor: middle;
`;
