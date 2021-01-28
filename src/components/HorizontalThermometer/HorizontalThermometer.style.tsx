import styled from 'styled-components';
import { Link } from 'react-router-dom';
import COLORS, { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 1.5rem 2rem 1rem;
  border-radius: 4px;

  @media (min-width: ${materialSMBreakpoint}) {
    border: 1px solid ${COLORS.LIGHTGRAY};
  }
`;

export const ThermometerContainer = styled.div`
  display: flex;
`;

export const Label = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1rem;

  strong {
    color: black;
  }
`;

export const InfoIcon = styled(InfoOutlinedIcon)`
  color: ${COLOR_MAP.GRAY.BASE};
  transform: translateY(6px); // because of padding around MUI icon
  margin-right: 0.25rem;
  font-size: 1.35rem;
`;

export const InfoLink = styled(Link)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  transform: translateX(-14px); // because of padding around MUI icon
  margin-top: 0.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ColorBlock = styled.div<{ color: string }>`
  height: 20px;
  width: 24px;
  background-color: ${({ color }) => color};

  &:first-of-type {
    border-radius: 99px 0 0 99px;
    margin-left: 0.75rem;
  }

  &:last-of-type {
    border-radius: 0 99px 99px 0;
    margin-right: 0.75rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    width: 28px;
  }
`;
