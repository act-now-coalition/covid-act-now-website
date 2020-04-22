import styled from 'styled-components';

import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';

export const ChartContainer = styled.section`
  width: 100%;
`;

export const DisclaimerWrapper = styled.div`
  display: flex;
  margin: 0 -0.75rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const Disclaimer = styled.div`
  background: ${palette.white};
  border: 1px solid ${palette.divider};
  padding: 1.5rem;
  border-radius: 4px;
  margin: 0 0.75rem 1.5rem;
  padding: 1rem;
  flex: 1;

  @media (max-width: 900px) {
    margin: 0 1rem 1.5rem;
  }
`;

export const DisclaimerHeader = styled(Typography)`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6rem;
  color: ${palette.black};
`;

export const DisclaimerBody = styled(Typography)``;