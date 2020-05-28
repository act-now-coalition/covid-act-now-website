import React from 'react';
import { Projections } from 'common/models/Projections';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import { StyledLocationPageHeaderWrapper } from 'components/LocationPage/NewLocationPageHeader.style';
import { useEmbed } from 'common/utils/hooks';

function LocationPageHeading(props: { projections: Projections }) {
  const { isEmbed } = useEmbed();

  const displayName = props.projections.countyName ? (
    <>
      {props.projections.countyName},{' '}
      <a
        href={`${
          isEmbed ? '/embed' : ''
        }/us/${props.projections.stateCode.toLowerCase()}`}
      >
        {props.projections.stateName}
      </a>
    </>
  ) : (
    <span>{props.projections.stateName}</span>
  );

  return <span>{displayName}</span>;
}

const NewLocationPageHeader = (props: {
  projections: Projections;
  condensed?: Boolean;
  stats: { [key: string]: number | null };
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onContactTracingClick?: () => void;
}) => {
  return (
    <StyledLocationPageHeaderWrapper>
      <LocationPageHeading projections={props.projections} />

      <SummaryStats
        stats={props.stats}
        onRtRangeClick={props.onRtRangeClick}
        onTestPositiveClick={props.onTestPositiveClick}
        onIcuUtilizationClick={props.onIcuUtilizationClick}
        onContactTracingClick={props.onContactTracingClick}
      />
    </StyledLocationPageHeaderWrapper>
  );
};

export default NewLocationPageHeader;
