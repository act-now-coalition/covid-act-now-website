import styled from 'styled-components';

export const ChartContentWrapper = styled.div`
  margin-top: 85px;
  @media (min-width: 1350px) {
    margin-top: 97px;
  }
`;

export const MainContentInner = styled.div`
  margin: 0;

  @media (min-width: 900px) {
    max-width: 900px;
    margin: 0 auto;
  }

  @media (min-width: 1350px) {
    margin: 0 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
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
