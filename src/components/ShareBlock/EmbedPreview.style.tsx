import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import { colors } from '@material-ui/core';
import palette from 'assets/theme/palette';
import Button from '@material-ui/core/Button';

export const EmbedButton = styled(Button)<{ bolder: boolean }>`
  height: 40px;
  min-width: 12rem;
  font-weight: ${props => (props.bolder ? '800' : 'inherit')};
`;

export const EmbedPreviewExitButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 1.5rem;
  font-weight: 200;
  color: ${colors.grey[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 60px;
  margin-top: 25px;
  background-color: white;

  :hover {
    color: ${palette.info.main};
  }

  @media (min-width: 410px) {
    margin-right: 30px;
    margin-top: 0;
  }

  @media (min-width: 600px) {
    margin-right: 0;
  }
`;
export const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmbedPreviewScrollContainer = styled(Box)`
  max-height: 95vh;
  overflow-y: hidden;
`;

export const EmbedPreviewStyled = styled(Paper)`
  position: relative;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

export const EmbedDetailsStyled = styled(Paper)<{ condensed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => (props.condensed ? '0.5rem 2rem' : '1rem')};
  margin: ${props => !props.condensed && '0 2rem'};
  box-shadow: none;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
`;

export const CodeSnippetPreview = styled.pre`
  padding: 1rem;
  max-width: 400px;
  font-size: 0.8rem;
  line-height: 0.9rem;
  white-space: pre-wrap;
  word-break: break-all;
  border-radius: 3px;
  background-color: ${colors.grey[100]};
`;
