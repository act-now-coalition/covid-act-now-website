import styled from 'styled-components';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';

const mapWidth = 300;
const mapHeight = 280;
const tabHeight = 70;
const selectedTabBorder = 3;
const selectedTabColor = '#00BFEA';

export const Container = styled.div<{ mobileMenuOpen: boolean }>`
  display: ${props => (props.mobileMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: calc(85px + 65px);
  bottom: 0;
  right: 0;
  width: 100%;
  height: inherit;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 321px) {
    z-index: 901;
    width: ${mapWidth}px;
    height: calc(${mapHeight}px + ${tabHeight}px);
    right: 16px;
  }

  @media (min-width: 700px) {
    top: calc(85px + 65px + 16px);
  }

  @media (min-width: 1350px) {
    display: flex;
    top: 94px;
  }
`;

export const Tabs = styled.div`
  flex-grow: 0;
  height: ${tabHeight}px;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  border-bottom: 1px solid ${palette.lightGray};
`;

export const TabItem = styled.div<{ selected?: boolean }>`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  line-height: ${tabHeight}px;
  border-bottom: ${props =>
    props.selected
      ? `solid ${selectedTabBorder}px ${selectedTabColor}`
      : 'none'};
  cursor: pointer;
  color: ${props =>
    props.selected ? palette.black : `${COLOR_MAP.GRAY_BODY_COPY}`};
`;

export const MapContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// The default aspect-ratio for the state and US maps is 800x600, so we
// can use the width to calculate the height of the map container, which
// makes it possible to center it vertically.
export const StateMapContainer = styled.div`
  width: ${mapWidth}px;
  height: ${0.75 * mapWidth}px;
`;
