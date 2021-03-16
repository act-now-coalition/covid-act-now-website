import React, { ReactElement } from 'react';
import { Wrapper, Content, Subcopy, Header } from './HomePageHeader.style';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { DateTime } from 'luxon';
import { dateToUTC, formatDateTime, TimeFormat } from 'common/utils/time-utils';

function renderInfoTooltip(updatedDate: Date): ReactElement {
  const updatedDateStr = formatDateTime(updatedDate, TimeFormat.YYYY_MM_DD);
  // 5 pm UTC = 10 am PST
  // TODO (Fai): Create time util to set hour of the day.
  const updatedTime = DateTime.fromISO(`${updatedDateStr}T17:00:00.000Z`);
  const updatedTimeStr = updatedTime.toFormat('h a ZZZZ');
  const body = `We aim to update our data by ${updatedTimeStr} daily. Occasionally, when additional review is required, an update can be delayed by several hours. Note that certain data sources that we use (eg. ICU hospitalizations) are only updated once per week.`;
  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label="Description of when data is updated"
      trackOpenTooltip={() => trackOpenTooltip('Home page header')}
    />
  );
}

const HomePageHeader: React.FC = () => {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();

  return (
    <Wrapper>
      <Content>
        <Header>U.S. COVID Risk &amp; Vaccine Tracker</Header>
        <Subcopy>
          Updated on{' '}
          {formatDateTime(dateToUTC(lastUpdatedDate), TimeFormat.MMMM_D)}{' '}
          {renderInfoTooltip(lastUpdatedDate)}
        </Subcopy>
      </Content>
    </Wrapper>
  );
};

export default HomePageHeader;
