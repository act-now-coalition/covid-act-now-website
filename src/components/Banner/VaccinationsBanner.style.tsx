import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled.div`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 1.75rem;
  align-items: center;
  justify-content: center;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    padding: 2.5rem 1rem;
  }
`;

export const Button = styled(MuiButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
  variant: 'contained',
}))`
  font-size: 13px;

  &:first-of-type {
      background-color: ${COLOR_MAP.BLUE};
      color: white;
      box-shadow: box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  }

  &:last-of-type {
    background-color: ${COLOR_MAP.LIGHTGRAY_BG};
    color: ${COLOR_MAP.BLUE};
    box-shadow: none;
    margin-left: .5rem;
    &:hover {
        text-decoration: underline;
    }
}
  `;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    align-items: flex-start;
    text-align: left;
    max-width: 480px;
  }
`;

export const Header = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Body = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 15px;
  margin-bottom: 1.25rem;
  line-height: 1.5;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 0;
    margin-right: 2.5rem;
    background-color: white;
    height: 104px;
    min-width: 104px;
  }
`;

export const Icon = styled.img`
  height: 64px;
`;
