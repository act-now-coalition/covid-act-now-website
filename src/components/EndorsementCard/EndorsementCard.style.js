import styled from 'styled-components';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import sizes from 'assets/theme/sizes';


const mobileBreakpoint = '600px'

export const Wrapper = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  /* background-color: bisque; */
  padding: 0;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 16px;
  }
`;

export const Profile = styled(Card)`
  padding: 12px 12px 0;
  box-shadow: none;
  margin: 0;
  width: 100%;

  @media (min-width: ${mobileBreakpoint}) {
    min-height: 305px;
  }
`;

export const ProfileHeader = styled(CardHeader)`
  cursor: pointer;
  font-weight: bold;

  & span {
    font-weight: bold;
  }
`;

export const Credential = styled(Typography)`
  margin: 0 0 12px !important;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

export const Left = styled.div`
`;

export const Quote = styled.div`
  background-color: white;
  max-width: 650px;
  margin: 0;
  border-radius: 0 10px 0 0;
  color: #546e7a;

  p {
    font-size: 13px
  }

  &::before, &::after {
    content: '"';
    display: inline;
  }
`;
