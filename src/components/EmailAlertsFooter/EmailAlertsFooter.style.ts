import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { Heading2 as H2, Paragraph as P } from 'components/Markdown';
import AlertIcon from 'assets/images/EmailAlertIcon';

export const Container = styled.div`
  text-align: center;
  background-color: ${COLOR_MAP.GREY_0};

  padding: 40px 16px;
  @media (min-width: ${mobileBreakpoint}) {
    padding: 70px auto;
  }
`;

export const Content = styled.div`
  max-width: 440px;
  margin: 0 auto;
`;

export const Section = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Heading2 = styled(H2)`
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const Paragraph = styled(P)`
  font-size: 15px;
  margin-bottom: 0;
`;

export const EmailAlertIcon = styled(AlertIcon)`
  margin: 0 auto;
  width: 40px;
  height: 40px;
`;
