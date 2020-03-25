import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
`;

export const StyledContactLink = styled(Typography)`
  margin: 0 0 1.5rem;
`;
