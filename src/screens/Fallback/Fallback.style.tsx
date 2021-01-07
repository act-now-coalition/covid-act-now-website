import styled from 'styled-components';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  margin: 8rem auto 0;
`;

export const CircularProgress = styled(MuiCircularProgress)`
  color: ${COLOR_MAP.GREEN.BASE};
  margin-top: 1.25rem;
`;
