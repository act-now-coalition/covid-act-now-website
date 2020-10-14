import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';

/**
 * Button that looks like a link.
 */
export const LinkButton = styled(Button).attrs(props => ({
  disableRipple: true,
  disableElevation: true,
  disableFocusRipple: true,
}))`
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
