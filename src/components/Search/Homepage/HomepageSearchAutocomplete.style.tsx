import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Paper, Popper, TextField } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';

const inputMargin = '1.5rem';

export const OldWrapper = styled.div`
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
  background: #c4c4c4;
`;

export const StyledPopper = styled(Popper).attrs(props => ({
  // placement: 'top',
}))`
  // box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
  background-color: red;
  left: -1.5rem;
`;

export const StyledTextField = styled(TextField).attrs(props => ({
  variant: 'outlined',
  placeholder: 'Search by state, metro, county, or zip',
}))``;

export const Wrapper = styled.div<{ isOpen: boolean }>`
  box-shadow: ${({ isOpen }) => isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
  padding: 1.5rem;
  border-radius: 4px;

  position: relative;
  min-width: 300px;
  width: 100%;

  @media (min-width: ${mobileBreakpoint}) {
    max-width: 325px;
    margin-left: 0;
    margin-right: 0;
  }
`;
