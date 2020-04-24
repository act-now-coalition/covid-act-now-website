import styled from 'styled-components';

export const MainContentWrapper = styled.div`
  margin-top: 85px;

  @media (min-width: 1350px) {
    margin-top: 97px;
  }
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
    margin: 0 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;
