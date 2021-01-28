import MuiButton from '@material-ui/core/Button';
import MuiChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Heading2 = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.5;
  color: ${COLOR_MAP.BLACK};
  margin-bottom: 8px;
`;

export const Paragraph = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.5;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  max-width: 600px;
`;

export const Heading3 = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 4px;
`;

export const Button = styled(MuiButton).attrs(props => ({
  variant: 'outlined',
  disableRipple: true,
  disableFocusRipple: true,
  focusVisibleClassName: 'Button-focused',
}))`
  color: ${COLOR_MAP.LIGHT_BLUE};
  text-transform: none;

  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 3px;

  .MuiButton-label {
    letter-spacing: unset;
  }

  &.Button-focused {
    outline: blue auto 1px;
    outline: -webkit-focus-ring-color auto 1px;
  }
`;

export const ButtonContainer = styled.div`
  & > * {
    margin-right: 8px;
    margin-top: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const ChevronRightIcon = styled(MuiChevronRightIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
`;
