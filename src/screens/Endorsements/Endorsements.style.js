import styled from 'styled-components';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  background-color: #f2f2f2;
  padding: 0;
  padding: 24px;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  h1,
  h5,
  p {
    margin-bottom: 24px;
  }
`;

export const Quote = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 24px 12px 24px 0;
  padding: 24px;
  display: flex;
  svg {
    width: 48px;
    height: 48px;
    transform: rotate(180deg);
    margin-right: 8px;
    position: relative;
    top: -8px;
    &:after {
      content: '|';
      color: red;
    }
  }
  p {
    margin: 0;
  }
`;

export const EndorsersWrapper = styled(GridList)`
  width: 900px;
`;

export const MorsEndorsement = styled(Typography)`
  height: 284px;
  background-color: white;
  border-radius: 4px;
  margin: 12px 12px 0 0;
  padding: 28px;
  color: #546e7a;
`;
