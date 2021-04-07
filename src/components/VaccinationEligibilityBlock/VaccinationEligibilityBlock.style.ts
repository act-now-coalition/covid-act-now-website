import styled, { css } from 'styled-components';
import { MarkdownContent, Heading3 } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div``;

export const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Source = styled.div`
  font-size: 14px;
  color: ${COLOR_MAP.GREY_4};

  a {
    color: ${COLOR_MAP.GREY_4};
  }
`;

// TODO: Use a better marker (SVG checkbox from Material UI)
const listWithCheckmark = css`
  ul > li::marker {
    content: '✓  ';
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const PhaseDescription = styled(MarkdownContent)<{
  $currentlyEligible: boolean;
}>`
  ul {
    margin: 12px auto;
    margin-inline-start: 1em;
    padding-inline-start: 0.5em;

    &:last-child {
      margin-bottom: 0;

      li,
      p {
        margin-bottom: 0;
      }
    }
  }

  ${props => (props.$currentlyEligible ? listWithCheckmark : '')}
`;

export const PhaseTitle = styled(Heading3)`
  &:first-child {
    margin-top: 0;
  }
  margin-bottom: 4px;
`;

export const StyledEligibilityPanel = styled.div``;

export const StartDate = styled.span`
  color: ${COLOR_MAP.GREY_4};
  font-size: 14px;
`;

export const LinksDescription = styled.span`
  font-size: 16px;
  color: black;
`;
