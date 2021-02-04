import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { COLOR_MAP } from 'common/colors';
import { BaseButton } from 'components/Button';

export const StyledForm = styled.form``;

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
})(TextField);

export const EmailTextField = styled(StyledTextField).attrs(props => ({
  variant: 'outlined',
}))`
  width: 100%;

  & label.Mui-focused {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
  }
`;

export const StyledButton = styled(BaseButton).attrs(props => ({
  variant: 'contained',
  disableElevation: true,
}))`
  min-width: 90px;
  background-color: ${COLOR_MAP.BLUE};
  color: white;
  border-radius: 0 4px 4px 0;
`;

export const EmailFieldGroup = styled.div`
  display: flex;

  & > * {
    flex: 1 1 auto;
  }
`;
