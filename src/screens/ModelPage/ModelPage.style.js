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
