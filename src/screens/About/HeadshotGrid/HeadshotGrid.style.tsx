import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Grid = styled.div`
  display: flex;
  margin: 0 -1rem 1.5rem;
  flex-wrap: wrap;
`;

export const HeadshotGrid2Up = styled.div`
  display: flex;
  margin: 0 -1rem;
  flex-wrap: wrap;

  > div {
    padding: 0 1rem;
    width: 100%;
  }

  @media (min-width: 600px) {
    > div {
      width: 50%;
    }
  }
`;

export const TeamMember = styled.div`
  padding: 0 1rem;
  width: 50%;

  img {
    max-width: 100%;
  }

  @media (min-width: 600px) {
    width: auto;
    flex: 1;
  }
`;

export const TeamMemberName = styled(Typography)`
  font-weight: 700;
  line-height: 1.125rem;
  margin: 0 0 0.25rem;
  padding: 0;
`;

export const TeamMemberRole = styled(Typography)`
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
  line-height: 1.125rem;
  padding: 0;
`;

export const TeamMemberTitle = styled(Typography)`
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
  line-height: 1.125rem;
  padding: 0;
  color: rgba(0, 0, 0, 0.7);
`;
