import styled, { css } from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { fonts } from 'common/theme';

export const Wrapper = styled(Box)`
  max-width: 700px;
  width: 100%;
  margin: 80px auto 100px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 1.2rem;

  @media (min-width: 600px) {
    align-items: center;
    margin: 100px auto 125px;
    min-height: 50vh;
  }
`;

export const UnsubscribeHeader = styled(Typography)`
  ${fonts.regularBookBold};
  font-size: 2rem;
  margin-bottom: 2.5rem;
  line-height: 1.2;
`;

const Button = css`
  ${fonts.regularBookBold};
  font-size: 0.875rem;
  line-height: 1.1rem;
  text-transform: uppercase;
  color: white;
  background-color: ${COLOR_MAP.BLUE};
  border: 1px solid #3ba5c8;
  border-radius: 4px;
  cursor: pointer;
  padding: 1.1rem;
  width: 100%;

  @media (min-width: 480px) {
    width: 270px;
  }

  @media (min-width: 600px) {
    margin-top: 0;
    width: 270px;
  }

  &:hover {
    background-color: #3ba5c8;
  }
`;

export const UpdateAlertsButton = styled.button`
  ${Button}
  margin-top: 12px;

  @media (min-width: 600px) {
    margin-left: 1rem;
  }
`;

export const UnsubscribeButton = styled.button`
  ${Button}
`;

export const BodyCopy = styled(Typography)`
  ${fonts.regularBook};
  font-size: 1.1rem;
  margin-bottom: 1.75rem;
  line-height: 1.4;
`;

export const UpdatePreferencesFormWrapper = styled(Box)`
  display: flex;
  width: 100%;
  margin-bottom: 2.5rem;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 600px) {
    align-items: flex-end;
    flex-direction: row;
  }
`;
