import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import { Link } from 'react-router-dom';
import theme from 'assets/theme';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

const SharedButtonStyles = css`
  font-size: 1rem;
  text-transform: none;
  text-decoration: none;
  color: inherit;
  padding: ${0.5 * theme.spacing(1)}px ${theme.spacing(2)};
`;

export const GreenButton = styled(MuiButton)`
  ${SharedButtonStyles};
  color: white;
  background-color: ${COLOR_MAP.GREEN.BASE};
  border: 1px solid ${COLOR_MAP.GREEN.BASE};

  &:hover {
    background-color: white;
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const WhiteButton = styled(MuiButton)`
  ${SharedButtonStyles};
  color: ${COLOR_MAP.GREEN.BASE};
  border: 1px solid ${COLOR_MAP.GRAY_EXPLORE_CHART};

  &:hover {
    background-color: ${COLOR_MAP.GRAY.LIGHT};
  }
`;
