import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import COLORS, { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${COLORS.LIGHTGRAY};
  padding: 1.25rem 0.5rem;
`;

export const Subcopy = styled.span`
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const Icon = styled(FiberManualRecordIcon)<{ $fillColor: string }>`
  color: ${({ $fillColor }) => $fillColor};
  font-size: 1.1rem;
  margin-right: 14px;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;
export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1rem;
  margin-left: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 1.25rem;
  }
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  width: 100%;

  &:hover {
    color: ${COLOR_MAP.BLUE};

    ${Subcopy} {
      color: ${COLOR_MAP.BLUE};
    }
  }
`;
