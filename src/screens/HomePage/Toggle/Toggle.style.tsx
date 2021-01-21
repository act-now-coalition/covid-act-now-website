import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  @media (min-width: ${materialSMBreakpoint}) {
    border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
    width: fit-content;
    padding: 0.75rem 2.25rem;
    border-radius: 4px;
  }
`;
