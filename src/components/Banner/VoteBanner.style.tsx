import styled, { css } from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';

export const BannerContainer = styled.div`
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
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

export const CopyContainer = styled.div`
  h1,
  p {
    font-family: Roboto;
    line-height: 1.4;
    font-size: 15px;
    margin: 0 0 0.75rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const SharedButtonStyles = css`
  text-transform: uppercase;
  box-shadow: none;
  line-height: 1.2;
`;

export const MainButton = styled(MuiButton)`
  ${SharedButtonStyles}
  background-color: ${COLOR_MAP.PURPLE};
  color: white;
  padding: .75rem 1rem;

  &:hover {
    background-color: ${COLOR_MAP.PURPLE};
  }
`;

export const SecondaryButton = styled(MuiButton)`
  ${SharedButtonStyles}
  color: ${COLOR_MAP.PURPLE};

  &:hover {
    box-shadow: none;
  }
`;

export const Redirect = styled.a`
  text-decoration: none;

  &:not(:first-child) {
    margin-top: 0.25rem;
  }

  @media (min-width: 600px) {
    &:not(:first-child) {
      margin-top: 0;
      margin-left: 0.25rem;
    }
  }
`;
