import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Content = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
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

  @media (max-width: 600px) {
    padding-right: 16px;
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 3rem 0;
  padding: 1rem 0.5rem;
  background-color: rgba(242, 242, 242);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ShareInstruction = styled.div`
  font-size: 1.5rem;
  padding-right: 32px;

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0 0 8px;
  }
`;

export const ShareButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  margin: 2rem auto;
  text-align: left;

  @media (min-width: 600px) {
    text-align: center;
  }

  span {
    color: rgba(0, 0, 0, 0.7);
  }
`;
