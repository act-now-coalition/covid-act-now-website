import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';
import MuiFormGroup from '@material-ui/core/FormGroup';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { COLOR_MAP } from 'common/colors';
import { BaseButton } from 'components/Button';
import { Paragraph } from 'components/Markdown';
import ImmunizationIcon from 'assets/images/ImmunizationIcon';
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
    color: ${COLOR_MAP.GREY_5};
  }

  & label {
    color: ${COLOR_MAP.GREY_4};
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

export const AlertsInfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px;
  background: ${COLOR_MAP.GREY_1};
  border-radius: 4px;

  & > * {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const AlertsInfoBoxIcon = styled(ImmunizationIcon).attrs(props => ({
  width: 20,
  height: 20,
}))`
  flex: 0 0 auto;
  align-self: center;
`;

export const AlertsInfoBoxCopy = styled(Paragraph)`
  flex: 1 0 fill;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1.4;
  color: black;
`;

export const LearnMoreCopy = styled.span`
  cursor: pointer;
  color: ${COLOR_MAP.BLUE};

  &:hover {
    text-decoration: underline;
  }
`;

export const VaccinationIcon = styled(ImmunizationIcon)`
  padding: 2px;
  padding-left: 6px;
`;

export const LocationChip = styled(Chip)`
  background-color: ${COLOR_MAP.GREY_1};
  color: ${COLOR_MAP.GREY_5};
  font-weight: 500;

  span :not(:first-child) {
    padding-left: 6px;
  }
`;
