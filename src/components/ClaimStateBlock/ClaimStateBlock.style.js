import styled from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const ClaimStateContainer = styled.div`
  text-align: left;
`;

export const ClaimStateHeader = styled(Typography)`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6rem;
  color: ${palette.black};
`;

export const ClaimStateBody = styled(Typography)``;

export const ClaimStateButtonWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const ClaimStateButton = styled(Button)`
  box-shadow: none;
  background-color: ${palette.secondary.main};
  color: ${palette.white};
  text-decoration: none !important;
  margin: 1rem auto 0;
  text-align: center;
  font-weight: 700;

  &:hover {
    background-color: ${palette.secondary.dark};
  }
`;
