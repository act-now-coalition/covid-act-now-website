import styled, { css } from 'styled-components';
import {
  LargeFilledButton,
  LargeOutlinedButton,
} from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { ButtonType } from 'assets/theme/buttons';

const BaseButtonStyles = css`
  min-width: 11rem;
  margin: 0 0.5rem 0 0.5rem;
  @media (max-width: ${materialSMBreakpoint}) {
    font-size: 0.9rem;
    padding: 0.75rem;
    height: 2.5rem;
    width: 100%;
    max-width: 16rem;
  }
`;

export const StyledBoosterButton = styled(LargeFilledButton)`
  ${BaseButtonStyles};
  @media (max-width: ${materialSMBreakpoint}) {
    margin-bottom: 0.75rem;
  }
`;

export const StyledHomeTestButton = styled(LargeOutlinedButton)`
  ${BaseButtonStyles};
  border-radius: 4px;

  svg {
    color: #828282;
  }

  &:hover {
    border: ${props =>
      `1px solid ${props.theme.buttons[ButtonType.OUTLINE].borderHover}`};
    background-color: ${props =>
      props.theme.buttons[ButtonType.OUTLINE].backgroundHover};
  }
`;
