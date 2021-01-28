import styled from 'styled-components';
import COLORS from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    border: 1px solid ${COLORS.LIGHTGRAY};
    width: fit-content;
    padding: 0.75rem 2.25rem;
    border-radius: 4px;
    margin: 3rem auto 0;
  }
`;
