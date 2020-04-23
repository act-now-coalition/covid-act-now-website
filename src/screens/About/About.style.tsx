import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  h1,
  h5,
  p {
    margin-bottom: 24px;
  }
`;

export const Logo = styled.img`
  float: right;
  width: 400px;
  margin-left: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    display: block;
    margin: 0 auto 1rem;
    float: none;
  }
`;
