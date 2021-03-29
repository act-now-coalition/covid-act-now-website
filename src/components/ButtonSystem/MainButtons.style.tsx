import styled, { css } from 'styled-components';
import { ButtonType, ButtonsTheme } from 'assets/theme/buttons';
import BaseButton from './BaseButton';

export function button(styles: ButtonsTheme) {
  return css`
    text-decoration: none;
    text-transform: none;
    border-radius: 4px;
    line-height: 1;
    cursor: pointer;
    letter-spacing: 0;
    ${styles.fontFamily};
    background-color: ${styles.background};
    color: ${styles.text};
    border: 1px solid ${styles.border};
    transition: background-color 0.1s linear;

    &:hover {
      background-color: ${styles.backgroundHover};
      color: ${styles.textHover};
      border: 1px solid ${styles.borderHover};
    }

    svg {
      color: ${styles.icon};
      margin-left: 0.5rem;
    }

    &:disabled {
      background-color: ${styles.disabledBackground};
      color: ${styles.disabledText};

      svg {
        color: ${styles.disabledIcon};
      }
    }
  `;
}

const standardButtonSizing = css`
  padding: 0.625rem;
  font-size: 0.875rem;
`;

const largeButtonSizing = css`
  padding: 1.125rem 1rem;
  font-size: 1rem;
`;

/**
 * Main button variations:
 */
export const StandardOutlinedButton = styled(BaseButton)`
  ${standardButtonSizing};
  ${props => button(props.theme.palette.buttons[ButtonType.OUTLINE])};
`;

export const StandardFilledButton = styled(BaseButton)`
  ${standardButtonSizing};
  ${props => button(props.theme.palette.buttons[ButtonType.FILL])};
`;

export const LargeOutlinedButton = styled(BaseButton)`
  ${largeButtonSizing};
  ${props => button(props.theme.palette.buttons[ButtonType.OUTLINE])};
`;

export const LargeFilledButton = styled(BaseButton)`
  ${largeButtonSizing};
  ${props => button(props.theme.palette.buttons[ButtonType.FILL])};
`;
