import React from 'react';
import {
  ArrowContainer,
  MetricHeaderCell,
} from 'components/Compare/Compare.style';
import { getMetricNameForCompare } from 'common/metric';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { trackCompareEvent } from 'common/utils/compare';
import { EventAction } from 'components/Analytics';

function getTrackingLabel(metricName: string, descending: boolean) {
  const sortLabel = descending ? 'Desc' : 'Asc';
  return `Sort by: ${metricName} (${sortLabel})`;
}

const HeaderCell = (props: {
  sorter: any;
  setSorter: any;
  sortDescending: any;
  setSortDescending: any;
  metricInMap: any;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  isModal: Boolean;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    metricInMap,
    arrowColorSelected,
    arrowColorNotSelected,
    isModal,
    setSortByPopulation,
    sortByPopulation,
  } = props;

  const metricName = getMetricNameForCompare(metricInMap);

  function cellOnClick() {
    if (sortByPopulation) {
      setSortByPopulation(false);
    }
    if (sorter === metricInMap) {
      setSortDescending(!sortDescending);
      trackCompareEvent(
        EventAction.SELECT,
        getTrackingLabel(metricName, !sortDescending),
      );
    } else {
      setSorter(metricInMap);
      setSortDescending(true);
      trackCompareEvent(EventAction.SELECT, getTrackingLabel(metricName, true));
    }
  }

  const isSelectedMetric = sorter === metricInMap;

  const onClickSortArrow = (isDescending: boolean) => {
    setSortDescending(isDescending);
    trackCompareEvent(
      EventAction.SELECT,
      getTrackingLabel(metricName, isDescending),
    );
  };

  return (
    <MetricHeaderCell
      onClick={cellOnClick}
      isModal={isModal}
      sortByPopulation={sortByPopulation}
      arrowColorSelected={arrowColorSelected}
      sortDescending={sortDescending}
      $isSelectedMetric={isSelectedMetric}
    >
      <span>{metricName}</span>
      <ArrowContainer
        arrowColorNotSelected={arrowColorNotSelected}
        isModal={isModal}
      >
        <ExpandLessIcon onClick={() => onClickSortArrow(false)} />
        <ExpandMoreIcon onClick={() => onClickSortArrow(true)} />
      </ArrowContainer>
    </MetricHeaderCell>
  );
};

export default HeaderCell;
