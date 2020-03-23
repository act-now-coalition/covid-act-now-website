import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  background-color: #f2f2f2;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: 1000px;
  }
`;

export const Quote = styled.div`
  background-color: white;
  border-radius: 4px;
  margin: 24px 0 24px 0;
  padding: 24px;
  display: flex;
  svg {
    width: 28px;
    height: 28px;
    transform: rotate(180deg);
    margin-right: 8px;
    position: relative;
    top: -8px;
    &:after {
      content: '|';
      color: red;
    }
    @media (min-width: ${materialSMBreakpoint}) {
      width: 48px;
      height: 48px;
    }
  }
  p {
    margin: 0;
    font-size: 10%;
    font-size: 20px;
    @media (min-width: ${materialSMBreakpoint}) {
      font-size: 30px;
    }
  }
`;

export const EndorsersWrapper = styled(Grid)`
`;
