import styled from 'styled-components';
import { GrayTitle } from 'components/NewLocationPage/Shared/Shared.style';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 350px;
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: 288px;
    margin: 0;
  }
`;

export const Title = styled(GrayTitle)`
  display: none;

  @media (min-width: ${materialSMBreakpoint}) {
    display: inherit;
    margin: 0 0 0.75rem;
  }
`;
