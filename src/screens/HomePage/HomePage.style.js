import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const SearchBarThermometerWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin: 0 1rem -3.5rem;
  }
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const PartnerSection = styled.div`
  padding: 0 1rem 1rem;
`;

export const PartnerHeader = styled(Typography)`
  padding-top: 2.5rem;
  margin-top: 2.5rem;
  border-top: 1px solid ${palette.lightGray};
  text-align: center;
  margin-bottom: 1rem;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const FeaturedHeader = styled(Typography)`
  font-size: 1rem;
  margin-top: 4rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const SectionWrapper = styled(Box)`
  margin-bottom: 2.5rem;
`;

export const BannerContainer = styled.div`
  margin: 0 auto;

  @media (min-width: ${mobileBreakpoint}) {
    margin-top: 2rem;
    max-width: 640px;
  }
`;
