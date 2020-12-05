import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';

export const ThermometerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20px;
`;

export const ThermometerRow = styled(Box)<{
  $isCurrentLevel?: boolean;
  color: string;
  $thresholdUnknown?: boolean;
}>`
  display: flex;
  flex-direction: row;
  border: ${({ $isCurrentLevel }) => $isCurrentLevel && `4px solid black`};
  background-color: ${({ color, $thresholdUnknown }) =>
    $thresholdUnknown ? LEVEL_COLOR[Level.UNKNOWN] : color};
  height: 26px;
  width: ${({ $isCurrentLevel }) => ($isCurrentLevel ? '24px' : '20px')};
  align-self: center;

  &:first-child {
    border-radius: 99px 99px 0 0;
  }

  &:last-child {
    border-radius: 0 0 99px 99px;
  }
`;
