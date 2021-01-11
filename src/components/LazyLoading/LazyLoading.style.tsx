import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Skeleton } from '@material-ui/lab';

const Copy = css`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
`;

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    ${Copy};
    color: ${COLOR_MAP.BLUE};
  }
`;

export const Message = styled.p`
  ${Copy};
  margin: 8rem auto 0;
`;

export const StyledSkeletonLine = styled(Skeleton).attrs(props => ({
  width: 800,
  height: 35,
  animation: 'wave',
}))`
  max-width: 90%;

  &:first-of-type {
    margin-top: 3rem;
  }
`;

export const StyledSkeletonRect = styled(Skeleton).attrs(props => ({
  width: 800,
  height: 175,
  animation: 'wave',
}))`
  max-width: 90%;
`;
