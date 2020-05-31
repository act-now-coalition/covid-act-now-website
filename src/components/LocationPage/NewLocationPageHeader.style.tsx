import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { COLORS } from 'common';

//fix mobile banner height

export const ColoredHeaderBanner = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: ${props => props.bgcolor || COLORS.LIGHTGRAY};

  @media (min-width: 600px) {
    height: 380px;
  }
`;

export const HeaderContainer = styled(Box)<{ condensed?: Boolean }>`
  ${props =>
    props.condensed
      ? `
    display: block;
  `
      : `
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    background-color: unset;
    border-radius: 0;
    box-shadow: none;
    max-width: 900px;
    flex-direction: column;
    cursor: pointer;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: -350px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);

    @media (min-width: 600px) {
      position: relative;
      margin: -3rem 1rem 0;
      flex-direction: column;
      margin: -330px 1rem 0;
    }

    @media (min-width: 932px) {
      margin: -330px auto 0;
    }
    @media (min-width: 1350px) {
      margin: -330px 445px 0 auto;
    }
    @media (min-width: 1750px) {
      margin: -330px auto 0;
    }
  `}
`;

export const HeaderSection = styled(Box)`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  cursor: default;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
    justify-content: space-between;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LocationCopyWrapper = styled(Box)`
  line-height: 1.4;
  margin: 1.5rem;

  @media (min-width: 600px) {
    margin: 2.25rem 0.875rem 2.25rem 2.25rem;
  }
`;

export const HeaderTitle = styled(Typography)<{
  isEmbed?: Boolean;
  textColor: string;
}>`
  color: ${palette.black};
  font-size: ${props => (props.isEmbed ? '1.8rem' : '22px')};
  font-weight: normal;
  line-height: ${props => (props.isEmbed ? '1.5rem' : '2.2rem')};
  padding: 0;
  text-align: center;

  a {
    color: ${props => props.textColor || palette.black};
    text-decoration: none;
  }

  @media (min-width: 600px) {
    font-size: 30px;
    text-align: left;
  }
`;

export const HeaderSubtitle = styled(Typography)`
  font-size: 15px;
  line-height: 1.4;
  color: #4f4f4f;
  margin-top: 1.2rem;

  @media (min-width: 600px) {
    font-size: 16px;
    margin-top: 1rem;
  }
`;

export const HeaderSubCopyWrapper = styled(Box)<{
  verifiedStateStyling?: Boolean;
}>`
  margin: ${({ verifiedStateStyling }) =>
    verifiedStateStyling ? '.4rem 1rem 1rem;' : '1rem'};

  p {
    padding: 0;
  }

  svg {
    transform: translateY(0.75rem);
    margin-right: 0.75rem;
  }

  @media (min-width: 600px) {
    margin: ${({ verifiedStateStyling }) =>
      verifiedStateStyling
        ? '1.5rem 0.875rem 2rem 1.5rem'
        : '1.5rem 0.875rem 1.5rem 1.5rem'};

    svg {
      transform: translateY(0.35rem);
    }
  }
`;

export const HeaderSubCopy = styled(Typography)<{ textColor: string }>`
  color: #828282;
  font-size: 13px;
  line-height: 1.4;
  padding: 1.5rem 0 0.2rem;

  a {
    color: #828282;
  }

  svg {
    margin: 0 1rem 0 0;
    flex-shrink: 0;
  }

  @media (min-width: 600px) {
    font-size: 14px;
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-right: 1.5rem;
  background-color: white;

  @media (min-width: 600px) {
    width: fit-content;
    background-color: unset;
  }
`;

export const HeaderButton = styled(Box)`
  height: 50px;
  width: 50%;
  font-size: 15px;
  line-height: 1.2;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #00bfea;
  font-weight: 500;
  text-align: center;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f2f2f2;

  &:first-child {
    border-right: 1px solid #f2f2f2;
  }

  @media (min-width: 600px) {
    border-top: none;
    width: 75px;
    height: 40px;

    &:first-child {
      border-right: none;
    }
  }
`;

export const LastUpdatedDate = styled.span<{
  verifiedStateStyling?: Boolean;
}>`
  display: flex;
  margin-left: ${({ verifiedStateStyling }) => verifiedStateStyling && '40px'};

  @media (min-width: 600px) {
    display: inline;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

export const RiskLevelGraphicMobile = styled(Box)`
  @media (min-width: 600px) {
    display: none;
  }
`;

export const RiskLevelGraphicDesktop = styled(Box)`
  display: none;

  @media (min-width: 600px) {
    display: flex;
  }
`;

export const RiskLevelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 170px;
  text-align: center;
  align-items: center;
  align-self: center;
  margin: 1rem auto 0;

  @media (min-width: 600px) {
    margin: auto 2rem auto 0.875rem;
  }
`;

export const RiskLevelTitle = styled.span`
  text-transform: uppercase;
  color: #828282;
  font-size: 14px;
  line-height: 1.4;
  font-family: 'Roboto';
  margin-top: 0.5rem;
`;

export const RiskLevel = styled.span`
  color: black;
  font-family: 'Source Code Pro';
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
`;

export const RiskLevelThermometer = styled(Box)<{ level: number }>`
  height: 8px;
  width: 96px;
  margin-top: 0.5rem;
  border-radius: 5px;
  background: ${({ level }) =>
    level === 3
      ? '#e3e3e3'
      : 'linear-gradient(to right, rgb(0, 208, 125), rgb(0, 208, 125) 33.33%, #FFAB00 33.33%, #FFAB00 66.66%, #FF0034 66.66%)'};
`;

export const Triangle = styled(Box)<{ level: number }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid black;
  margin-top: 6px;
  margin-left: ${({ level }) =>
    level === 0 ? '-64px' : level === 2 ? '64px' : '0'};
`;
