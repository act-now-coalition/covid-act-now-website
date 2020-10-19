import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';

export const SwitchLabel = styled(Grid)`
  cursor: pointer;
`;

export const SwitchGrid = styled(Grid)<{
  viewAllCounties: boolean | undefined;
  isModal?: boolean;
}>`
  width: fit-content;
  cursor: pointer;

  ${SwitchLabel} {
    &:first-child {
      color: ${({ viewAllCounties }) =>
        viewAllCounties ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'black'};
      color: ${({ isModal }) => isModal && 'white'};
      font-weight: ${({ viewAllCounties }) => !viewAllCounties && 'bold'};
    }
    &:last-child {
      color: ${({ viewAllCounties }) =>
        !viewAllCounties ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'black'};
      color: ${({ isModal }) => isModal && 'white'};
      font-weight: ${({ viewAllCounties }) => viewAllCounties && 'bold'};
    }
  }
`;
