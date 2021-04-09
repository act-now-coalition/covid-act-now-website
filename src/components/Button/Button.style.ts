import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';

const disableRippleProps = {
  disableRipple: true,
  disableElevation: true,
  disableFocusRipple: true,
};

/**
 * Button that looks like a link.
 */
export const LinkButton = styled(Button).attrs(props => disableRippleProps)`
  text-transform: none;

  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;

  /* The margin and padding cancel each other, but the padding makes
   * the element look better when focused (keyboard navigation  )
   */
  padding: 1px 2px;
  margin: -1px -2px;

  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }

  &:hover {
    background-color: transparent;
    text-decoration: underline;
    color: ${COLOR_MAP.BLUE};
  }
`;

const Outlined = styled(Button).attrs(props => ({
  variant: 'outlined',
  ...disableRippleProps,
}))`
  border-color: ${COLOR_MAP.LIGHTGRAY};
`;

export const ButtonPrimary = styled(Outlined)`
  color: ${COLOR_MAP.GREEN.BASE};
`;

export const ButtonSecondary = styled(Outlined)`
  color: ${COLOR_MAP.BLUE};
`;

export const BaseButton = styled(Button).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;
