import styled from 'styled-components';
import {
  LargeFilledButton,
  LargeOutlinedButton,
} from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const VaccineButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${LargeFilledButton} {
    width: 100%;
    border-radius: 0;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    position: unset;
    bottom: unset;
    left: unset;
    right: unset;

    ${LargeFilledButton} {
      width: unset;
      border-radius: 4px;
    }
  }
`;

export const ShareButtonWrapper = styled.div`
  ${LargeOutlinedButton} {
    border: 0px solid transparent;
    width: 100%;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    ${LargeOutlinedButton} {
      width: unset;
    }
  }
`;
