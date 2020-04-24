import styled from 'styled-components';

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div``;

export const SearchHeaderWrapper = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 900;
  border-bottom: 1px solid #e3e3e3;
  border-top: 1px solid #e3e3e3;
`;

export const MapWrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 100%;
`;

export const CountyMapAltWrapper = styled.div`
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

export const StyledNoResultsWrapper = styled.div`
  margin: 85px auto 0;
  height: calc(100vh - 85px - 85px - 273px);
  max-width: 900px;
  padding: 1rem 2rem;

  @media (min-width: 1350px) {
    padding: 2rem 0 0;
    width: 900px;
    margin: 97px 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 97px auto 0;
  }
`;

export const StyledNoResults = styled.div`
  padding: 16px;
  font-weight: 600;
  font-size: 1rem;
  justify-content: center;
  color: rgba(232, 0, 0, 1);
  background: rgba(232, 0, 0, 0.1);
  border: 1px solid rgba(232, 0, 0, 0.1);
  margin-top: 1rem;
  border-radius: 4px;

  span {
    cursor: pointer;
    margin-top: 1rem;
    text-decoration: underline;
  }
`;

export const MapContentWrapper = styled.div`
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

export const Content = styled.div`
  text-align: center;
  padding: 0 1rem;

  @media (min-width: 932px) {
    padding: 0;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 90vh;
`;

export const ChartHeader = styled.div`
  max-width: 900px;
  padding: 1.5rem 0;
  text-align: left;

  span {
    color: rgba(0, 0, 0, 0.7);
  }

  h2 {
    font-weight: 700;
  }

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;
