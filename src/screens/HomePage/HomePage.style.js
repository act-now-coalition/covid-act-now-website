import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const PartnerSection = styled.div`
  padding: 0 1rem 1rem;
`;

export const PartnerHeader = styled(Typography)`
  font-size: 1rem;
  padding-top: 4rem;
  margin-top: 3rem;
  color: rgba(0, 0, 0, 0.7);
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
  color: rgba(0, 0, 0, 0.7);
  letter-spacing: 0.08em;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
