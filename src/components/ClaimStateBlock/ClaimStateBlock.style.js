import styled from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const ClaimStateWrapper = styled.div`
  text-align: left;
  padding: 3.5rem 1rem;
  margin-top: 3rem;

  @media (min-width: 600px) {
    padding: 3.5rem 1rem;
  }

  @media print {
    display: none;
  }
`;

export const ClaimStateContainer = styled.div`
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1350px) {
    max-width: 900px;
    margin: 0 445px 0 auto;
    position: relative;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const ClaimStateText = styled.div`
  flex: 1;

  @media (min-width: 600px) {
    margin-right: 1rem;
  }
`;

export const ClaimStateHeader = styled(Typography)`
  margin-top: 0;
  margin-bottom: 0;
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
  background-color: ${palette.white};
  color: ${palette.info.main};
  border: 1px solid ${palette.info.main};
  text-decoration: none !important;
  text-transform: none;
  margin: 1rem auto 0;
  text-align: center;
  font-weight: 700;

  &:hover {
    background-color: ${palette.info.main};
    color: ${palette.white};
  }
`;
