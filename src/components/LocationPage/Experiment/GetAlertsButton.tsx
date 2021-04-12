import React from 'react';
import AlertsIcon from 'assets/images/AlertsIcon';
import {
  Button,
  Arrow,
  EmailIconWrapper,
  Row,
  Column,
  Subtext,
} from './GetAlertsButton.style';

const GetAlertsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Row>
        <EmailIconWrapper>
          <AlertsIcon />
        </EmailIconWrapper>
        <Column>
          <Row>
            Alerts
            <Arrow />
          </Row>
          <Subtext>
            Get emails when your location changes risk level or vaccine
            eligibility
          </Subtext>
        </Column>
      </Row>
    </Button>
  );
};

export default GetAlertsButton;
