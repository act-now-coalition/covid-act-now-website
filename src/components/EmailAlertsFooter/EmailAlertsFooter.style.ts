import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { Heading2 as H2, Paragraph as P } from 'components/Markdown';

export const Container = styled.div`
  text-align: center;
  background-color: ${COLOR_MAP.GREY_200};

  padding: 40px 16px;
  @media (min-width: ${mobileBreakpoint}) {
    padding: 70px auto;
  }
`;

export const Content = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export const Heading2 = styled(H2)`
  text-align: center;
  margin-bottom: 16px;
`;

export const Paragraph = styled(P)`
  font-size: 15px;
`;
