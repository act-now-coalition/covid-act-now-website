import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import MuiFormGroup from '@material-ui/core/FormGroup';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { LargeFilledButton } from 'components/ButtonSystem';
import { COLOR_MAP } from 'common/colors';

export const StyledForm = styled.form`
  text-align: left;
`;

const fieldsetStyle = {
  borderRadius: '4px 0 0 4px',
};

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': fieldsetStyle,
      '&:hover fieldset': fieldsetStyle,
      '&:Mui-focused fieldset': fieldsetStyle,
    },
  },
})(MuiTextField);

export const EmailTextField = styled(StyledTextField).attrs(props => ({
  variant: 'outlined',
}))`
  width: 100%;
  background-color: white;

  & label.Mui-focused {
    color: ${COLOR_MAP.GREY_4};
  }

  & label {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
  }

  input {
    font-size: 14px;
  }
`;

export const StyledButton = styled(LargeFilledButton)<{ $success: boolean }>`
  border-radius: 0 4px 4px 0;
  max-height: unset;
  min-width: fit-content;

  span {
    white-space: nowrap;
  }
`;

export const EmailFieldGroup = styled.div`
  display: flex;

  & > * {
    flex: 1 1 auto;
  }
`;

export const StyledFormGroup = styled(MuiFormGroup)`
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

export const Intro = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;

  svg {
    margin-right: 0.75rem;
  }
`;

// Checkbox:
export const StyledCheckbox = styled(MuiCheckbox).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  .MuiCheckbox-root {
    padding-top: 0;
  }

  &.Mui-focusVisible .MuiIconButton-label {
    outline: rgb(0, 95, 204) 1px auto;
  }

  svg {
    color: ${COLOR_MAP.NEW_BLUE.BASE};
  }
`;

export const StyledFormControlLabel = styled(MuiFormControlLabel)`
  align-items: flex-start;

  .MuiButtonBase-root.MuiIconButton-root {
    padding-top: 0;
  }
`;
