import styled from 'styled-components';
import { Paper, TextField } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import SearchIcon from '@material-ui/icons/Search';

export const OldWrapper = styled.div`
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
  background: #c4c4c4;
`;

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
  padding: 1.5rem;
  border-radius: 4px;
  position: relative;
  min-width: 300px;
  width: 100%;

  @media (min-width: ${mobileBreakpoint}) {
    max-width: 670px;
  }
`;

export const SearchBarIcon = styled(SearchIcon)`
  margin-right: 0.75rem;
  margin-left: 0.5rem;
`;

export const SearchDirections = styled.span`
  font-size: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`;

export const ListContainer = styled.ul`
  padding: 0 1.75rem 0;

  li {
    padding: 0;
  }
`;

export const StyledPaper = styled(Paper)`
  box-shadow: -1px -24px white, 0px 2px 24px rgba(0, 0, 0, 0.12);
`;
