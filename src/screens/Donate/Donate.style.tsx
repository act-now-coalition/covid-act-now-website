import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Grid } from '@material-ui/core';

export const EmbedWrapper = styled.div`
  height: 750px;
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

export const ListSection = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const ContentSection = styled.div`
  padding: 1rem 1.5rem;

  &:first-child {
    ${BodyCopy} {
      margin-bottom: 0;
    }
  }

  li {
    ${BodyCopyStyles}
  }

  svg {
    font-size: 3.25rem;
  }

  a {
    color: ${COLOR_MAP.PURPLE};
    text-decoration: none;
    font-size: 15px;
  }

  @media (min-width: 600px) {
    padding: 1rem 1.25rem;

    &:first-child {
      ${BodyCopy} {
        margin-bottom: 1rem;
      }
    }
  }
`;
