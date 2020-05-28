import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import palette from 'assets/theme/palette';
import { COLORS } from 'common';

export const StyledLocationPageHeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.bgColor || COLORS.LIGHTGRAY};
  padding: ${props => (props.condensed ? '1.5rem 1.4rem 0.2rem' : '0 1rem')};
  margin: 0;
  @media (min-width: 600px) {
    border-bottom: 1px solid #e3e3e3;
    align-items: center;
    flex-direction: row;
  }
  @media (min-width: 932px) {
    padding: 0;
  }
`;
