import styled from 'styled-components';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

export const ProfileHeader = styled(CardHeader)`
  cursor: pointer;
`;

export const Credential = styled(Typography)`
  margin: 0 0 12px !important;
  padding: 0;
`;

export const Profile = styled(Card)`
  padding: 12px 12px 0;
  box-shadow: none;
  margin: 12px 12px 0 0;
  height: 284px;
`;
