import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from '../ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

const WrapperStyles = css`
  display: block;
  position: relative;
  height: 0;
  z-index: 1;
`;

export const DesktopButtonsWrapper = styled.div`
  display: none;

  @media (min-width: 600px) {
    ${WrapperStyles};
  }
`;

export const MobileButtonsWrapper = styled.div`
  ${WrapperStyles};
  margin: 28px 0 50px;

  @media (min-width: 600px) {
    display: none;
  }
`;

export const ButtonContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  width: fit-content;
`;

export const SaveOrShareContainer = styled.div`
  ${ButtonContainerStyles};
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  height: auto;
  margin-left: auto;
`;

export const SaveOrShareButton = styled.div<{
  color?: string;
  isLast?: boolean;
}>`
  ${StyledShareButtonStyles};
  border-right: ${({ isLast }) =>
    !isLast && `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  color: ${COLOR_MAP.BLUE};
  text-transform: none;
  line-height: 1;
  height: 30px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-weight: 500;

  @media (min-width: 600px) {
    height: 40px;
    line-height: 2.5rem;
  }
`;

export const SocialButtonsContainer = styled.div`
  ${ButtonContainerStyles};
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin: 10px 0 0 auto;
`;

export const SocialShareButton = styled.div<{ isLast?: boolean }>`
  ${StyledShareButtonStyles}
  border-right: ${({ isLast }) =>
    !isLast && `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  display: ${({ isLast }) => (isLast ? 'flex' : 'block')};
  width: 60px;
  height: 42px;

  @media (min-width: 600px) {
    width: 80px;
    height: 56px;
  }

  button {
    align-items: center;
  }
`;

export const CopyLinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.775rem;
  line-height: 1.3;
  text-transform: none;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  width: 60px;
  height: 42px;
  font-weight: normal;

  @media (min-width: 600px) {
    width: 80px;
    height: 56px;
    font-size: 0.875rem;
  }
`;

export const ClickAwayWrapper = styled.div`
  @media (min-width: 600px) {
    margin-top: -24px;
    width: fit-content;
    margin-left: auto;
  }
`;

export const SocialButtonsWrapper = styled.div``;

export const CircularProgress = styled(MuiCircularProgress)`
  color: ${COLOR_MAP.BLUE};
`;
