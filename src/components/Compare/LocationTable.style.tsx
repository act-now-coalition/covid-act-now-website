import styled from 'styled-components';
import { TableHead } from '@material-ui/core';
import { Cell, locationNameCellWidth, metricCellWidth } from './Compare.style';
import { COLORS } from 'common';

const minTableWidth = locationNameCellWidth + 5 * metricCellWidth;
const pinnedBorderColor = '#CEBFAC';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 60px);
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
  overflow-y: scroll;
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

export const Head = styled.div<{ isModal: boolean }>`
  flex: 0 0 auto;
  min-height: 0;
  min-width: ${minTableWidth}px;
  ${props => (props.isModal ? PinnedTop : '')}
`;

export const TableContainer = styled.div<{ isModal: boolean }>`
  border: ${({ isModal }) => !isModal && `1px solid ${COLORS.LIGHTGRAY}`};
`;

export const TableHeadContainer = styled(TableHead)<{ isModal: boolean }>`
  ${Cell} {
    vertical-align: bottom;
    line-height: 1.1rem;
    padding: 1rem 1rem 0.8rem;
    background-color: ${({ isModal }) => isModal && 'black'};
    color: ${({ isModal }) => isModal && 'white'};
    border-bottom: ${({ isModal }) =>
      !isModal && `2px solid ${COLORS.LIGHTGRAY}`};
    &:nth-child(2) {
      border-left: ${({ isModal }) =>
        !isModal && `2px solid ${COLORS.LIGHTGRAY}`};
    }
  }
`;
