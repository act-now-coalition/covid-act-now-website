import styled from 'styled-components';
import { Paper, TextField } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import SearchIcon from '@material-ui/icons/Search';

const maxMenuHeight = 240;
export const desktopWidth = 732;
export const mobileWidth = 350;

export const StyledTextField = styled(TextField).attrs(props => ({
  variant: 'outlined',
}))<{ $isOpen: boolean }>`
  &:hover {
    box-shadow: ${({ $isOpen }) =>
      !$isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
  }
  transition: box-shadow 0.1s ease-in-out;

  &:focus {
    box-shadow: none;
  }
`;

export const Wrapper = styled.div<{ isOpen: boolean }>`
  box-shadow: ${({ isOpen }) => isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
  border-radius: ${({ isOpen }) => (isOpen ? '4px 4px 0 0' : '4px')};
  padding: 1.5rem 0.5rem;
  position: relative;
  width: ${mobileWidth}px;

  @media (min-width: ${materialSMBreakpoint}) {
    width: ${desktopWidth}px;
    padding: 1.5rem;
  }
`;

export const SearchBarIcon = styled(SearchIcon)`
  margin-right: 0.75rem;
  margin-left: 0.5rem;
`;

export const SearchDirections = styled.span`
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 1rem;
    margin-top: 1.25rem;
  }
`;

export const ListContainer = styled.ul`
  padding: 0 1.75rem 0;
  max-height: ${maxMenuHeight}px;

  li {
    padding: 0;
  }
`;

// Note (chelsi) - need max height on mobile?
export const StyledPaper = styled(Paper)`
  box-shadow: 0px 26px 24px rgba(0, 0, 0, 0.12);
  width: ${mobileWidth}px;
  border-radius: 0 0 4px 4px;

  @media (min-width: ${materialSMBreakpoint}) {
    max-height: ${maxMenuHeight}px;
    width: ${desktopWidth}px;
  }
`;
