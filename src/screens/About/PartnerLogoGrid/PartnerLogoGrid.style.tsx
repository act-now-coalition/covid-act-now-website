import styled from 'styled-components';

export const LogoGrid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 -0.5rem 1.5rem;
  > a {
    flex: 1;
    margin: 0 0.5rem 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;
    > a {
      margin-bottom: 0;
    }
  }
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 300px;

  @media (max-width: 600px) {
    display: block;
    margin: 0 auto;
    float: none;
    width: 100%;
  }
`;
