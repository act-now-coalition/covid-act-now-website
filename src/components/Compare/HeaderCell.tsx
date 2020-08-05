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
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    metricInMap,
    arrowColorSelected,
    arrowColorNotSelected,
  } = props;

  function cellOnClick() {
    if (sorter === metricInMap) {
      setSortDescending(!sortDescending);
    } else {
      setSorter(metricInMap);
      setSortDescending(true);
    }
  }

  return (
    <Cell
      onClick={() => {
        cellOnClick();
      }}
    >
      <span>{getMetricNameExtended(metricInMap)}</span>
      <ArrowContainer
        metric={metricInMap}
        sortDescending={sortDescending}
        sorter={sorter}
        arrowColorSelected={arrowColorSelected}
        arrowColorNotSelected={arrowColorNotSelected}
      >
        <ExpandLessIcon onClick={() => setSortDescending(false)} />
        <ExpandMoreIcon onClick={() => setSortDescending(true)} />
      </ArrowContainer>
    </Cell>
  );
};

export default HeaderCell;
