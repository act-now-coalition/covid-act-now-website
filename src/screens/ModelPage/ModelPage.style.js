import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Content = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 2rem;
  margin: auto;
  @media (min-width: 900px) {
    padding: 0;
  }
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
  margin-bottom: 2rem;
  margin-top: 2rem;
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
  height: 25vh;
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

export const StyledCountySelectorWrapper = styled.div`
  display: flex;
  width: 100%;
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
