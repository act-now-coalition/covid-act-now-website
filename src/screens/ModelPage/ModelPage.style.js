import styled from 'styled-components';

export const Wrapper = styled.div`
`;

export const ContentWrapper = styled.div`
`;

export const MainContentWrapper = styled.div`
    margin-top: 85px;
`;

export const MainContentInner = styled.div`
  margin: 0;
`;

export const MainContentInnerBody = styled.div`
  margin: 0;
  
  @media (min-width: 900px) {
      max-width: 900px;
      margin: 0 auto;
  }
  
  @media (min-width: 1350px) {
    margin: 0 500px 0 auto;
  }
  
  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const SearchHeaderWrapper = styled.div`
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  z-index: 900;
  border-bottom: 1px solid #e3e3e3;
`;

export const CountyMapAltWrapper = styled.div`
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

export const MapContentWrapper = styled.div`
  z-index: 900;
  display: none;
  flex: ${props => (props.mobileMenuOpen ? 1 : 0)};
  height: inherit;

  @media (min-width: 1350px) {
    display: block;
    background: white;
    position: fixed;
    border: 1px solid rgba(0,0,0,0.20);
    border-radius: 4px;
    top: 81px;
    right: 16px;
    height: 400px;
    width: 400px;
    padding: 0 1rem 1rem;
  }
`;

export const Content = styled.div`
    text-align: center;
    padding: 0 2rem;
    
    @media(min-width: 932px) {
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

export const ChartHeader = styled.div`
  max-width: 900px;
  padding: 0.5rem 2rem 1.5rem;
  text-align: left;

  @media (min-width: 600px) {
    text-align: center;
  }

  span {
    color: rgba(0, 0, 0, 0.7);
  }
`;
