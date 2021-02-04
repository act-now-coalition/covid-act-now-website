import React from 'react';
import {
  Container,
  Content,
  Heading2,
  Paragraph,
  EmailAlertIcon,
  Section,
} from './EmailAlertsFooter.style';

const EmailAlertsFooter: React.FC = () => {
  return (
    <Container>
      <Content>
        <Section key="icon">
          <EmailAlertIcon />
        </Section>
        <Section key="header">
          <Heading2>Get alerts</Heading2>
          <Paragraph>
            We’ll email you when your location sees a change in its{' '}
            <strong>risk level</strong> or <strong>vaccine eligibilitiy</strong>
            .
          </Paragraph>
        </Section>
        {/* Email Alerts Form */}
      </Content>
    </Container>
  );
};

export default EmailAlertsFooter;
