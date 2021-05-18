import styled, { css } from 'styled-components';
import { Paper, TextField } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import SearchIcon from '@material-ui/icons/Search';
import MuiCloseIcon from '@material-ui/icons/Close';

const maxMenuHeight = 240;
const desktopWidth = 400;
export const mobileWidth = 350;

export const StyledTextField = styled(TextField).attrs(props => ({
  variant: 'outlined',
}))<{ $isOpen: boolean }>`
  transition: box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out;
  margin-right: ${({ $isOpen }) => $isOpen && '1rem'};

  &:hover {
    background-color: transparent;
    box-shadow: ${({ $isOpen }) => !$isOpen && '0 0 6px rgba(0, 0, 0, 0.12)'};
  }

  &:focus {
    box-shadow: none;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 0;
    margin-right: 0;
  }
`;

export const CloseIcon = styled(MuiCloseIcon)<{ $showIcon: boolean }>`
  color: black;
  font-size: 1.5rem;
  z-index: 10005;
  cursor: pointer;
  display: ${({ $showIcon }) => !$showIcon && 'none'};
`;

const MobileWrapperOpened = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10000;
  padding: 1rem 1.25rem;
  background-color: white;
  touch-action: none;
`;

const MobileWrapperClosed = css`
  position: relative;
  height: unset;
  width: ${props => props.theme.searchbar.mobileClosedWidth};
  padding: ${props => props.theme.searchbar.mobileClosedPadding};
  max-width: ${props => props.theme.searchbar.mobileClosedMaxWidth};
  margin-left: ${props => props.theme.searchbar.mobileClosedMarginLeft};
`;

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  ${({ $isOpen }) => ($isOpen ? MobileWrapperOpened : MobileWrapperClosed)};

  @media (min-width: ${materialSMBreakpoint}) {
    box-shadow: ${({ $isOpen }) =>
      $isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
    border-radius: ${({ $isOpen }) => ($isOpen ? '4px 4px 0 0' : '4px')};
    position: relative;
    width: ${desktopWidth}px;
    height: unset;
    padding: 1rem 1.25rem;
    margin: auto;
    max-width: unset;
  }
`;

export const SearchBarIcon = styled(SearchIcon)`
  margin-right: -1.25rem; // we dont like a negative margin, but for now its fine
  margin-left: 0.5rem;
  height: calc(100% - 14px);
  width: 36px;
  padding-left: 0.75rem;
  border-left: 1px solid ${COLOR_MAP.GREY_1};
`;

export const ListContainer = styled.ul`
  padding: 0 1.25rem 0;
  max-height: 70vh;

  li {
    padding: 0;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0 1rem 0;
    max-height: ${maxMenuHeight}px;
  }
`;

export const StyledPaper = styled(Paper)`
  width: ${mobileWidth}px;
  width: 100%;
  border-radius: 0;
  box-shadow: 0px 26px 24px rgba(0, 0, 0, 0.12);

  @media (min-width: ${materialSMBreakpoint}) {
    border-radius: 0 0 4px 4px;
    max-height: ${maxMenuHeight}px;
    width: ${desktopWidth}px;
    margin: 0;
  }
`;
