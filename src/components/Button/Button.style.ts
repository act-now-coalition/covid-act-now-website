import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const BaseButton = styled(Button).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;
