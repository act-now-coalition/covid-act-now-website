import styled, { css } from 'styled-components';
import { Paper, TextField } from '@material-ui/core';
import COLORS, { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

const maxMenuHeight = 240;
const desktopWidth = 732;
const mobileWidth = 350;

export const StyledTextField = styled(TextField).attrs(props => ({
  variant: 'outlined',
}))<{ $isOpen: boolean }>`
  background-color: ${({ $isOpen }) => !$isOpen && COLORS.LIGHTGRAY};
  transition: box-shadow 0.1s ease-in-out, background-color 0.1s ease-in-out;

  &:hover {
    background-color: transparent;
    box-shadow: ${({ $isOpen }) =>
      !$isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
  }
  &:focus {
    box-shadow: none;
  }
`;

export const Wrapper = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => (isOpen ? MobileWrapperOpened : MobileWrapperClosed)};

  @media (min-width: ${materialSMBreakpoint}) {
    width: ${desktopWidth}px;
    padding: 1.5rem 1.5rem 0;

    position: relative;
    height: unset;
    box-shadow: ${({ isOpen }) => isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
    border-radius: ${({ isOpen }) => (isOpen ? '4px 4px 0 0' : '4px')};
  }
`;

export const SearchBarIcon = styled(SearchIcon)`
  margin-right: 0.75rem;
  margin-left: 0.5rem;
`;

const MobileWrapperOpened = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: 10000;

  padding: 1.5rem 0.5rem 0;
  padding: 0.75rem 0.5rem 1.5rem;
  padding: 1.5rem;
`;

const MobileWrapperClosed = css`
  width: ${mobileWidth}px;
  position: relative;
  height: unset;
  padding: 0.75rem 0.5rem 1.5rem;
`;

export const MobileSearchDirections = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-bottom: 1.25rem;
  font-size: 1rem;
  line-height: 1.4;

  span {
    position: relative;
    width: 100%;
    text-align: center;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    display: none;
  }
`;

export const BackArrowIcon = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  color: black;
  font-size: 1.5rem;
`;

export const DesktopSearchDirections = styled.span`
  display: none;
  @media (min-width: ${materialSMBreakpoint}) {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    display: flex;
    justify-content: center;
    margin: 0.25rem 0 0.75rem;
    height: 24px;

    font-size: 1rem;
    margin: 0.75rem 0 0.75rem;
  }
`;

export const ListContainer = styled.ul`
  padding: 0 1.25rem 0;
  // max-height: ${maxMenuHeight}px;

  li {
    padding: 0;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0 1.75rem 0;
    max-height: ${maxMenuHeight}px;
  }
`;

export const StyledPaper = styled(Paper)`
  // box-shadow: 0px 26px 24px rgba(0, 0, 0, 0.12);
  width: ${mobileWidth}px;
  border-radius: 0 0 4px 4px;
  box-shadow: none;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    max-height: ${maxMenuHeight}px;
    width: ${desktopWidth}px;
    box-shadow: 0px 26px 24px rgba(0, 0, 0, 0.12);
  }
`;
