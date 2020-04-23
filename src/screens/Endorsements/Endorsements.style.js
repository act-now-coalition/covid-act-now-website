import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { COLORS } from 'enums';

export const Wrapper = styled.div`
  margin: 0 -32px;
  padding: 1rem;
`;

export const Content = styled.div`
  margin: auto;
  max-width: 1140px;

  h1,
  h5,
  p {
    margin-bottom: 24px;
  }
`;

export const EndorsersWrapper = styled(Grid)``;
