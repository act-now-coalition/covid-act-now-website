import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Typography } from '@material-ui/core';
import MuiCloseIcon from '@material-ui/icons/Close';

export const Wrapper = styled.div`
  background-color: white;
  max-width: 600px;
  margin: 50px;
  margin: 1.5rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  padding: 1rem;
  max-height: 90vh;

  @media (min-width: 600px) {
    padding: 1.5rem;
  }

  svg {
    margin-left: auto;
    display: flex;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
  padding: 0 2rem 0 0.5rem;
`;

export const Header = styled(Typography)`
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0.75rem;
`;

export const Subheader = styled(Typography)`
  font-family: Source Code Pro;
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY.DARK};
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

export const Question = styled(Typography)`
  font-weight: 500;
  line-height: 1.15;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
`;

export const Answer = styled(Typography)`
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    font-size: 1rem;
  }
`;

export const CloseIcon = styled(MuiCloseIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
`;
