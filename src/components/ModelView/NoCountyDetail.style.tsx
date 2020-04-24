import styled from 'styled-components';

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
