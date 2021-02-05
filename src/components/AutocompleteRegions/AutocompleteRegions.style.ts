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
    font-size: 14px;
    padding: ${props =>
      props.$placeholderMinWidth !== '0' ? '10px 4px 1px 8px' : '9.5px 4px'};
    min-width: ${props => props.$placeholderMinWidth};

    &::placeholder {
      color: ${COLOR_MAP.BLUE};
      opacity: 1;
    }

    &:focus {
      color: ${COLOR_MAP.BLACK};
    }
  }
`;
