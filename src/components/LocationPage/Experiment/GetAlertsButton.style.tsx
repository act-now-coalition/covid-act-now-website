import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const Button = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  border: 1px solid #e0e0e0;
  margin-top: 2.5rem;
  padding: 1rem;
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
`;

export const Arrow = styled(ArrowForwardIcon)`
  color: ${COLOR_MAP.GREY_4};
  margin-left: 0.5rem;
  font-size: 1.25rem;
  transform: translateY(3px);
`;

export const EmailIconWrapper = styled.div`
  margin: 0 0.75rem 0 0.5rem;
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Subtext = styled.span`
  ${props => props.theme.fonts.regularBook};
  color: ${COLOR_MAP.GREY_4};
  text-transform: none;
  line-height: 1.4;
  text-align: left;
  font-size: 1rem;
  margin-top: 0.25rem;
`;
