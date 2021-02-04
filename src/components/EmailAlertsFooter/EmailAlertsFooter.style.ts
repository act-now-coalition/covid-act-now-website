import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { Heading2 as H2, Paragraph as P } from 'components/Markdown';

export const Container = styled.div`
  text-align: center;
  background-color: #fafafa;

  padding: 40px 16px;
  @media (min-width: ${mobileBreakpoint}) {
    padding: 70px auto;
  }
`;

export const Content = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Heading2 = styled(H2)`
  margin-bottom: 16px;
`;

export const Paragraph = styled(P)`
  font-size: 15px;
  margin-bottom: 0;
`;

export const EmailAlertIcon = styled.div`
  margin: 0 auto;
  width: 48px;
  height: 48px;
  background-color: white;
  border: solid 1px black;
`;
