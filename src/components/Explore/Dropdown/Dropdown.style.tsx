import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { COLOR_MAP, GREY_5, GREY_0 } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Button = styled(MuiButton)<{ $open?: boolean; $maxWidth: number }>`
  border: 1px solid ${GREY_5};
  border-bottom: ${({ $open }) => $open && 'none'};
  padding: 0.5rem 0.75rem;
  border-radius: ${({ $open }) => ($open ? '4px 4px 0 0' : '4px')};
  width: 100%;
  letter-spacing: 0;

  &:hover {
    background-color: ${GREY_0};
  }

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  }
`;

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
  ${props => props.theme.fonts.regularBookMidWeight};
  font-size: 1rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: none;
`;

export const Menu = styled(MuiMenu)<{ $maxWidth: number }>`
  .MuiMenu-paper {
    border: 1px solid ${GREY_5};
    border-radius: 0;
    width: 100%;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    .MuiMenu-paper {
      max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
    }
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  white-space: normal;
  padding: 0.75rem 1rem;
  line-height: 1.4;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
