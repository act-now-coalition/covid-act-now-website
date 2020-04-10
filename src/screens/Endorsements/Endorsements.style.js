import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { COLORS } from 'enums';

export const Wrapper = styled.div`
  background-color: ${COLORS.LIGHTGRAY};
  margin: -32px;
  padding: 1rem;
  min-height: calc(100vh - 64px);
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

export const QuoteContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 24px 12px;
  display: flex;
  flex-direction: column;
  padding: 24px 30px 24px 24px;
`;

export const Quote = styled.div`
  display: flex;
  flex-direction: row;
  svg {
    width: 28px;
    height: 28px;
    transform: rotate(180deg);
    margin-right: 8px;
    position: relative;
    top: -8px;
    &:after {
      content: '|';
      color: #00d07d;
    }
    @media (min-width: 600px) {
      width: 48px;
      height: 48px;
    }
  }
  p {
    margin: 0;
    font-size: 10%;
    font-size: 20px;
    @media (min-width: 600px) {
      font-size: 30px;
    }
  }
`;

export const EndorseLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;

  div {
    margin-right: 4px;
  }
`;

export const EndorsersWrapper = styled(Grid)``;
