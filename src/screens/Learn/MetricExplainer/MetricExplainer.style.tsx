import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Heading2 } from 'components/Markdown';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const ExplainersHeading2 = styled(Heading2)`
  margin: 2rem 0;

  &:not(:first-of-type) {
    border-top: 1px solid ${COLOR_MAP.GRAY.LIGHT};
    padding-top: 2rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 3rem 0;

    &:not(:first-of-type) {
      border-top: 1px solid ${COLOR_MAP.GRAY.LIGHT};
      padding-top: 3rem;
    }
  }
`;
