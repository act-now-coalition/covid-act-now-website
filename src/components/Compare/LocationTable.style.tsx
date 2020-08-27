import styled from 'styled-components';
import { locationNameCellWidth, metricCellWidth } from './Compare.style';
import { RankedLocationSummary } from 'common/utils/compare';

const minTableWidth = locationNameCellWidth + 5 * metricCellWidth;
const pinnedBorderColor = '#CEBFAC';

//159px is the header-height
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 159px);
  min-height: 0;
  width: 100%;
  overflow-x: auto;

  @media (min-width: 600px) {
    max-height: 80vh;
  }
`;

export const Body = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  min-width: ${minTableWidth}px;
`;

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const PinnedTop = `
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  z-index: 0;
  position: relative;
  border-bottom: 1px solid ${pinnedBorderColor};
`;

export const Head = styled.div<{
  isModal: boolean;
  pinnedLocation?: RankedLocationSummary;
}>`
  flex: 0 0 auto;
  min-height: 0;
  min-width: ${minTableWidth}px;
  ${props => (props.isModal && props.pinnedLocation ? PinnedTop : '')}
`;

export const TableContainer = styled.div<{ isModal: boolean }>``;
