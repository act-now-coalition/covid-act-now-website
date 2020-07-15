import styled, { css } from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 570px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const AnnouncementsSectionHeader = styled(Typography)`
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #828282;
  margin-bottom: 0.75rem;

  @media (min-width: 600px) {
    font-size: 15px;
  }
`;

export const AnnouncementIntro = styled(Typography)`
  font-family: Roboto;
  font-weight: 900;
  font-size: 24px;
  line-height: 140%;
  margin-bottom: 1rem;

  @media (min-width: 600px) {
    font-size: 32px;
    line-height: 140%;
  }
`;

export const Date = styled(Typography)`
  font-family: Source Code Pro;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #828282;
  margin-bottom: 1.25rem;
`;

export const AnnouncementBodyCopy = styled(Typography)`
  font-family: Roboto;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.01em;
  margin-bottom: 1.5rem;
  color: #828282;
  line-height: 140%;

  @media (min-width: 600px) {
    margin-bottom: 2.5rem;
  }
`;

export const ButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SharedButtonStyles = css`
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.4;
  color: ${COLOR_MAP.BLUE};
  display: flex;
`;

export const ReadMoreButton = styled.a`
  ${SharedButtonStyles}
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-weight: 500;
  justify-content: center;
  padding: 0.75rem 0;
  width: 160px;
  margin-bottom: 1.5rem;
  text-decoration: none;

  &:hover {
    border: 1px solid ${COLOR_MAP.BLUE};
  }

  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`;

export const ViewAllLink = styled.a`
  ${SharedButtonStyles}

  @media (min-width: 600px) {
    margin-left: 2rem;
  }
`;
