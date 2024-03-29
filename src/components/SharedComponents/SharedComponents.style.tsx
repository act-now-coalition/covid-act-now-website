import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const SectionHeader = styled.h2<{
  $isHomepage?: boolean;
}>`
  ${props => props.theme.fonts.regularBookBold};
  font-size: 1.5rem;
  line-height: 1.1;
  margin: 0 0 1rem;
  letter-spacing: 0;

  text-align: ${({ $isHomepage }) => ($isHomepage ? 'center' : 'left')};
  font-size: ${({ $isHomepage }) => ($isHomepage ? '1.625rem' : '1.5rem')};

  @media (min-width: ${materialSMBreakpoint}) {
    margin: ${({ $isHomepage }) => ($isHomepage ? '0 0 1rem' : '0 0 1.25rem')};
    font-size: ${({ $isHomepage }) => ($isHomepage ? '2.25rem' : '1.5rem')};
  }
`;

export const ButtonGroup = styled(ToggleButtonGroup)`
  width: fit-content;
  background-color: ${COLOR_MAP.GREY_1};
  border-radius: 4px;
`;

export const Button = styled(ToggleButton).attrs(props => ({
  disableRipple: true,
}))`
  ${props => props.theme.fonts.regularBook};
  padding: 0.5rem;
  border: none;
  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
  .MuiToggleButton-label {
    color: ${COLOR_MAP.GRAY_BODY_COPY};
    text-transform: none;
    line-height: 1.4;
    white-space: no-wrap;
  }
  &.Mui-selected {
    ${props => props.theme.fonts.regularBookMidWeight};
    background-color: white;
    .MuiToggleButton-label {
      color: ${COLOR_MAP.BLACK};
    }
    &:hover {
      background-color: white;
    }
    border: 1px solid ${COLOR_MAP.GREY_3};
    border-radius: 3px;
  }
`;
