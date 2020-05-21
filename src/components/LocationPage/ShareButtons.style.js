import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from '../ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';

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
    top: 4.875rem;
    margin-top: ${({ isFirst, chartAbove }) =>
      !isFirst && chartAbove && '-24px'};
    margin-top: ${({ isFirst, chartAbove }) =>
      !isFirst && !chartAbove && '-16px'};
  }
`;

export const MobileButtonsWrapper = styled.div`
  ${WrapperStyles};
  margin: 10px 0 60px;

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

export const SaveOrShareButton = styled.div`
  ${StyledShareButtonStyles};
  width: 64px;
  border-right: ${({ isLast }) =>
    !isLast && `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  color: #3b94e6;
  text-transform: none;
`;

export const SocialButtonsContainer = styled.div`
  ${ButtonContainerStyles};
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin: 10px 0 0 auto;
`;

export const SocialShareButton = styled.div`
  ${StyledShareButtonStyles}
  border-right: ${({ isLast }) =>
    !isLast && `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  display: ${({ isLast }) => (isLast ? 'flex' : 'block')};
  width: 80px;
  height: 56px;
`;

export const CopyLinkButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  line-height: 1.3;
  text-transform: none;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  width: 80px;
  height: 56px;
  font-weight: normal;
`;
