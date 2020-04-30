import styled from 'styled-components';
import palette from 'assets/theme/palette';

export const MapWrapper = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 100%;
`;

export const CountyMapAltWrapper = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 100%;
`;

export const MapContentInner = styled.div`
  .Map {
    width: 100%;
  }

  border-top: 1px solid #e3e3e3;
  padding-top: 1rem;
  margin-top: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;

  @media (min-width: 1200px) {
    display: flex;
    height: inherit;
    align-items: flex-start;
  }
`;

export const MapContentWrapper = styled.div<{ mobileMenuOpen: boolean }>`
  z-index: 800;
  display: ${props => (props.mobileMenuOpen ? 'block' : 'none')};
  height: inherit;
  position: fixed;
  top: calc(85px + 65px);
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 0 1rem 1rem;

  @media (min-width: 700px) {
    z-index: 901;
    border: 1px solid rgba(0, 0, 0, 0.12);
    width: 400px;
    height: 400px;
    top: calc(85px + 65px + 16px);
    right: 16px;
    left: auto;
    bottom: auto;
    border-radius: 4px;
  }

  @media (min-width: 1350px) {
    display: block;
    top: 81px;
    right: 16px;
    height: 400px;
    left: auto;
    bottom: auto;
    width: 400px;
    padding: 0 1rem 1rem;
  }
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
