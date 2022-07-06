import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Grid } from '@material-ui/core';
import { MarkdownBody } from 'components/Markdown';
import theme from 'assets/theme';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const mobileBreakpoint = '800px';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 0;
  }

  svg {
    font-size: 4rem;
  }
`;

/*
 seemingly random heights are estimates of
 how tall the iFrame is at each screen size
 */
export const EmbedWrapper = styled.div`
  height: 880px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    height: 840px;
  }

  @media (min-width: ${mobileBreakpoint}) {
    height: 1000px;
    flex-direction: row-reverse;
    justify-content: center;
    max-width: 420px;
    margin: 2rem;
    margin-right: 2.5rem;
  }
`;

/*
 seemingly random heights are estimates of
 how tall the iFrame is at each screen size
 */
export const GiveMomentumEmbedWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 1.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 1.5rem;
  }
`;

export const ContentWrapper = styled(Grid)`
  margin: 0 1.5rem 1.5rem;
  max-width: 560px;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 2rem;
    margin-left: 2.5rem;
    max-width: 420px;
  }
`;

export const IntroWrapper = styled.div`
  margin: 2rem 1.5rem 0.75rem;
  max-width: 560px;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 0;
    max-width: unset;
  }
`;

export const BodyCopy = styled(MarkdownBody)`
  p,
  li {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    font-size: 15px;
    line-height: 1.4;
  }

  // TODO: This customizes the style for the address, is there a cleaner way?
  blockquote {
    background-color: white;
    padding: 0;
    margin: 0;
    margin-left: ${2 * theme.spacing(4)}px;
    p {
      color: ${COLOR_MAP.GRAY_BODY_COPY};
      font-size: 15px;
      font-weight: normal;
    }
  }
`;

export const Header = styled.h1`
  max-width: 600px;
  line-height: 1.2;
  margin: 0;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    width: fit-content;
    margin: 1.25rem 0;
    font-size: 2rem;
  }
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.4;
`;

export const StyledIframe = styled.iframe`
  height: 775px;
  width: 100%;
  max-width: 560px;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 8px;

  @media (min-width: ${materialSMBreakpoint}) {
    height: 725px;
  }

  @media (min-width: ${mobileBreakpoint}) {
    height: 750px;
  }

  @media (min-width: 1200px) {
    height: 700px;
  }
`;
