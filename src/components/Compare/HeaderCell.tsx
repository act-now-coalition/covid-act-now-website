import React from 'react';
import { ArrowContainer, Cell } from 'components/Compare/Compare.style';
import { getMetricNameExtended } from 'common/metric';
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
  setSortOverallRisk: any;
  sortOverallRisk: Boolean;
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    metricInMap,
    arrowColorSelected,
    arrowColorNotSelected,
    setSortOverallRisk,
    sortOverallRisk,
  } = props;

  function cellTitleOnClick() {
    if (sorter !== metricInMap) {
      setSortDescending(true);
    } else {
      setSortDescending(!sortDescending);
    }
  }

  return (
    <Cell
      onClick={() => {
        setSortOverallRisk(false);
        setSorter(metricInMap);
      }}
    >
      <span
        onClick={() => {
          cellTitleOnClick();
        }}
      >
        {getMetricNameExtended(metricInMap)}
      </span>
      <ArrowContainer
        metric={metricInMap}
        sortDescending={sortDescending}
        sorter={sorter}
        arrowColorSelected={arrowColorSelected}
        arrowColorNotSelected={arrowColorNotSelected}
        sortOverallRisk={sortOverallRisk}
      >
        <ExpandLessIcon onClick={() => setSortDescending(false)} />
        <ExpandMoreIcon onClick={() => setSortDescending(true)} />
      </ArrowContainer>
    </Cell>
  );
};

export default HeaderCell;
