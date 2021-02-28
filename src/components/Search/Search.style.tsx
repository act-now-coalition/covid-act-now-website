import styled from 'styled-components';
import { Link } from 'common/utils/router';
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

export const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  strong {
    font-weight: 600;
  }

  span {
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.75rem;
`;

export const LocationName = styled.p`
  margin: 0;
`;

export const Zipcode = styled.span`
  font-style: italic;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;
