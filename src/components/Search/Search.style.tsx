import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { COLOR_MAP } from 'common/colors';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

// Note (chelsi): These random 1px margins solve an alignment bug that I cannot figure out otherwise :)
export const StyledPaper = styled(Paper)`
  border-radius: 0;
  margin: 0 -1px 0 1px;
  box-shadow: none;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-top: none;
`;

export const IconWrapper = styled.div`
  margin-right: 0.75rem;
`;

export const SearchBarIcon = styled(SearchIcon)`
  margin: 0 0.75rem;
`;
