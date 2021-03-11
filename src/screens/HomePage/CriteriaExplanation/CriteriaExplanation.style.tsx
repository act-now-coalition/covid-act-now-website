import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { BetaTag } from 'components/LocationPage/ChartsHolder.style';
import { COLOR_MAP } from 'common/colors';

export const CriteriaList = styled.div`
  display: flex;
  margin: 0 -0.5rem;
  flex-direction: column;

  @media (min-width: 600px) {
    margin: 0 -1rem;
    flex-wrap: nowrap;
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  margin: 0 1rem;
  padding: 2.5rem 0;
  max-width: 1000px;
  border-bottom: 1px solid ${palette.lightGray};
  border-top: 1px solid ${palette.lightGray};

  @media (min-width: 600px) {
    padding-top: 3rem;
    margin-top: 0;
  }
`;

export const Criterion = styled.div`
  padding: 0 0.5rem 1.5rem;
  display: flex;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (min-width: 600px) {
    flex: 1;
    flex-direction: row;
    padding: 0 1rem;
    flex-direction: column;
  }

  ${BetaTag} {
    width: fit-content;
    margin-left: 0;
    transform: none;
    font-family: Source Code Pro;
    font-weight: bold;
  }
`;

export const KickerWrapper = styled(Box)`
  display: flex;
  width: fit-content;
`;

export const KickerContent = styled.span`
  color: ${palette.secondary.main};
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${COLOR_MAP.GREY_1};
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  padding: 0.25rem 0.5rem;
  font-size: 15px;
  line-height: 18px;
  margin-right: 1.25rem;

  @media (min-width: 600px) {
    display: flex;
    font-size: 13px;
    margin-bottom: 0.75rem;
    border: none;
    width: unset;
    height: unset;
    padding: 0;
    margin-right: 0;
    font-weight: 500;
  }
`;

export const CriterionHeader = styled(Typography)`
  font-size: 15px;
  font-weight: 900;
  line-height: 18px;
  margin-bottom: 0.25rem;
  text-transform: uppercase;

  @media (min-width: 600px) {
    font-size: 16px;
    margin-bottom: 0.5rem;
  }
`;

export const CriterionDescription = styled(Typography)`
  font-family: Roboto;
  font-size: 14px;
  line-height: 140%;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-bottom: 0.25rem;

  @media (min-width: 600px) {
    margin-bottom: 0.75rem;
  }
`;

export const ListSubheader = styled(Typography)`
  font-family: Roboto;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 2.5rem;

  @media (min-width: 600px) {
    font-size: 32px;
    line-height: 37px;
    margin-bottom: 3.5rem;
  }
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 4;
`;
