import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const TeamTableGrid = styled.div`
  column-count: 1;
  display: inline-block;

  @media (min-width: 600px) {
    column-count: 2;
  }
`;

export const TeamMember = styled.div`
  display: flex;
  margin: 0;
  margin-bottom: 1rem;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: column;
    break-inside: avoid-column;
  }
`;

export const TeamMemberCell = styled(Typography)<{
  variant: String;
  component: String;
}>``;
