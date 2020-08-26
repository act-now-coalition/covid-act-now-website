import React from 'react';
import {
  ArrowContainer,
  MetricHeaderCell,
} from 'components/Compare/Compare.style';
import { getMetricNameForCompare } from 'common/metric';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

  function cellOnClick() {
    if (sortByPopulation) {
      setSortByPopulation(false);
    }
    if (sorter === metricInMap) {
      setSortDescending(!sortDescending);
    } else {
      setSorter(metricInMap);
      setSortDescending(true);
    }
  }

  const isSelectedMetric = sorter === metricInMap;

  return (
    <MetricHeaderCell
      onClick={() => {
        cellOnClick();
      }}
      isModal={isModal}
      sortByPopulation={sortByPopulation}
      arrowColorSelected={arrowColorSelected}
      sortDescending={sortDescending}
      isSelectedMetric={isSelectedMetric}
    >
      <span>{getMetricNameForCompare(metricInMap)}</span>
      <ArrowContainer
        arrowColorNotSelected={arrowColorNotSelected}
        isModal={isModal}
      >
        <ExpandLessIcon onClick={() => setSortDescending(false)} />
        <ExpandMoreIcon onClick={() => setSortDescending(true)} />
      </ArrowContainer>
    </MetricHeaderCell>
  );
};

export default HeaderCell;
