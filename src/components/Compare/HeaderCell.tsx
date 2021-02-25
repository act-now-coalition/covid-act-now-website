import React from 'react';
import {
  ArrowContainer,
  MetricHeaderCell,
} from 'components/Compare/Compare.style';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { trackCompareEvent } from 'common/utils/compare';
import { EventAction } from 'components/Analytics';
import { ColumnDefinition } from './columns';

function getTrackingLabel(metricName: string, descending: boolean) {
  const sortLabel = descending ? 'Desc' : 'Asc';
  return `Sort by: ${metricName} (${sortLabel})`;
}

const HeaderCell = (props: {
  sorter: any;
  setSorter: any;
  sortDescending: any;
  setSortDescending: any;
  column: ColumnDefinition;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  isModal: boolean;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    column,
    arrowColorSelected,
    arrowColorNotSelected,
    isModal,
    setSortByPopulation,
    sortByPopulation,
  } = props;

  const columnName = column.name;

  function cellOnClick() {
    if (sortByPopulation) {
      setSortByPopulation(false);
    }
    if (sorter === column.columnId) {
      setSortDescending(!sortDescending);
      trackCompareEvent(
        EventAction.SELECT,
        getTrackingLabel(columnName, !sortDescending),
      );
    } else {
      setSorter(column.columnId);
      setSortDescending(true);
      trackCompareEvent(EventAction.SELECT, getTrackingLabel(columnName, true));
    }
  }

  const isSelectedMetric = sorter === column.columnId;

  const onClickSortArrow = (isDescending: boolean) => {
    setSortDescending(isDescending);
    trackCompareEvent(
      EventAction.SELECT,
      getTrackingLabel(columnName, isDescending),
    );
  };

  return (
    <MetricHeaderCell
      onClick={cellOnClick}
      $isModal={isModal}
      $sortByPopulation={sortByPopulation}
      $arrowColorSelected={arrowColorSelected}
      $sortDescending={sortDescending}
      $isSelectedMetric={isSelectedMetric}
    >
      <span>{columnName}</span>
      <ArrowContainer
        $arrowColorNotSelected={arrowColorNotSelected}
        $isModal={isModal}
      >
        <ExpandLessIcon onClick={() => onClickSortArrow(false)} />
        <ExpandMoreIcon onClick={() => onClickSortArrow(true)} />
      </ArrowContainer>
    </MetricHeaderCell>
  );
};

export default HeaderCell;
