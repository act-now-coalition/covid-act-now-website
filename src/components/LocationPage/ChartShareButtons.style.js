import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from '../ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';

export const ShareWrapper = styled.div`
  margin-left: auto;
  position: relative;
  top: 4.875rem;
  height: 0;
`;

export const SaveOrShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  width: fit-content;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  height: auto;

  // @media (min-width: 600px) {
  margin-left: auto;
  //   position: relative;
  //   top: 119px;
  // }
`;

export const SaveOrShareButton = styled.div`
  ${StyledShareButtonStyles};
  width: 64px;
  border-right: ${({ isLast }) =>
    isLast ? 'none' : `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  color: #3b94e6;
  text-transform: none;
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  left: 78.5%;
  z-index: 1000;
  width: fit-content;
  margin-top: 10px;
  margin-left: auto;

  @media (min-width: 600px) {
    left: 78.5%;
    z-index: 1000;
    margin-top: 10px;
    margin-left: auto;
  }
`;

export const SocialShareButton = styled.div`
  ${StyledShareButtonStyles}
  border-right: ${({ isLast }) =>
    isLast ? 'none' : `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  display: ${({ isLast }) => (isLast ? 'flex' : 'block')};
  width: 80px;
  height: 56px;
`;

export const CopyLinkButton = styled.div`
  font-size: 0.875rem;
  line-height: 1.3;
  text-transform: none;
  margin: auto;
  color: rgba(0, 0, 0, 0.7);
  width: 80px;
  height: 56px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
`;
