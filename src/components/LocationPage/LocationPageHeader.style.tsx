import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { COLORS } from 'common';
import { COLOR_MAP } from 'common/colors';
import { Level } from 'common/level';
import MuiWarningIcon from '@material-ui/icons/Warning';
import MuiInfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { InfoIcon } from 'components/InfoTooltip/Tooltip.style';

export const ColoredHeaderBanner = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: ${props => props.bgcolor || COLORS.LIGHTGRAY};

  @media (min-width: 600px) {
    height: 250px;
  }
`;

export const Wrapper = styled(Box)<{
  $condensed?: boolean;
  $headerTopMargin: number;
  $headerBottomMargin: number;
}>`
  ${props =>
    props.$condensed
      ? `
    display: block;
  `
      : `
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    background-color: unset;
    box-shadow: none;
    max-width: 1000px;
    flex-direction: column;
    cursor: pointer;
    margin: -380px 1rem 0 1rem;

    @media (min-width: 600px) {
      position: relative;
      flex-direction: column;
      margin: ${props.$headerTopMargin}px 1rem ${props.$headerBottomMargin}px;
    }

    @media (min-width: 1060px) {
      margin: ${props.$headerTopMargin}px auto ${props.$headerBottomMargin}px;
    }
    @media (min-width: 1350px) {
      margin: ${props.$headerTopMargin}px 350px ${props.$headerBottomMargin}px auto;
    }

    @media (min-width: 1750px) {
      margin: ${props.$headerTopMargin}px auto ${props.$headerBottomMargin}px;
    }
  `}
`;

export const TopContainer = styled(Box)`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: white;
`;

export const HeaderSection = styled(Box)`
  display: flex;
  flex-direction: column;
  cursor: default;

  &:nth-child(2) {
    background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  }

  &:last-child {
    justify-content: space-between;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const HeaderSubtitle = styled(Typography)`
  font-size: 15px;
  line-height: 1.4;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-top: 1.2rem;

  @media (min-width: 600px) {
    font-size: 16px;
    margin-top: 1rem;
  }
`;

export const FooterContainer = styled(Box)`
  margin: 0.8rem 0.3rem 0;

  p {
    padding: 0;
  }

  svg {
    transform: translateY(0.75rem);
    margin-right: 0.75rem;
  }

  @media (min-width: 600px) {
    width: 100%;
    margin: 1.5rem 0 0.5rem 0.2rem;
    cursor: auto;
    max-width: 900px;
    align-self: center;

    a {
      cursor: pointer;
    }

    svg {
      transform: translateY(0.35rem);
    }
  }

  @media (min-width: 1350px) {
    align-self: flex-start;
  }

  @media (min-width: 1750px) {
    align-self: center;
  }
`;

export const HeaderSubCopy = styled(Typography)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 13px;
  line-height: 1.4;
  padding: 1.5rem 0 0.2rem;
  font-family: Source Code Pro;

  text-align: end;

  svg {
    margin: 0 0.5rem 0 0;
    flex-shrink: 0;
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
  border-radius: 0 0 8px 8px;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (min-width: 600px) {
    width: fit-content;
    background-color: unset;
    border-radius: 0;
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`;

export const HeaderButton = styled(Button).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
  variant: 'outlined',
  focusVisibleClassName: 'Button-focused',
}))`
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 4px;
  text-transform: uppercase;
  padding: 0.5rem 0.75rem;
  letter-spacing: 0.02em;

  &:first-child {
    color: ${COLOR_MAP.BLUE};
    margin-right: 0.5rem;

    &:hover {
      border: 1px solid ${COLOR_MAP.BLUE};
      background-color: white;
    }
  }

  &:last-child {
    color: ${COLOR_MAP.RED.BASE};

    &:hover {
      border: 1px solid ${COLOR_MAP.RED.BASE};
      background-color: white;
    }
  }

  svg {
    margin-right: 6px;
  }

  // iphone 6/7/8/x and up:
  @media (min-width: 375px) {
    &:first-child {
      margin-right: 1.2rem;
    }
  }

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 0.75rem 1.75rem;
    margin: auto;

    &:first-child {
      margin-right: 1.5rem;
    }
  }

  &.Button-focused {
    // Defaults to blue if we don't have a user agent color
    outline: blue auto 1px;
    outline: -webkit-focus-ring-color auto 1px;
  }
`;

export const LastUpdatedDate = styled.span<{
  isVerifiedState?: boolean;
}>`
  display: flex;
  margin-left: ${({ isVerifiedState }) => isVerifiedState && '32px'};

  @media (min-width: 600px) {
    display: inline;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

export const SectionHalf = styled(Box)`
  display: flex;

  &:first-child:last-child {
    margin: 2rem 1.6rem;
  }

  &:first-child {
    margin: 2rem 1.6rem;
  }

  &:last-child {
    margin: 0 1.6rem 2rem;
  }

  svg {
    color: ${COLOR_MAP.GRAY_ICON};
  }

  @media (min-width: 600px) {
    &:first-child {
      flex: 3;
      margin: 2rem 1.5rem 2rem 2.25rem;
    }

    &:last-child {
      flex: 2;
      margin: 2rem 2rem 2rem 0;
    }
  }
`;

export const SectionColumn = styled(Box)<{ $isUpdateCopy?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;

  ${InfoIcon} {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    transform: translateY(3px);
  }

  @media (min-width: 600px) {
    margin-left: ${({ $isUpdateCopy }) => ($isUpdateCopy ? '1rem' : '1.5rem')};
  }
`;

export const ColumnTitle = styled(Typography)<{ $isUpdateCopy?: boolean }>`
  font-family: Roboto;
  font-size: ${({ $isUpdateCopy }) => ($isUpdateCopy ? '13px' : '12px')};
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  letter-spacing: 0.02rem;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    margin-bottom: ${({ $isUpdateCopy }) =>
      $isUpdateCopy ? '.5rem' : '.75rem'};
    font-size: 13px;
  }
`;

export const Copy = styled(Typography)<{ $isUpdateCopy?: boolean }>`
  font-family: Source Code Pro;
  font-size: ${({ $isUpdateCopy }) => ($isUpdateCopy ? '13px' : '12px')};
  line-height: 140%;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  strong {
    color: black;
  }

  span {
    color: ${COLOR_MAP.BLUE};
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 600px) {
    font-size: 13px;
    max-width: 440px;
  }
`;

export const LevelDescription = styled(Typography)`
  font-family: Source Code Pro;
  font-size: 16px;
  line-height: 140%;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    font-size: 18px;
    margin-bottom: 0.75rem;
  }
`;

// TODO(michael): This doesn't seem to be used. We should remove it!
export const Triangle = styled(Box)<{ alarmLevel: number }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid black;
  margin-top: 6px;
  margin-left: ${({ alarmLevel }) =>
    alarmLevel === Level.LOW
      ? '-96px'
      : alarmLevel === Level.MEDIUM
      ? '-32px'
      : alarmLevel === Level.HIGH
      ? '32px'
      : alarmLevel === Level.CRITICAL
      ? '96px'
      : '0'};
`;

export const WarningIcon = styled(MuiWarningIcon)`
  align-self: flex-start;
  path {
    fill: ${COLOR_MAP.RED.BASE};
  }
`;

export const PurpleInfoIcon = styled(MuiInfoIcon)`
  align-self: flex-start;
  path {
    fill: ${COLOR_MAP.PURPLE};
  }
`;
