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
  font-size: 1.75rem;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid ${palette.lightGray};
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;
