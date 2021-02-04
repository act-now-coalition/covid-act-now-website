import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { COLOR_MAP } from 'common/colors';

export const StyledForm = styled.form``;

const fieldsetStyle = {
  borderRadius: '4px',
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

  & fieldset {
    border-radius: 4px;
  }
`;
