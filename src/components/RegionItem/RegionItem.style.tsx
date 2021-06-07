import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import COLORS, { COLOR_MAP } from 'common/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Skeleton } from '@material-ui/lab';
import { materialSMBreakpoint } from 'assets/theme/sizes';

const regionItemWidth = '296px';

export const CircleIcon = styled(FiberManualRecordIcon)<{ $iconColor: string }>`
  color: ${({ $iconColor }) => $iconColor};
  font-size: 1rem;
`;

export const CopyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

// The 0.5px margin-top is to get the dot to align to the center of the text :facepalm:
export const LevelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1rem;

  &:first-child {
    margin-top: 0.5px;
  }
`;

export const IconContainer = styled.div`
  flex: 0 0 auto;
  &:first-child {
    margin-right: 0.5rem;
  }
  &:last-child {
    margin-left: 1rem;
  }
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  font-size: 1rem;
  margin-left: auto;
`;

export const LevelDescription = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 14px;
  line-height: 150%;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 0.4rem;
`;

export const SharedWrapperStyles = css`
  display: flex;
  align-items: center;
  border: 1px solid ${COLORS.LIGHTGRAY};
  max-width: ${regionItemWidth};
  padding: 1rem 1.25rem 1rem 1.25rem;
  border-radius: 4px;

  @media (min-width: ${materialSMBreakpoint}) {
    width: ${regionItemWidth};
  }
`;

export const Wrapper = styled.div`
  ${SharedWrapperStyles};
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  :hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  }
`;

/* For loading state: */

export const SkeletonWrapper = styled.div`
  ${SharedWrapperStyles};
  height: 84px;

  ${ArrowIcon} {
    color: ${COLOR_MAP.GRAY_EXPLORE_CHART};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;

export const StyledSkeletonRect = styled(Skeleton).attrs(props => ({
  animation: 'wave',
}))`
  border-radius: 0;
`;
