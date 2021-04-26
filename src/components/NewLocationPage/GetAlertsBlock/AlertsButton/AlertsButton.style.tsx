import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { GrayBodyCopy } from 'components/NewLocationPage/Shared/Shared.style';

export const Button = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  padding: 0;
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
  display: flex;
  align-items: flex-start;

  &:hover {
    background-color: transparent;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:first-child {
    margin-right: 0.75rem;
  }
`;

export const Subtext = styled(GrayBodyCopy)`
  ${props => props.theme.fonts.regularBook};
  text-transform: none;
  text-align: left;
  font-size: 1rem;
  margin-top: 0.25rem;
`;
