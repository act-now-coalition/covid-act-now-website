import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export const BaseButton = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  &.Mui-focusVisible {
    outline: blue auto 1px;
    outline: -webkit-focus-ring-color auto 1px;
  }
`;
