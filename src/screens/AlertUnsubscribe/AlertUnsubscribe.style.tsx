import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled.div`
  width: 900px;
  margin: 125px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UnsubscribeHeader = styled(Typography)`
  font-family: Roboto;
  font-size: 2rem;
`;

export const UnsubscribeAllButton = styled.button`
  width: fit-content;
  font-family: Roboto;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  background-color: ${COLOR_MAP.BLUE};
  border: 1px solid #3ba5c8;
  border-radius: 4px;
  cursor: pointer;
  padding: 1.5rem 2rem;

  &:hover {
    background-color: #3ba5c8;
  }
`;
