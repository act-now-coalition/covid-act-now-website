import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div``;

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
`;

export const FeedbackBox = styled(Paragraph)`
  font-size: 14px;
  padding: 16px;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
`;

export const Heading3 = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

export const LocationLink = styled(Button).attrs(props => ({
  variant: 'outlined',
  disableRipple: true,
  disableFocusRipple: true,
  focusVisibleClassName: 'Button-focused',
}))`
  color: ${COLOR_MAP.LIGHT_BLUE};
  text-transform: none;

  border: 1px solid ${COLOR_MAP.LIGHTGRAY};
  border-radius: 3px;

  &.Button-focused {
    outline: blue auto 1px;
    outline: -webkit-focus-ring-color auto 1px;
  }
`;

export const ButtonContainer = styled.div`
  & > * {
    margin-right: 8px;
  }
`;
