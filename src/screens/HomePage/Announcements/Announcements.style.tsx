import styled, { css } from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const AnnouncementIntro = styled(Typography)`
  ${props => props.theme.fonts.regularBookBold};
  font-size: 24px;
  line-height: 130%;
  margin-bottom: 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 28px;
  }
`;

export const Date = styled(Typography)`
  ${props => props.theme.fonts.monospace};
  font-size: 13px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-bottom: 1rem;
`;

export const AnnouncementBodyCopy = styled(Typography)`
  line-height: 160%;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ButtonsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    align-items: center;
  }
`;

const SharedButtonStyles = css`
  font-size: 1rem;
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

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 0;
  }
`;

export const ViewAllLink = styled.a`
  ${SharedButtonStyles}

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 2rem;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Content = styled.div`
  max-width: 570px;
  width: 100%;
  margin: auto;
`;
