import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import palette from 'assets/theme/palette';
import { COLORS } from 'enums';

export const HeaderHighlight = styled.span`
  color: white;
  font-weight: 600;
  padding: 0.4rem 0;
`;

export const HeaderTitle = styled(Typography)`
  font-size: 2.2rem;
  line-height: 1.75rem;
  padding: 0.5rem 0 2rem;

  a {
    color: ${palette.black};
  }
`;

export const HeaderSubCopy = styled(Typography)`
  font-size: 1rem;
  line-height: 1.5rem;
  color: white;
  padding: 1.5rem 0 0.2rem;

  + p {
    margin-top: 1rem;
  }
`;

export const StyledLocationPageHeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.bgColor || COLORS.LIGHTGRAY};
  padding: ${props => (props.condensed ? '1.5rem 1.4rem 0.2rem' : '2rem 1rem')};
  margin: 0;

  @media (min-width: 600px) {
    border-bottom: 1px solid #e3e3e3;
    align-items: center;
    flex-direction: row;
  }

  @media (min-width: 900px) {
    padding: 2rem 0;
  }
`;

export const StyledLocationPageHeaderInner = styled.div`
  display: flex;
  flex-direction: ${props => (props.condensed ? 'row' : 'column')};
  margin: 0;

  @media (min-width: 600px) {
    flex-direction: row;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 900px) {
    width: 900px;
  }

  @media (min-width: 1350px) {
    margin: 0 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const StyledStateImageWrapper = styled.div`
  height: 64px;
  margin-bottom: 2em;
  margin-right: 2em;

  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }
`;

export const StyledStateCopyWrapper = styled.div`
  text-align: left;
  max-width: 600px;
`;

export const StyledStatusBadge = styled.div`
  max-width: 150px;
  min-width: 120px;
  border-radius: 2px;
  border: 1px solid ${COLORS.LIGHTGRAY};
  background-color: white;
  color: ${props => props.color || 'darkgray'};

  font-family: 'Source Code Pro', Courier, 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1.6rem;
  text-align: center;
`;

export const StyledDashboardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;

  background-color: ${COLORS.LIGHTGRAY};

  @media (min-width: 600px) {
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin: 0 auto;
    padding: 1rem 2rem;
    position: relative;
    top: -3rem;
  }

  @media (min-width: 900px) {
    width: 800px;
  }

  @media (min-width: 1350px) {
    margin: 0 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const StyledWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledWidgetTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
`;

export const StyledWidgetValue = styled(Typography)`
  font-family: 'Source Code Pro', Courier, 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 1rem 0 1.2rem;
`;
