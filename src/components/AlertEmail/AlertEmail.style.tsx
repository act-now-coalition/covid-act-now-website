import styled, { css } from 'styled-components';
import { COLORS } from 'common';
import { Box, Typography } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
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
  padding: 3rem 1rem;
`;

export const LogoContainer = styled(Box)`
  width: fit-content;
  margin: 0 auto 2rem;
  cursor: pointer;
`;

export const AlertHeader = styled(Box)`
  ${SharedContainerStyles};
  border-bottom: 1px solid ${COLORS.LIGHTGRAY};
  text-transform: uppercase;
  width: 100%;
  border-radius: 8px 8px 0px 0px;

  @media (min-width: 600px) {
    max-width: 340px;
  }
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

export const LocationIntro = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
  color: ${COLOR_MAP.GRAY.DARK};
  margin-bottom: 0.25rem;
`;

export const Location = styled(Typography)`
  font-family: 'Source Code Pro';
  font-size: 20px;
  line-height: 140%;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const AlertBody = styled(Box)`
  ${SharedContainerStyles};
  background-color: white;
  width: 100%;
  max-width: 560px;
  padding: 2rem 0.25rem;
  border-radius: 0px 0px 8px 8px;
  margin-bottom: 1.25rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04) @media (min-width: 600px) {
    padding: 2rem;
  }
`;

export const OverallThreatCopy = styled(Typography)`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

export const DirectionChangeContainer = styled(Box)`
  display: flex;
  border: 1px solid ${COLOR_MAP.GRAY.BASE};
  border-radius: 4px;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SharedCopyStyles = css`
  font-family: 'Source Code Pro';
  font-size: 13px;
  line-height: 16px;
`;

export const DirectionCopy = styled(Typography)`
  ${SharedCopyStyles};
  font-weight: bold;
  color: black;
  padding: 0.4rem 0.4rem 0.4rem 0;
`;

export const LastUpdatedDate = styled(Typography)`
  ${SharedCopyStyles};
  color: ${COLOR_MAP.GRAY.DARK};
  margin-bottom: 2rem;
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

export const NowOrPrevContainer = styled(Box)<{ isCurrentLevel: Boolean }>`
  font-family: 'Source Code Pro';
  font-size: 11px;
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  width: 56px;
  color: ${({ isCurrentLevel }) =>
    isCurrentLevel ? 'black' : `${COLOR_MAP.GRAY.DARK}`};
  align-self: center;
`;

export const NowOrPrevText = styled.span<{
  isCurrentLevel: Boolean;
  isPrevLevel: Boolean;
}>`
  font-family: 'Source Code Pro';
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ isCurrentLevel }) =>
    isCurrentLevel ? 'black' : `${COLOR_MAP.GRAY.DARK}`};
  margin-right: ${({ isPrevLevel }) => isPrevLevel && '-1px'};
`;

export const RowLevelColor = styled(Box)<{
  color: string;
  level: number;
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

export const RowLevelText = styled(Typography)<{
  isCurrentLevel: Boolean;
}>`
  ${SharedCopyStyles};
  color: ${({ isCurrentLevel }) =>
    isCurrentLevel ? 'black' : `${COLOR_MAP.GRAY.DARK}`};
  font-weight: ${({ isCurrentLevel }) => isCurrentLevel && 'bold'};
  width: 255px;
  display: flex;
  align-self: center;
  margin-left: 12px;
`;

export const ViewChartButton = styled(Box)`
  max-width: 560px;
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
  background-color: ${COLOR_MAP.BLUE};
  cursor: pointer;
  color: white;
  font-family: 'Roboto';
  font-size: 17px;
  line-height: 20px;
  font-weight: bold;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;

  &:hover {
    background-color: rgb(59, 165, 200);
  }
`;

export const FooterWrapper = styled(Box)`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FooterCopy = css`
  font-family: 'Roboto';
  font-size: 15px;
  line-height: 1.4;
`;
export const LeaveFeedbackCopy = styled(Typography)`
  ${FooterCopy};
  color: black;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const FeedbackInstructionsCopy = styled(Typography)`
  ${FooterCopy};
  color: #4f4f4f;
  margin-bottom: 3.25rem;
`;
