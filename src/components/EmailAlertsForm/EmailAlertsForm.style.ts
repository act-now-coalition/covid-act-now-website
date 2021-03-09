import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import MuiFormGroup from '@material-ui/core/FormGroup';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { COLOR_MAP } from 'common/colors';
import { BaseButton } from 'components/Button';
import { Paragraph } from 'components/Markdown';
import { Chip } from '@material-ui/core';

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

export const StyledButton = styled(BaseButton).attrs(props => ({
  variant: 'contained',
}))<{ $success: boolean }>`
  min-width: 110px;
  background-color: ${props =>
    props.$success ? COLOR_MAP.GREEN.BASE : COLOR_MAP.BLUE};
  color: white;
  border-radius: 0 4px 4px 0;

  &:hover {
    background-color: ${props =>
      props.$success ? COLOR_MAP.GREEN.BASE : COLOR_MAP.BLUE};
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

export const StyledFormControlLabel = styled(MuiFormControlLabel)`
  align-items: flex-start;

  .MuiButtonBase-root.MuiIconButton-root {
    padding-top: 0;
  }
`;

export const StyledCheckboxLabel = styled(Paragraph)`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 0;
`;

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
    color: ${COLOR_MAP.BLUE};
  }
`;

export const LocationChip = styled(Chip)`
  background-color: ${COLOR_MAP.GREY_1};
  color: ${COLOR_MAP.GREY_4};
  font-weight: 500;

  span :not(:first-child) {
    padding-left: 6px;
  }
`;
