import React from 'react';
import regions, { FipsCode } from 'common/regions';
import {
  Container,
  Content,
  Heading2,
  Paragraph,
  EmailAlertIcon,
  Section,
} from './EmailAlertsFooter.style';
import EmailAlertsForm from 'components/EmailAlertsForm';

const EmailAlertsFooter: React.FC<{ defaultRegionsFips: FipsCode[] }> = ({
  defaultRegionsFips,
}) => {
  const defaultRegions = defaultRegionsFips.map(regions.findByFipsCodeStrict);
  return (
    <Container>
      <Content>
        <Section key="icon">
          <EmailAlertIcon />
        </Section>
        <Section key="header">
          <Heading2>Get alerts</Heading2>
          <Paragraph>
            We’ll email you when selected locations see a change in{' '}
            <strong>risk level</strong> or <strong>vaccine eligibility</strong>.
          </Paragraph>
        </Section>
        <Section key="email-form">
          <EmailAlertsForm
            autocompleteRegions={regions.all()}
            defaultRegions={defaultRegions}
          />
        </Section>
      </Content>
    </Container>
  );
};

export default EmailAlertsFooter;
