import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP, GREY_2, GREY_0 } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const DropdownWrapper = styled.div<{ $maxWidth: number }>`
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  }
`;

const BaseButton = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  letter-spacing: 0;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border-radius: 0;

  &:hover {
    background-color: ${GREY_0};
  }

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const MainButton = styled(BaseButton)<{
  $open?: boolean;
  $maxWidth?: number;
}>`
  border: 1px solid ${GREY_2};
  border-radius: ${({ $open }) => ($open ? '4px 4px 0 0' : '4px')};
  width: 100%;
  position: relative;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${({ $maxWidth }) =>
      Number.isFinite($maxWidth) && `${$maxWidth}px`};
  }
`;

export const ListContainer = styled.div<{ $open: boolean; $maxWidth: number }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid ${GREY_2};
  border-top: none;
  width: calc(100% - 2rem);
  position: absolute;
  z-index: 1;
  border-radius: 0 0 4px 4px;
  padding: 0.5rem 0;
  background-color: white;

  @media (min-width: ${materialSMBreakpoint}) {
    width: 100%;
    max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  }
`;

export const ListButton = styled(BaseButton)<{
  $maxWidth: number;
}>`
  ${props => props.theme.fonts.regularBook};
  white-space: normal;
  line-height: 1.4;
  text-transform: none;
  font-size: 1rem;

  .MuiButton-label {
    justify-content: flex-start;
    text-align: left;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  }
`;

/* Used in MenuButton.tsx */

export const ButtonContent = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const MenuLabel = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.75rem;
  text-transform: uppercase;
`;

export const ItemLabel = styled.span`
  font-size: 1rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: none;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
