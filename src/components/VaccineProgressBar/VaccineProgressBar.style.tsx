import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const ProgressBarContainer = styled.div`
  /* Adding display:flex makes sure the ParentSize container is tight to its contents */
  display: flex;
  width: 100%;
  max-width: 350px;
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: 288px;
    margin: 0;
  }
`;

export const StyledSvg = styled.svg`
  border: 1px solid ${COLOR_MAP.GREY_2};
  border-radius: 3px;
`;
