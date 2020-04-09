import styled from 'styled-components';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export const Wrapper = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  /* background-color: bisque; */
`;

export const Profile = styled(Card)`
  padding: 12px 12px 0;
  box-shadow: none;
  margin: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 960px) {
    min-height: 305px;
  }
`;

export const ProfileHeader = styled(CardHeader)`
  cursor: pointer;
`;

export const Credential = styled(Typography)<{ component?: string }>`
  margin: 0 0 12px !important;
  padding: 0;
  font-size: 0.9rem;
`;

export const Left = styled.div``;

export const Quote = styled.div`
  background-color: white;
  max-width: 650px;
  margin: 0;
  border-radius: 0 10px 0 0;
  color: #546e7a;
  padding: 24px;

  p {
    font-size: 13px;
  }

  @media (min-width: 600px) {
    min-height: 305px;
  }
`;
