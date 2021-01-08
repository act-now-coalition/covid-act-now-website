import styled, { css } from 'styled-components';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { COLOR_MAP } from 'common/colors';

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

export const CircularProgress = styled(MuiCircularProgress)`
  color: ${COLOR_MAP.GREEN.BASE};
  margin-top: 1.25rem;
`;
