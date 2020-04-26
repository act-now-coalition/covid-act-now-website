import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const TeamTable = styled.div``;
export const TeamMember = styled.div`
  display: flex;
  margin: 0;
`;

export const TeamMemberCell = styled(Typography)<{
  variant: String;
  component: String;
}>`
  flex: 2;
  margin-bottom: 0.5rem !important;

  &:last-child {
    flex: 3;
  }
`;
