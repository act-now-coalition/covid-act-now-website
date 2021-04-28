import styled from 'styled-components';
import {
  LargeFilledButton,
  LargeOutlinedButton,
} from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { ButtonType } from 'assets/theme/buttons';

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
    border: 1px solid transparent;
    background-color: inherit;
    width: 100%;
    border-radius: 0 0 4px 4px;

    &:hover {
      background-color: ${props =>
        props.theme.buttons[ButtonType.OUTLINE].backgroundHover};
    }
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 0 0.5rem 0 0.5rem;
    ${LargeOutlinedButton} {
      width: unset;
      border-radius: 4px;

      &:hover {
        border: ${props =>
          `1px solid ${props.theme.buttons[ButtonType.OUTLINE].borderHover}`};
        background-color: ${props =>
          props.theme.buttons[ButtonType.OUTLINE].backgroundHover};
      }
    }
  }
`;
