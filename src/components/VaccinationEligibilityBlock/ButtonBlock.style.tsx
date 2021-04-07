import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { LargeFilledButton } from 'components/ButtonSystem';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  ${LargeFilledButton} {
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;

    ${LargeFilledButton} {
      margin-right: 1rem;
      margin-bottom: 0;
    }
  }
`;
