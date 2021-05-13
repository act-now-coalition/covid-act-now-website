import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from '../ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';
import MuiCircularProgress from '@material-ui/core/CircularProgress';

export const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

export const ButtonContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  width: fit-content;
`;

export const SocialButtonsContainer = styled.div`
  ${ButtonContainerStyles};
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin: 10px 0 0 auto;
  position: absolute;
  right: 0;
`;

export const SocialShareButton = styled.div`
  ${StyledShareButtonStyles}
  width: 60px;
  height: 42px;

  &:not(:last-child) {
    border-right: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  }

  @media (min-width: 600px) {
    width: 80px;
    height: 56px;
  }

  button {
    align-items: center;
  }
`;

export const CopyLinkButton = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.75rem;
  line-height: 1.2;
  text-transform: none;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  width: 60px;
  height: 42px;

  @media (min-width: 600px) {
    width: 80px;
    height: 56px;
    font-size: 0.875rem;
  }
`;

export const CircularProgress = styled(MuiCircularProgress)`
  color: ${COLOR_MAP.BLUE};
`;
