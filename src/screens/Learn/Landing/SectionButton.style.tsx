import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import { ButtonTheme } from './SectionButton';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

const SharedButtonStyles = css`
  font-size: 1rem;
  text-transform: none;
  text-decoration: none;
  color: inherit;
`;

export const GreenButton = styled(MuiButton)<{ theme: ButtonTheme }>`
  ${SharedButtonStyles};
  color: white;
  background-color: ${COLOR_MAP.GREEN.BASE};
  border: 1px solid ${COLOR_MAP.GREEN.BASE};

  &:hover {
    background-color: white;
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const WhiteButton = styled(MuiButton)<{ theme: ButtonTheme }>`
  ${SharedButtonStyles};
  color: ${COLOR_MAP.GREEN.BASE};
  border: 1px solid ${COLOR_MAP.GRAY_EXPLORE_CHART};

  &:hover {
    background-color: ${COLOR_MAP.GRAY.LIGHT};
  }
`;
