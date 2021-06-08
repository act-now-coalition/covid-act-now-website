import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const ButtonGroup = styled(ToggleButtonGroup)`
  background-color: ${COLOR_MAP.GREY_1};
  border: 1px solid ${COLOR_MAP.GREY_2};
  border-radius: 4px;
`;

export const Button = styled(ToggleButton)`
  padding: 0.63rem;
  border: none;
  .MuiToggleButton-label {
    color: ${COLOR_MAP.GREY_3};
    text-transform: none;
    line-height: 1rem;
  }
  &.Mui-selected {
    background-color: white;
    .MuiToggleButton-label {
      color: ${COLOR_MAP.BLACK};
    }
    font-weight: 500;
    border: 1px solid ${COLOR_MAP.GREY_3};
    border-radius: 3px;
  }
`;
