import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export const CircleIcon = styled(FiberManualRecordIcon)<{ iconColor: string }>`
  color: ${({ iconColor }) => iconColor};
  font-size: 1rem;
`;

export const CopyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  font-size: 1rem;
  margin-left: auto;
`;

export const LevelDescription = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 14px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  max-width: 330px;
  width: 100%;
  padding: 1.25rem 1.75rem 1.25rem 1.25rem;
  cursor: pointer;
  border-radius: 4px;

  :hover {
    background-color: ${COLOR_MAP.BLUE};
    color: white;

    ${ArrowIcon},${LevelDescription} {
      color: white;
    }
  }
`;
