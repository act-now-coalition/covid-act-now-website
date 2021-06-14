import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const ButtonGroup = styled(ToggleButtonGroup)`
  background-color: ${COLOR_MAP.GREY_1};
  border: 1px solid ${COLOR_MAP.GREY_2};
  border-radius: 4px;
`;

export const Button = styled(ToggleButton).attrs(props => ({
  disableRipple: true,
}))`
  ${props => props.theme.fonts.regularBook};
  padding: 0.75rem;
  border: none;
  .MuiToggleButton-label {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    text-transform: none;
    line-height: 1.4;
  }
  &.Mui-selected {
    ${props => props.theme.fonts.regularBookMidWeight};
    background-color: white;
    .MuiToggleButton-label {
      color: ${COLOR_MAP.BLACK};
    }
    &:hover {
      background-color: white;
    }
    border: 1px solid ${COLOR_MAP.GREY_3};
    border-radius: 3px;
  }
`;
