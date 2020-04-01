import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 65px;
  right: 0;
  left: 0;
  bottom: 0;
  background: white;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
`;

export const MainContentInner = styled.div`
  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 900px;
  }
`;

export const MainContentWrapper = styled.div`
  flex: ${props => props.mobileMenuOpen ? 0 : 1 };
  height: inherit;
  overflow-y: auto;

  @media (min-width: 1200px) {
    flex: 1;
    padding: 2rem;
  }
`;

export const SearchHeaderWrapper = styled.div`
  border-bottom: 1px solid #e3e3e3;
`;

export const CountyMapAltWrapper = styled.div`
  width: 100%;
`;

export const MapContentInner = styled.div`
  .Map {
    width: 100%;
  }

  @media (min-width: 1200px) {
    display: flex;
    height: inherit;
    align-items: center;
  }
`;

export const MapContentWrapper = styled.div`
  flex: ${props => props.mobileMenuOpen ? 1 : 0 };
  background-color: #f2f2f2;
  height: inherit;
  overflow-y: auto;
  padding: ${props => props.mobileMenuOpen ? '1rem 0' : 0};

  @media (min-width: 1200px) {
    flex: 0 0 540px;
    padding: 1rem;
  }
`;

export const Content = styled.div`
  padding: 2rem;
`;

export const LoadingScreen = styled.div`
  min-height: 90vh;
`;

export const ShareSpacer = styled.div`
  padding-right: 32px;
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CountySelectorWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const ModelViewToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  margin: auto;
`;

export const ModelViewOption = styled.div`
  padding: 16px;
  background: ${props => (props.selected ? 'black' : 'white')};
  color: ${props => (props.selected ? 'white' : 'black')};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  width: 100%;
  cursor: pointer;
`;

export const NoData = styled.div`
  padding: 16px;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(232, 0, 0, 1);
  background: rgba(232, 0, 0, 0.1);
  border: 1px solid rgba(232, 0, 0, 0.1);
  margin-top: 1rem;
  border-radius: 4px;
`;

export const StyledCountySelectorWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
`;

export const MapIconButton = styled.div`
  margin-left: 10px;
  width: 54px;
  background: ${props => (props.showCountyMap ? 'black' : 'white')};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  & path {
    fill: ${props => (props.showCountyMap ? 'white' : 'black')};
  }
  &:hover {
  }
`;

export const CountyMapWrapper = styled.div`
  margin-top: 1rem;
  background: #f2f2f2;
  border-radius: 4px;
`;

export const ChartHeader = styled.div`
  max-width: 900px;
  padding: 1rem 2rem;
  text-align: left;

  @media (min-width: 600px) {
    text-align: center;
  }

  span {
    color: rgba(0, 0, 0, 0.7);
  }
`;
