import React from 'react';
import styled from 'styled-components';
import {
  parseDateString,
  formatDateTime,
  DateFormat,
} from '@actnowcoalition/time-utils';
import { COLOR_MAP } from 'common/colors';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import {
  trackOpenTooltip,
  getLastUpdatedTooltipCopy,
} from 'components/InfoTooltip';

const ARCHIVED_LAST_UPDATED_DATE = parseDateString('2024-05-16');

const Wrapper = styled.div`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export default function ArchivedDataCallout({
  trackingLabel,
}: {
  trackingLabel: string;
}) {
  return (
    <Wrapper>
      Archived data — last updated{' '}
      {formatDateTime(ARCHIVED_LAST_UPDATED_DATE, DateFormat.MMMM_D_YYYY)}
      <InfoTooltip
        title={renderTooltipContent(
          getLastUpdatedTooltipCopy(ARCHIVED_LAST_UPDATED_DATE),
        )}
        aria-label="Description of when data is updated"
        trackOpenTooltip={() => trackOpenTooltip(trackingLabel)}
      />
    </Wrapper>
  );
}
