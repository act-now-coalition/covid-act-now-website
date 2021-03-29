import React from 'react';
import isNumber from 'lodash/isNumber';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  DataCell,
  Row,
  DataCellValue,
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
import regions from 'common/regions/region_db';
import { fail } from 'assert';
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
  const locationLink = region.relativeUrl;

  const populationRoundTo = isHomepage ? 3 : 2;

  return (
    <StyledLink to={locationLink}>
      <Row
        index={location.rank}
        $isCurrentCounty={isCurrentCounty}
        $isModal={isModal}
      >
        <LocationNameCell
          $iconColor={location.metricsInfo.level}
          sortByPopulation={sortByPopulation}
        >
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
        </LocationNameCell>
        {columns.map((column, i) => {
          const metricValue = column.getValue(location);
          const valueUnknown =
            !isNumber(metricValue) || !Number.isFinite(metricValue);
          const isSelected = !sortByPopulation && sorter === column.columnId;

          return (
            <DataCell
              key={`data-cell-${i}`}
              $isSelected={isSelected}
              $iconColor={column.getIconColor(location)}
            >
              <FiberManualRecordIcon />
              <DataCellValue
                $valueUnknown={valueUnknown}
                $textAlign={column.textAlign}
                $fontSize={column.fontSize}
              >
                {column.getFormattedValue(location)}
              </DataCellValue>
            </DataCell>
          );
        })}
      </Row>
    </StyledLink>
  );
};

export default CompareTableRow;
