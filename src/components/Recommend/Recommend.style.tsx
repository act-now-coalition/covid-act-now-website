import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import ReactMarkdown from 'react-markdown';
import { FooterLinkStyles } from 'components/Compare/Compare.style';
import { LinkButton } from 'components/Button';

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

export const HeaderCopy = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
`;

export const Intro = styled.p`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  max-width: 600px;

  strong {
    color: black;
  }

  span {
    color: ${COLOR_MAP.BLUE};
    cursor: pointer;
  }
`;

export const RecommendationsContainer = styled.div`
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.25rem;

  @media (min-width: 600px) {
    padding: 0.75rem;
  }
`;

export const RecommendationWrapper = styled.div<{ index: number }>`
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;

  @media (min-width: 600px) {
    width: 50%;
    padding: ${({ index }) =>
      index % 2 ? '.5rem .5rem .5rem .8rem' : '.5rem .8rem .5rem .5rem'};
  }
`;

export const RecommendationBody = styled(ReactMarkdown)`
  p,
  ul,
  li {
    line-height: 1.4;
    margin: 0;
    color: ${COLOR_MAP.GRAY_BODY_COPY};
  }

  strong {
    color: black;
  }
`;

export const Icon = styled.img`
  margin-right: 1.25rem;
  min-width: 2rem;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;

  @media (min-width: 600px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const FooterHalf = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    flex-direction: column;
    margin-top: 1rem;
  }

  a {
    text-decoration: none;
  }

  @media (min-width: 600px) {
    align-items: flex-start;

    &:last-child {
      margin-top: 0;
    }
  }
`;

export const FooterLink = styled(LinkButton)`
  ${FooterLinkStyles}
  white-space: nowrap;

  @media (min-width: 600px) {
    &:last-child {
      margin-left: 1.5rem;
    }
  }
`;

export const ShareText = styled(ReactMarkdown)`
  max-width: 350px;

  p {
    line-height: 1.4;
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    font-size: 13px;
  }
`;
