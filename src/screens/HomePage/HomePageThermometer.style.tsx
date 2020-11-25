import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: fit-content;
  padding-bottom: 2.5rem;

  @media (min-width: 600px) {
    margin: auto 0 auto 55px;
    padding-bottom: 0;
  }
`;

export const Title = styled(Typography)`
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;

  width: fit-content;
  align-self: center;

  @media (min-width: 600px) {
    align-self: unset;
  }
`;

export const RowContainer = styled(Box)`
  display: flex;

  width: fit-content;
`;

export const RowColor = styled(Box)<{ $levelColor: string; $rowLevel: Level }>`
  background-color: ${props => props.$levelColor};
  width: 20px;
  border-radius: ${({ $rowLevel }) =>
    $rowLevel === Level.CRITICAL
      ? '10px 10px 0 0'
      : $rowLevel === Level.LOW
      ? '0 0 10px 10px'
      : '0'};
`;
export const RowCopy = styled(Typography)`
  font-family: Roboto;
  font-weight: normal;
  font-size: 15px;
  line-height: 140%;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.8rem;
  margin-left: 1rem;
`;
