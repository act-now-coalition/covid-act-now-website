import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  DataCell,
  Row,
  Population,
  LocationCellWrapper,
  LocationInfoWrapper,
  LocationRankWrapper,
  LocationNameCell,
  LocationNameWrapper,
  Rank,
  StyledLink,
} from 'components/Compare/Compare.style';
import { RankedLocationSummary } from 'common/utils/compare';
import { formatEstimate } from 'common/utils';
import regions from 'common/regions';
import { fail } from '@actnowcoalition/assert';
import { StyledRegionName } from 'components/SharedComponents';
import { ColumnDefinition } from './columns';

const CompareTableRow = (props: {
  columns: ColumnDefinition[];
  location: RankedLocationSummary;
  sorter: number;
  isCurrentCounty?: boolean;
  isModal?: boolean;
  sortByPopulation: boolean;
  isHomepage?: boolean;
  showStateCode: boolean;
}) => {
  const {
    columns,
    location,
    sorter,
    isCurrentCounty,
    isModal,
    sortByPopulation,
    isHomepage,
    showStateCode,
  } = props;

  const fipsCode = location.region.fipsCode;

  const region = regions.findByFipsCode(fipsCode);
  // TODO(chris): What todo about possibly null region?
  if (!region) {
    fail(`missing region for fips code ${fipsCode}`);
  }

  // DC has a state- and county-level page, we only want to use the state page.
  const dcRelativeUrl = regions.findByFipsCodeStrict('11').relativeUrl;
  const locationLink =
    region.fipsCode !== '11001' ? region.relativeUrl : dcRelativeUrl;

  const populationRoundTo = isHomepage ? 3 : 2;

  const navigate = () => {
    window.location.href = locationLink;
  };

  return (
    <Row
      index={location.rank}
      $isCurrentCounty={isCurrentCounty}
      $isModal={isModal}
      onClick={navigate}
    >
      <LocationNameCell
        $iconColor={location.metricsInfo.level}
        sortByPopulation={sortByPopulation}
      >
        <StyledLink to={locationLink}>
          <LocationCellWrapper>
            <LocationRankWrapper>
              <Rank>{location.rank}</Rank>
              <FiberManualRecordIcon />
            </LocationRankWrapper>
            <LocationNameWrapper>
              <StyledRegionName
                showStateCode={showStateCode}
                region={location.region}
                condensed
              />
              <br />
              <LocationInfoWrapper>
                <Population>
                  {formatEstimate(
                    location.region.population,
                    populationRoundTo,
                  )}
                </Population>
              </LocationInfoWrapper>
            </LocationNameWrapper>
          </LocationCellWrapper>
        </StyledLink>
      </LocationNameCell>
      {columns.map((column, i) => {
        const isSelected = !sortByPopulation && sorter === column.columnId;

        return (
          <DataCell
            key={`data-cell-${i}`}
            $isSelected={isSelected}
            $desiredWidthPercent={column.desiredWidthPercent}
            $minWidthPx={column.minWidthPx}
          >
            <StyledLink to={locationLink}>
              {column.render(location, location.region.fullName)}
            </StyledLink>
          </DataCell>
        );
      })}
    </Row>
  );
};

export default CompareTableRow;
