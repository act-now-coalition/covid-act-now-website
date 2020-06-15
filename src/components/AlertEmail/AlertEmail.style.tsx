import styled, { css } from 'styled-components';
import { COLORS } from 'common';
import { Box, Typography } from '@material-ui/core';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { Level } from 'common/level';

const SharedContainerStyles = css`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

export const Wrapper = styled(Box)`
  background-color: ${COLORS.LIGHTGRAY};
  flex-direction: column;
  display: flex;
`;

export const LogoContainer = styled(Box)`
  width: fit-content;
  margin: 0 auto 2.5rem;
`;

export const AlertHeader = styled(Box)`
  ${SharedContainerStyles};
  border-bottom: 1px solid ${COLORS.LIGHTGRAY};
  text-transform: uppercase;
  width: 100%;
  max-width: 900px;
`;

export const BellIconContainer = styled(Box)`
  border-radius: 50%;
  background-color: red;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  margin: -15px 0 1rem;

  svg {
    color: white;
  }
`;

export const AlertLocationIntro = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
  color: ${COLOR_MAP.GRAY.DARK};
  margin-bottom: 0.25rem;
`;

export const AlertLocation = styled(Typography)`
  font-family: 'Source Code Pro';
  font-size: 20px;
  line-height: 140%;
  font-weight: bold;
`;

export const AlertBody = styled(Box)`
  ${SharedContainerStyles};
  background-color: white;
  width: 100%;
  max-width: 900px;
`;

export const OverallThreatCopy = styled(Typography)`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const ThreatChangeContainer = styled(Box)`
  display: flex;
`;

const SharedCopyStyles = css`
  font-family: 'Source Code Pro';
  font-size: 13px;
  line-height: 16px;
`;

export const BodyCopyBold = styled(Typography)`
  ${SharedCopyStyles};
  font-weight: bold;
  color: black;
`;

export const BodyCopyRegular = styled(Typography)`
  ${SharedCopyStyles};
  color: ${COLOR_MAP.GRAY.DARK};
`;

export const ThermometerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

export const ThermometerRow = styled(Box)<{
  isCurrentLevel: Boolean;
  color: string;
  bgColor: string;
}>`
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  border: ${({ isCurrentLevel, color }) =>
    isCurrentLevel && `1px solid ${color}`};
  background-color: ${({ isCurrentLevel, bgColor }) =>
    isCurrentLevel && `${bgColor}`};
  color: ${({ isCurrentLevel }) =>
    isCurrentLevel ? 'black' : `${COLOR_MAP.GRAY.DARK}`};
  height: 34px;
`;

export const NowOrPrevContainer = styled(Box)`
  font-family: 'Source Code Pro';
  font-size: 11px;
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  width: 56px;
  color: black;
  align-self: center;
`;

export const Pointer = styled(Box)`
  height: 5px;
  width: 5px;
  background-color: black;
`;

export const NowOrPrevText = styled.span`
  font-family: 'Source Code Pro';
  font-size: 11px;
  font-weight: bold;
  color: black;
`;

export const ThermometerLevelColor = styled(Box)<{
  color: any;
  level: any;
  isCurrentLevel: Boolean;
}>`
  width: 12px;
  margin-left: ${({ isCurrentLevel }) => !isCurrentLevel && '1px'};
  background-color: ${({ color }) => color};
  border-radius: ${({ level }) =>
    level === Level.HIGH
      ? '5px 5px 0 0'
      : level === Level.LOW
      ? '0 0 5px 5px'
      : 0};
`;

export const ThermometerLevelText = styled(Typography)<{
  isCurrentLevel: Boolean;
}>`
  ${SharedCopyStyles};
  color: ${COLOR_MAP.GRAY.DARK};
  width: 255px;
  display: flex;
  align-self: center;
  margin-left: ${({ isCurrentLevel }) => (isCurrentLevel ? '11px' : '12px')};
`;
