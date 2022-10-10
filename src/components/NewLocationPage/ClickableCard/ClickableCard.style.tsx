import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import {
  GrayBodyCopy,
  SectionContainer,
} from 'components/NewLocationPage/Shared/Shared.style';
import { Chevron } from '../Shared/Shared.style';
import { COLOR_MAP } from 'common/colors';

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
  justify-content: flex-start;

  &:hover {
    background-color: inherit;
    ${Chevron} {
      transform: translate(6px, 5.5px);
      transition: transform 0.06s ease-in-out;
    }
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
  margin-top: 0.75rem;
`;

export const HighlightedSectionContainer = styled(SectionContainer)`
  border: 1.5px solid ${COLOR_MAP.ORANGE_DARK.BASE};
  background-color: ${COLOR_MAP.ORANGE_DARK.LIGHT};
`;

export const UnderlinedSpan = styled.span`
  text-decoration: underline;
`;
