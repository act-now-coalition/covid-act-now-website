import React from 'react';
import { ArrowContainer, Cell } from 'components/Compare/Compare.style';
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
  isModal?: Boolean;
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
      <span>{getMetricNameForCompare(metricInMap)}</span>
      <ArrowContainer
        metric={metricInMap}
        sortDescending={sortDescending}
        sorter={sorter}
        arrowColorSelected={arrowColorSelected}
        arrowColorNotSelected={arrowColorNotSelected}
        isModal={isModal}
      >
        <ExpandMoreIcon onClick={() => setSortDescending(true)} />
        <ExpandLessIcon onClick={() => setSortDescending(false)} />
      </ArrowContainer>
    </Cell>
  );
};

export default HeaderCell;
