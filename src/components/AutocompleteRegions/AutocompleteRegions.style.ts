import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { COLOR_MAP } from 'common/colors';

export const StyledTextField = styled(TextField)<{
  $placeholderMinWidth: string;
}>`
  &.MuiTextField-root .MuiOutlinedInput-root fieldset {
    border-radius: 4px;
  }

  .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']
    .MuiAutocomplete-input {
    font-weight: 500;
    font-size: 13px;
    min-width: ${props => props.$placeholderMinWidth};
  }
`;
