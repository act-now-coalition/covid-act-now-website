import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { MarkdownContent } from 'components/Markdown';
import theme from 'assets/theme';

export const mobileBreakpoint = '600px';
/*
  Styles that are shared between Learn pages:
*/

export const BodyCopyStyles = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.4;
  letter-spacing: 1;
`;

export const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 0 1rem;
  margin: 2rem auto 3.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem auto;
  }
`;

export const PageHeader = styled.h1`
  margin-bottom: 1.75rem;
`;

export const PageIntroParagraph = styled.p`
  ${BodyCopyStyles};
`;

export const SectionHeader = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: 1.25rem 0;
`;

export const MarkdownBodyCopy = styled(MarkdownContent)`
  p {
    ${BodyCopyStyles}
  }
`;
