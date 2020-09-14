import styled from 'styled-components';

export const Logo = styled.img`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

export const StyledPressLogoGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
  position: relative;
  flex-wrap: wrap;

  > div {
    flex: 1;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 900px) {
    > div {
      margin-bottom: 0;
    }
  }
`;

export const LogoWrapper = styled.div`
  text-align: center;

  &:first-child {
    height: 4.75rem;
    margin-right: 2rem;

    > img {
      float: right;
      margin: 0;
    }
  }

  &:last-child {
    margin-left: 2rem;
    height: 3rem;

    > img {
      float: left;
      margin: 0;
    }
  }

  > img {
    object-fit: contain;
    width: auto;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 899px) {
    min-width: 34%;
    width: 100%;
    margin-top: 2rem;

    &:nth-child(2) {
      order: 3;
      max-width: 20rem;
      margin: 2rem auto 0;
    }

    &:nth-child(3) {
      order: 2;
    }
  }
`;
