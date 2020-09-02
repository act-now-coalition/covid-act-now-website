import styled from 'styled-components';
import { Button } from '@material-ui/core';
import theme from 'assets/theme';
import palette from 'assets/theme/palette';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90%;
  margin: 200px auto;
  border-radius: ${theme.spacing(1)}px;
  padding: ${theme.spacing(2)}px;
`;

export const ModalHeader = styled.div`
  flex: 0 1 auto;
  margin-bottom: ${theme.spacing(3)}px;

  /* TODO(Pablo): Use the theme */
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const ModalTitle = styled.div`
  padding: ${theme.spacing(1)}px 0;
`;

export const ModalBody = styled.div`
  flex: 1 0 auto;
`;

export const DoneButton = styled(Button)`
  text-transform: none;
  color: ${palette.lightBlue};
`;
