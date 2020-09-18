import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Grid } from '@material-ui/core';

export const EmbedWrapper = styled.div`
  height: 800px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled(Grid)`
  max-width: 1000px;
  margin: 0 auto;
  width: unset;
`;

const BodyCopyStyles = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 15px;
  line-height: 1.4;
`;

export const BodyCopy = styled.p`
  ${BodyCopyStyles}
`;

export const GridItem = styled(Grid)`
  padding: 1.5rem;

  @media (min-width: 600px) {
    &:first-child {
      padding: 1rem 1.25rem 1rem 2.5rem;
    }
    &:nth-child(2) {
      padding: 1rem 2.5rem 1rem 1.25rem;
    }
  }
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.75rem 0 1.5rem;
`;

export const ListHeader = styled.h3`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0.5rem 0;
  line-height: 1.4;
`;

export const ListSection = styled.ul`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const ContentSection = styled.div`
  li {
    ${BodyCopyStyles}
  }

  svg {
    font-size: 3.25rem;
  }

  a {
    color: ${COLOR_MAP.BLUE};
    text-decoration: none;
    font-size: 15px;
  }

  &:first-child {
    ${BodyCopy} {
      margin-bottom: 3rem;
    }
  }
`;
