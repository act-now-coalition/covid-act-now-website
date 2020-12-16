import styled from 'styled-components';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled.div`
  margin: 0;
  padding: 1rem;
  background-color: white;
  @media (min-width: 1350px) {
    padding: 1rem 0 calc(1rem + 1px) 0; /* The extra pixel aligns the bottom border with the adjacent map box */
    background-color: #f2f2f2;
  }

  @media print {
    display: none;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
`;

export const SelectorWrapper = styled.div<{ isNarrowMobile: Boolean }>`
  flex: 1;
  margin-right: 0;
  position: ${props => (props.isNarrowMobile ? 'static' : 'relative')};

  > div {
    margin: 0 auto;

    @media (min-width: 1350px) {
      max-width: 1000px;
      margin: 0 350px 0 auto;
      position: relative;
    }

    @media (min-width: 1750px) {
      margin: 0 auto;
    }
  }
`;

export const MapToggle = styled.div<{
  isActive: boolean;
  hideMapToggle: boolean;
}>`
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 0 15px;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-left: 1rem;
  color: ${props => (props.isActive ? 'white' : palette.secondary.main)};
  background: ${props =>
    props.isActive ? palette.secondary.main : 'transparent'};
  display: ${({ hideMapToggle }) => hideMapToggle && 'none'};
  svg path {
    fill: ${props => (props.isActive ? 'white' : palette.secondary.main)};
  }
`;

export const MenuBarWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const SearchHeaderWrapper = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 900;
  border-bottom: 1px solid #e3e3e3;
  border-top: 1px solid #e3e3e3;

  @media print {
    display: none;
  }
`;
