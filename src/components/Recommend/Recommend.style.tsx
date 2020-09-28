import styled from 'styled-components';

/*
TODO (chelsi): these breakpoints and margins are the same as
the location header and compare. we should centralize them.
*/
export const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 1rem auto;

  @media (min-width: 600px) {
    margin: 3rem auto;
  }

  @media (min-width: 1060px) {
    margin: 3rem auto 2rem;
  }

  @media (min-width: 1350px) {
    margin: 3rem 445px 2rem auto;
  }

  @media (min-width: 1750px) {
    margin: 3rem auto 2rem;
  }
`;

export const Header = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  padding: 0.75rem 1rem;
`;
