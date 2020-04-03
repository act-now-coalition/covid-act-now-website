import styled from 'styled-components';
import palette from 'assets/theme/palette';

const maxNormalFooterWidth = 900;
const maxWideFooterWidth = 1100;
export const StyledFooter = styled.div.attrs(props => ({
  page: props.page,
  maxWidth:
    props.page === 'home' || props.page === 'endorsements'
      ? maxWideFooterWidth
      : maxNormalFooterWidth,
}))`
  max-width: ${props => props.maxWidth}px;
  padding: 2em;
  box-sizing: content-box;
  background: ${palette.black};
  color: ${palette.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 900px) {
    padding: 2rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  @media (min-width: ${props => props.maxWidth + 64}px) {
    padding: 2rem calc((100% - ${props => props.maxWidth}px) / 2);
  }

  @media (min-width: 1350px) {
    padding-right: ${props =>
      props.page === 'map' ? '445px' : `calc(100% - ${props.maxWidth}px)`};
    padding-left: ${props =>
      props.page === 'map'
        ? `calc(100% - 445px - ${props.maxWidth}px)`
        : `calc(100% - ${props.maxWidth}px)`};
  }

  @media (min-width: 1750px) {
    padding: 2rem calc((100% - ${props => props.maxWidth}px) / 2);
  }

  img {
    height: 32px;
    align-self: flex-start;
  }
`;

export const StyledFooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 900px) {
    align-items: flex-start;
  }
`;

export const StyledFooterBodyNav = styled.div`
  text-align: center;
  padding: 2rem 0 1rem;
  padding-bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    text-align: left;
    flex-direction: row;
    padding-top: 0.5rem;
  }

  > span {
    cursor: pointer;
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;

    @media (min-width: 900px) {
      margin-bottom: 0;
      margin-right: 1em;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const StyledFooterActions = styled.div`
  display: flex;
  @media (min-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledFooterBodyLinks = styled.div`
  display: flex;
  text-align: center;

  * {
    margin: 0 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  span,
  a {
    text-decoration: underline;
    color: white;
    cursor: pointer;

    @media (min-width: 900px) {
      font-size: 0.875rem;
    }
  }
`;

const buttonHeight = 56;
export const StyledFooterBodyButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${buttonHeight}px;
  border-radius: ${buttonHeight / 2}px;
  border: 1px solid white;
  background: white;
  padding: 0 1rem;

  margin-top: 1rem;
  margin-bottom: 2rem;

  text-decoration: none;
  color: black;
  font-weight: bold;

  &.footer__narrow-screen-only {
    margin-top: 2rem;
    margin-bottom: 0;

    @media (min-width: 900px) {
      display: none;
    }
  }

  &.footer__wide-screen-only {
    display: none;
    @media (min-width: 900px) {
      display: flex;
    }
  }

  @media (min-width: 900px) {
    margin-top: 0rem;
    margin-bottom: 2em;
  }
`;

export const StyledFooterDivider = styled.div`
  max-height: 1px;
  height: 1px;
  width: 2rem;
  background: rgba(255, 255, 255, 0.32);
  margin: 2rem 0;
`;
