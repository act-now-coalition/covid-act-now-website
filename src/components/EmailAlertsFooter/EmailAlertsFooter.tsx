import React from 'react';
import {
  Container,
  Content,
  Heading2,
  Paragraph,
} from './EmailAlertsFooter.style';

const EmailAlertsFooter: React.FC = () => {
  return (
    <Container>
      <Content>
        {/* Email Notifications Icon */}
        <Heading2>Get alerts</Heading2>
        <Paragraph>
          We’ll email you when your location sees a change in its{' '}
          <strong>risk level</strong> or <strong>vaccine eligibilitiy</strong>.
        </Paragraph>
        {/* Location Search */}
        {/* Info Box */}
        {/* Email Input */}
        {/* Daily download checkbox */}
      </Content>
    </Container>
  );
};

export default EmailAlertsFooter;
