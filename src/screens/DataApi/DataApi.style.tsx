import styled, { css } from 'styled-components';
import { MarkdownContent } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';
import LinkButton from 'components/LinkButton';

const SharedButtonStyles = css`
  font-size: 1rem;
  text-transform: none;
  text-decoration: none;
  color: inherit;
  padding: ${0.5 * theme.spacing(1)}px ${theme.spacing(2)};
`;

export const GreenLinkButton = styled(LinkButton)`
  ${SharedButtonStyles};
  color: white;
  min-width: 120px;
  background-color: ${COLOR_MAP.GREEN.BASE};
  border: 1px solid ${COLOR_MAP.GREEN.BASE};

  &:hover {
    background-color: white;
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const MarkdownDataApi = styled(MarkdownContent)`
  /* The blockquote shows as the Notes section */
  blockquote {
    padding: 0.25rem 1.25rem 1.25rem;

    p {
      color: ${COLOR_MAP.GRAY_BODY_COPY};
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
    }

    p:first-of-type {
      margin-top: 0;
      &:before {
        display: block;
        content: 'NOTES';
        font-weight: ${theme.typography.fontWeightMedium};
        margin-bottom: ${theme.spacing(2)}px;
      }
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const DataApiSection = styled.div`
  margin: 3rem 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
