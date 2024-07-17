import React, { ReactElement } from 'react';
import { Wrapper, Content, Subcopy, Header } from './HomePageHeader.style';
import { parseDateString } from '@actnowcoalition/time-utils';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import {
  trackOpenTooltip,
  getLastUpdatedTooltipCopy,
} from 'components/InfoTooltip';
import { formatDateTime, DateFormat } from '@actnowcoalition/time-utils';

function renderInfoTooltip(updatedDate: Date): ReactElement {
  const tooltipCopy = getLastUpdatedTooltipCopy(updatedDate);
  return (
    <InfoTooltip
      title={renderTooltipContent(tooltipCopy)}
      aria-label="Description of when data is updated"
      trackOpenTooltip={() => trackOpenTooltip('Home page header')}
    />
  );
}

const HomePageHeader: React.FC = () => {
  const lastUpdatedDate = parseDateString('2024-05-16');
  // Hardcoded date for now to stop the flicker on load

  return (
    <Wrapper>
      <Content>
        <Header>U.S. COVID Tracker</Header>
        <Subcopy>
          Last updated on{' '}
          {formatDateTime(lastUpdatedDate, DateFormat.MMMM_D_YYYY)}{' '}
          {renderInfoTooltip(lastUpdatedDate)}
        </Subcopy>
      </Content>
    </Wrapper>
  );
};

export default HomePageHeader;
