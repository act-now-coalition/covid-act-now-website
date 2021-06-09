import styled from 'styled-components';
import {
  LargeFilledButton,
  LargeOutlinedButton,
} from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { ButtonType } from 'assets/theme/buttons';

export const StyledVaccineButton = styled(LargeFilledButton)`
  display: none;

  @media (min-width: ${materialSMBreakpoint}) {
    white-space: nowrap;
    display: inherit;
  }
`;

export const StyledShareButton = styled(LargeOutlinedButton)`
  border: 1px solid transparent;
  background-color: inherit;
  border-radius: 0 0 4px 4px;
  width: 100%;

  &:hover {
    background-color: ${props =>
      props.theme.buttons[ButtonType.OUTLINE].backgroundHover};
    border: 1px solid transparent;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 0 0.5rem 0 0.5rem;
    border-radius: 4px;
    width: initial;

    &:hover {
      border: ${props =>
        `1px solid ${props.theme.buttons[ButtonType.OUTLINE].borderHover}`};
      background-color: ${props =>
        props.theme.buttons[ButtonType.OUTLINE].backgroundHover};
    }
  }
`;
