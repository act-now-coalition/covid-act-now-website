import styled from 'styled-components';
import { MarkdownContent } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';

export const MarkdownProduct = styled(MarkdownContent)`
  /* The blockquote shows as the Notes section */
  blockquote {
    padding: ${theme.spacing(3)}px;

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
