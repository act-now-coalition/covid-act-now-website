import styled, { css } from 'styled-components';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';

// Mobile:
export const MobileThermometerContainer = styled.div`
  display: flex;
  width: 160px;
`;

export const ColorBlock = styled.div<{
  color: string;
  $isCurrentLevel?: boolean;
  $levelUnknown?: boolean;
}>`
  display: flex;
  align-self: center;
  background: ${({ color, $levelUnknown }) =>
    $levelUnknown ? LEVEL_COLOR[Level.UNKNOWN] : color};
  border: ${({ $isCurrentLevel }) => $isCurrentLevel && `4px solid black`};
  border-radius: ${({ $isCurrentLevel }) => ($isCurrentLevel ? '1px' : '0')};
  height: ${({ $isCurrentLevel }) => ($isCurrentLevel ? '20px' : '16px')};
  width: 100%;

  &:first-child {
    border-radius: 99px 0 0 99px;
  }

  &:last-child {
    border-radius: 0 99px 99px 0;
  }
`;

// Desktop:
const GradientBackground = css`
  background: linear-gradient(
    ${LEVEL_COLOR[Level.LOW]} 20%,
    ${LEVEL_COLOR[Level.MEDIUM]} 20%,
    ${LEVEL_COLOR[Level.MEDIUM]} 40%,
    ${LEVEL_COLOR[Level.HIGH]} 40%,
    ${LEVEL_COLOR[Level.HIGH]} 60%,
    ${LEVEL_COLOR[Level.CRITICAL]} 60%,
    ${LEVEL_COLOR[Level.CRITICAL]} 80%,
    ${LEVEL_COLOR[Level.SUPER_CRITICAL]} 80%,
    ${LEVEL_COLOR[Level.SUPER_CRITICAL]} 100%
  );
`;

const UnknownBackground = css`
  background: ${LEVEL_COLOR[Level.UNKNOWN]};
`;

export const DesktopThermometer = styled.div<{ $levelUnknown?: boolean }>`
  height: 60px;
  width: 12px;
  border-radius: 99px;
  ${({ $levelUnknown }) =>
    $levelUnknown ? UnknownBackground : GradientBackground};
`;
