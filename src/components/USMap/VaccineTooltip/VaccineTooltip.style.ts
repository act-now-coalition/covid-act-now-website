import styled from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { COLOR_MAP } from 'common/colors';
import VaccineDot from 'components/VaccineDot/VaccineDot';
import { LinkButton } from 'components/Button';

export const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  filter: drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.16));
  width: 240px;
`;

export const Inner = styled.div`
  padding: 16px;
`;

export const LocationName = styled.div<{ $isMobileVersion: boolean }>`
  ${props => props.theme.fonts.regularBookBold};
  text-align: ${props => (props.$isMobileVersion ? 'center' : undefined)};
  color: black;
  font-size: 16px;
  line-height: 16px;
  margin-top: 4px;
  margin-bottom: 20px;
`;

export const LocationNameArrowIcon = styled(ArrowForwardIcon)`
  color: ${COLOR_MAP.GREY_600};
  font-size: 22px;
  margin-bottom: -5px;
  margin-left: 6px;
`;

export const Row = styled.div`
  display: flex;
  margin-top: 3px;
`;

export const Title = styled.div`
  ${props => props.theme.fonts.regularBookMidWeight};
  flex: 100%;
  font-size: 14px;
`;

export const Value = styled.div`
  ${props => props.theme.fonts.monospaceMidWeight};
  color: ${COLOR_MAP.GREY_4};
  font-size: 14px;
  white-space: nowrap;
`;

export const StyledVaccineDot = styled(VaccineDot)`
  margin-left: 8px;
`;

export const ProgressBarWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 2px;
`;

export const MoreDataLinkContainer = styled.div`
  padding: 13px;
  margin-top: -2px;
  border-top: 1px solid ${COLOR_MAP.GREY_2};
  text-align: center;
`;

export const MoreDataLinkButton = styled(LinkButton)`
  color: ${COLOR_MAP.NEW_BLUE.BASE};
`;

export const MoreDataArrowIcon = styled(ArrowForwardIcon)`
  color: ${COLOR_MAP.GREY_4};
  font-size: 20px;
  margin-bottom: -3px;
  margin-left: 6px;
`;
