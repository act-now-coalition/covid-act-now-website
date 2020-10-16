import styled from 'styled-components';
import { StyledShareButtonStyles } from 'components/ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';

export const ButtonsWrapper = styled.div`
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 4px;
  display: flex;
  height: fit-content;
  width: fit-content;
`;

export const ShareButtonContainer = styled.div`
  ${StyledShareButtonStyles};
  display: 'block';
  width: 40px;
  height: 30px;
  display: flex;

  &:not(:last-child) {
    border-right: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  }

  svg {
    margin: auto;
  }
`;
