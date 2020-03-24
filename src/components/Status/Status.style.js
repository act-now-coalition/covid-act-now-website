import Box from '@material-ui/core/Box';
import styled from 'styled-components';

export const StatusWrapper = styled(Box)`
  border-radius: 3px;
  padding: 8px 5px;
  background-color: ${props => props.color};
  min-width: 300px;
  width: 20%;
  margin: 0 auto 20px;
`;
