import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

export const Wrapper = styled(Box)`
  max-width: 700px;
  width: 100%;
  margin: 80px auto 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 1.2rem;

  @media (min-width: 600px) {
    align-items: center;
    margin: 100px auto 125px;
    min-height: 50vh;
  }
`;

export const Header = styled(Typography)`
  ${props => props.theme.fonts.regularBookBold};
  font-size: 2rem;
  margin-bottom: 2.5rem;
  line-height: 1.2;
`;

export const BodyCopy = styled(Typography)`
  ${props => props.theme.fonts.regularBook};
  font-size: 1.1rem;
  margin-bottom: 1.75rem;
  line-height: 1.4;
`;
