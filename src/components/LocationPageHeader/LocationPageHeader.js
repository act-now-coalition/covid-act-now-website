import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { COLOR_MAP } from 'enums/interventions';
import { useEmbed } from 'utils/hooks';

import {
  HeaderHighlight,
  HeaderSubCopy,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledLocationPageHeaderWrapper,
  StyledLocationPageHeaderInner,
} from './LocationPageHeader.style';

function LocationPageHeading({ projections }) {
  const { isEmbed } = useEmbed();

  const displayName = projections.countyName ? (
    <>
      {projections.countyName},{' '}
      <a
        href={`${
          isEmbed ? '/embed' : ''
        }/us/${projections.stateCode.toLowerCase()}`}
      >
        {projections.stateName}
      </a>
    </>
  ) : (
    <span>{projections.stateName}</span>
  );

  const title = {
    [COLOR_MAP.GREEN.BASE]: 'COVID cases are shrinking in',
    [COLOR_MAP.ORANGE.BASE]: 'COVID cases are roughly stable in',
    [COLOR_MAP.RED.BASE]: 'COVID cases are growing exponentially in',
    [COLOR_MAP.BLACK]: 'We don’t have enough data for',
  }[projections.getAlarmLevelColor()];
  const rtInfo = projections.primary.rt ? (
    <>
      (R<sub>t</sub>={projections.primary.rt})
    </>
  ) : (
    ''
  );

  return (
    <span>
      {title} {displayName} {rtInfo}
    </span>
  );
}

function LocationSummary({ projections }) {
  const predictionText = {
    [COLOR_MAP.GREEN.BASE]: (
      <>
        Assuming current interventions remain in place, we expect the total
        cases in your area to decrease.. 14 days of decreasing cases is the
        first step to reopening. Check back — projections update every 3 days
        with the most recent data.
      </>
    ),
    [COLOR_MAP.ORANGE.BASE]: (
      <>
        Assuming current interventions remain in place, cases in your area are
        stable, and may even begin to decrease soon.. Check back — projections
        update every 3 days with the most recent data.
      </>
    ),
    [COLOR_MAP.RED.BASE]: (
      <>
        Our projections show that cases in your area are increasing
        exponentially. Stay home to help prevent an outbreak. Check back —
        projections update every 3 days with the most recent data.
      </>
    ),
    [COLOR_MAP.BLACK]: (
      <>
        Unfortunately, we don’t have enough data for your area to make a
        prediction, or your area has not reported cases yet. Check back —
        projections update every 3 days with the most recent data.
      </>
    ),
  }[projections.getAlarmLevelColor()];

  return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
}

const LocationPageHeader = ({ projections }) => {
  const { isEmbed } = useEmbed();

  return (
    <StyledLocationPageHeaderWrapper condensed={isEmbed}>
      <StyledLocationPageHeaderInner condensed={isEmbed}>
        <StyledStateImageWrapper>
          <StateCircleSvg
            actionBackgroundFill={COLORS.LIGHTGRAY}
            state={projections.stateCode}
            fillColor={projections.getAlarmLevelColor()}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>
              <HeaderHighlight color={projections.getAlarmLevelColor()}>
                <LocationPageHeading projections={projections} />
              </HeaderHighlight>
            </HeaderTitle>
            {!isEmbed ? <LocationSummary projections={projections} /> : ''}
            {projections.isCounty && !isEmbed && (
              <HeaderSubCopy>
                <strong>County data is currently in beta. </strong>
                <span>
                  Because counties don’t report hospitalizations, our forecasts
                  may not be as accurate. See something wrong?{' '}
                </span>
                <a
                  href="https://forms.gle/NPsLcFnrvfS1kqkn9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Please let us know.
                </a>
              </HeaderSubCopy>
            )}
          </div>
        </StyledStateCopyWrapper>
      </StyledLocationPageHeaderInner>
    </StyledLocationPageHeaderWrapper>
  );
};

export default LocationPageHeader;
