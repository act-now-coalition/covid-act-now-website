import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { COLOR_MAP } from 'common/colors';

// Note (chelsi): These random 1px margins solve an alignment bug that I cannot figure out otherwise :)
export const StyledPaper = styled(Paper)`
  border-radius: 0;
  margin: 0 -1px 0 1px;
  box-shadow: none;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-top: none;
`;
