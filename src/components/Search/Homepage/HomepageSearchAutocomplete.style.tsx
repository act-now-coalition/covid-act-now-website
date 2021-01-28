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

  &:focus {
    box-shadow: none;
  }
`;

export const Wrapper = styled.div<{ isOpen: boolean }>`
  box-shadow: ${({ isOpen }) => isOpen && '0px 2px 24px rgba(0, 0, 0, 0.12)'};
  padding: 1.5rem 0.5rem;
  border-radius: 4px;
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
  font-size: 0.9rem;
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

/**
 * The :before is a hack to hide the top of the Paper's box shadow
 * https://stackoverflow.com/questions/19428584/remove-box-shadow-from-only-top-of-div/19428912
 */
export const StyledPaper = styled(Paper)`
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
  width: ${mobileWidth}px;

  :before {
    content: '';
    height: 20px;
    width: ${mobileWidth}px;
    position: absolute;
    top: -16px;
    background: inherit;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    max-height: ${maxMenuHeight}px;
    width: ${desktopWidth}px;

    :before {
      height: 22px;
      width: ${desktopWidth}px;
    }
  }
`;
