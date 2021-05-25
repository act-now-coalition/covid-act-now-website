import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { COLOR_MAP, GREY_5, GREY_0 } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

const testWidth = '275px';

export const Button = styled(MuiButton)<{ $open?: boolean }>`
  border: 1px solid ${GREY_5};
  padding: 0.5rem 0.75rem;
  border-radius: ${({ $open }) => ($open ? '4px 4px 0 0' : '4px')};
  width: 100%;

  &:hover {
    background-color: ${GREY_0};
  }

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: ${testWidth};
  }
`;

export const ButtonCopy = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  letter-spacing: 0;
  width: 100%;
`;

export const MenuLabel = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

export const ItemLabel = styled.span`
  ${props => props.theme.fonts.regularBookMidWeight};
  font-size: 1rem;
  line-height: 1.3;
`;

export const Menu = styled(MuiMenu)`
  .MuiMenu-paper {
    border: 1px solid ${GREY_5};
    border-top: none;
    border-radius: 0 0 4px 4px;
    width: 100%;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    .MuiMenu-paper {
      max-width: ${testWidth};
    }
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  white-space: normal;
  padding: 0.75rem 1rem;
  line-height: 1.4;
`;
