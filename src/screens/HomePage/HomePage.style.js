import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import palette from 'assets/theme/palette';

export const SearchBarThermometerWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin: 0 1rem -2rem;
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
  font-size: 1rem;
  padding-top: 2.5rem;
  margin-top: 2.5rem;
  color: #828282;
  letter-spacing: 0.08em;
  border-top: 1px solid ${palette.lightGray};
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const FeaturedHeader = styled(Typography)`
  font-size: 1rem;
  margin-top: 4rem;
  color: #828282;
  letter-spacing: 0.08em;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const SectionWrapper = styled(Box)`
  margin-bottom: 2.5rem;
`;
