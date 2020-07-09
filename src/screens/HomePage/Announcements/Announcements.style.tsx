import styled from 'styled-components';
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
  font-family: Roboto;
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
  margin-bottom: 2.5rem;
  color: #4f4f4f;
  line-height: 140%;
`;

export const ButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const ReadMoreButton = styled(Box)`
  border-radius: 4px;
  background-color: #e0e0e0;
  color: white;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 1rem 2rem;
  width: 160px;
  margin-bottom: 1.5rem;

  @media (min-width: 600px) {
    margin-bottom: 0;
  }
`;

export const ViewAllLink = styled.a`
  font-family: Roboto;
  font-size: 15px;
  color: ${COLOR_MAP.BLUE};
  display: flex;
  align-self: center;

  @media (min-width: 600px) {
    margin-left: 1.75rem;
  }
`;
