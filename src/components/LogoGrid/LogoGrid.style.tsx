import styled from 'styled-components';

export const StyledPartnerLogoGrid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 -0.5rem 1.5rem;
  position: relative;

  > a {
    flex: 1;
    margin: 0 0.5rem 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 900px) {
    flex-direction: row;

    > a {
      margin-bottom: 0;
    }
  }
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 300px;

  @media (max-width: 900px) {
    display: block;
    margin: 0 auto;
    float: none;
    width: 100%;
  }
`;

export const StyledPressLogoGrid = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -0.5rem 1.5rem;
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
    margin-right: 2.0rem;

    > img {
      float: right;
      margin: 0;
    }
  }

  &:last-child {
    margin-left: 2.0rem;
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
    height: 100%;
  }

  @media (max-width: 899px) {
    min-width: 40%;
    margin-top: 1.5rem;

    &:nth-child(2) {
      order: 3;
    }

    &:nth-child(3) {
      order: 2;
    }
  }
`;
