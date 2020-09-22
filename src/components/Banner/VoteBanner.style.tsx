import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const BannerContainer = styled.div`
  padding: 1.5rem 1.5rem 1.25rem;
  border-radius: 4px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;

  @media (min-width: 600px) {
    text-align: left;
    padding: 1.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    border: 1px solid #e0e0e0;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    max-width: 4rem;
    margin-left: 2.5rem;
  }
`;

export const Header = styled.h1`
  font-weight: bold;
  margin: 0;
  line-height: 1.25;
  font-size: 1rem;
`;

export const Body = styled.p`
  line-height: 1.4;
  font-size: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
  }

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const SharedButtonStyles = css`
  text-transform: uppercase;
  box-shadow: none;
  line-height: 1.2;
  font-size: 14px;
`;

export const MainButton = styled(MuiButton)`
  ${SharedButtonStyles}
  background: linear-gradient(88.3deg, #00BFEA 1.19%, #FF0034 97.75%);
  color: white;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`;

export const SecondaryButton = styled(MuiButton)`
  ${SharedButtonStyles}
  color: ${COLOR_MAP.BLUE};

  &:hover {
    box-shadow: none;
  }
`;
