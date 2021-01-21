import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Skeleton } from '@material-ui/lab';

export const CircleIcon = styled(FiberManualRecordIcon)<{ $iconColor: string }>`
  color: ${({ $iconColor }) => $iconColor};
  font-size: 1rem;
`;

export const CopyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  font-size: 1rem;
  margin-left: auto;
`;

export const LevelDescription = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 14px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const SharedWrapperStyles = css`
  display: flex;
  align-items: center;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  max-width: 330px;
  width: 100%;
  padding: 1.25rem 1.75rem 1.25rem 1.25rem;
  border-radius: 4px;
`;

export const Wrapper = styled.div`
  ${SharedWrapperStyles};
  cursor: pointer;

  :hover {
    box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
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
  height: 14,
  animation: 'wave',
}))`
  border-radius: 0;

  &:first-of-type {
    width: 210px;
  }
  &:last-of-type {
    width: 75px;
  }
`;
