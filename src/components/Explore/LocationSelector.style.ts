import styled from 'styled-components';
import { Button } from '@material-ui/core';
import theme from 'assets/theme';
import palette from 'assets/theme/palette';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  width: 100vw;
  padding: ${theme.spacing(4)}px;

  @media (min-width: ${materialSMBreakpoint}) {
    height: unset;
    width: 100%;
    max-width: 580px;
    border-radius: 4px;
    margin: auto;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

export const ModalTitle = styled.h1`
  ${props => props.theme.fonts.regularBookMidWeight};
  margin: 0;
  margin-right: 1.75rem;
  font-size: 1.25rem;
`;

export const ModalBody = styled.div`
  flex: 1 0 auto;
`;

export const DoneButton = styled(Button)`
  text-transform: none;
  color: ${palette.lightBlue};
  min-width: fit-content;
`;
