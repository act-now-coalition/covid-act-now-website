import styled from 'styled-components';
import palette from 'assets/theme/palette';

const BORDER_COLOR = 'rgba(0,0,0,0.12)';

export const Wrapper = styled.div`
  margin: 0;
  padding: 1rem;
  background-color: white;
  @media (min-width: 1350px) {
    padding: 1rem 0 calc(1rem + 1px) 0; /* The extra pixel aligns the bottom border with the adjacent map box */
    background-color: #f2f2f2;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
`;

export const SelectorWrapper = styled.div`
  flex: 1;
  margin-right: 0;

  > div {
    margin: 0 auto;

    @media (min-width: 1350px) {
      max-width: 900px;
      margin: 0 445px 0 auto;
    }

    @media (min-width: 1750px) {
      margin: 0 auto;
    }
  }
`;

export const MapToggle = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 0 15px;
  border: 1px solid ${BORDER_COLOR};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-left: 1rem;
  color: ${props => (props.isActive ? 'white' : palette.secondary.main)};
  background: ${props =>
    props.isActive ? palette.secondary.main : 'transparent'};

  svg path {
    fill: ${props => (props.isActive ? 'white' : palette.secondary.main)};
  }
`;

export const MenuBarWrapper = styled.div`
  display: flex;
`;

export const MapMenuMobileWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  background: #f2f2f2;
  border-radius: 4px;
  padding: 0.25rem;
  display: flex;
  align-items: stretch;
`;

export const MapMenuWrapper = styled.div`
  flex: 0 0 524px;
  background: #f2f2f2;
  border-radius: 4px;
  padding: 0.25rem;
  display: flex;
  align-items: stretch;
`;

export const MapMenuItem = styled.div<{ selected: boolean }>`
  flex: 1;
  height: inherit;
  font-weight: 600;
  color: ${props => (props.selected ? palette.secondary.main : 'inherit')};
  background: ${props => (props.selected ? 'white' : 'transparent')};
  box-shadow: ${props =>
    props.selected ? '0px 2px 2px rgba(0, 0, 0, 0.16)' : 'none'};
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
