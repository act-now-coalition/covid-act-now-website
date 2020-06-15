import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const TeamTableGrid = styled.div<{
  isTeam?: Boolean;
}>`
  column-count: 1;
  display: inline-block;

  @media (min-width: 600px) {
    column-count: 2;
  }
`;

export const TeamMember = styled.div<{
  isTeam?: Boolean;
  isAdditionalAdvisors?: Boolean;
}>`
  display: flex;
  margin: 0;
  flex-direction: row;

  @media (min-width: 600px) {
    flex-direction: column;
    break-inside: avoid-column;
    margin-bottom: ${({ isAdditionalAdvisors }) =>
      isAdditionalAdvisors && '0.5rem'};
  }
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
