import styled from 'styled-components';
import { TableHead } from '@material-ui/core';
import { Cell } from './Compare.style';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

export const ModalBody = styled.div`
  flex: 1 0 auto;
`;

export const Container = styled.div``;

export const Head = styled.div`
  flex: 0 0 auto;
`;

export const Body = styled.div``;

export const ScrollContainer = styled.div`
  overflow: scroll;
`;

export const TableHeadContainer = styled(TableHead)<{ isModal: boolean }>`
  ${Cell} {
    vertical-align: bottom;
    line-height: 1.1rem;
    padding: 1rem 1rem 0.8rem;
    background-color: ${({ isModal }) => isModal && 'black'};
    color: ${({ isModal }) => isModal && 'white'};
    border-bottom: ${({ isModal }) => !isModal && '2px solid #f2f2f2'};

    &:nth-child(2) {
      border-left: ${({ isModal }) => !isModal && '2px solid #f2f2f2'};
    }
  }
`;
