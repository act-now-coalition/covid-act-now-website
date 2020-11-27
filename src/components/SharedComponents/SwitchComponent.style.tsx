import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';

export const SwitchLabel = styled(Grid)`
  cursor: pointer;
`;

export const SwitchGrid = styled(Grid)<{
  checked: boolean | undefined;
  isModal?: boolean;
}>`
  width: fit-content;
  cursor: pointer;

  ${SwitchLabel} {
    &:first-child {
      color: ${({ checked }) =>
        checked ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'black'};
      color: ${({ isModal }) => isModal && 'white'};
      font-weight: ${({ checked }) => !checked && 'bold'};
    }
    &:last-child {
      color: ${({ checked }) =>
        !checked ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'black'};
      color: ${({ isModal }) => isModal && 'white'};
      font-weight: ${({ checked }) => checked && 'bold'};
    }
  }
`;
