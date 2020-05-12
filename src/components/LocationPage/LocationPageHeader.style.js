import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import palette from 'assets/theme/palette';
import { COLORS } from 'common';

export const HeaderTitle = styled(Typography)`
  color: ${props => props.textColor || 'white'};
  font-size: ${props => (props.isEmbed ? '1.8rem' : '2.2rem')};
  font-weight: 600;
  line-height: ${props => (props.isEmbed ? '1.5rem' : '2.2rem')};
  padding: 0 1rem 0 0;
  a {
    color: ${props => props.textColor || palette.black};
  }
`;

export const HeaderSubCopy = styled(Typography)`
  color: ${props => props.textColor || 'white'};
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1.5rem 0 0.2rem;

  a {
    color: ${props => props.textColor || 'white'};
  }

  svg {
    margin: 0 1rem 0 0;
    flex-shrink: 0;
  }
`;

export const StyledLocationPageHeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.bgColor || COLORS.LIGHTGRAY};
  padding: ${props => (props.condensed ? '1.5rem 1.4rem 0.2rem' : '0 1rem')};
  margin: 0;
  @media (min-width: 600px) {
    border-bottom: 1px solid #e3e3e3;
    align-items: center;
    flex-direction: row;
  }
  @media (min-width: 932px) {
    padding: 0;
  }
`;

export const StyledLocationPageHeaderInner = styled.div`
  display: flex;
  flex-direction: ${props => (props.condensed ? 'row' : 'column')};
  margin: 0;
  padding: 2rem 0;
  max-width: 900px;

  @media (min-width: 600px) {
    flex-direction: row;
    padding: 3.75rem 0 6rem;
  }
  @media (min-width: 932px) {
    margin: 0 auto;
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

export const StyledStateCopyWrapper = styled(Box)`
  width: 100%;
  display: ${props => (props.isEmbed ? 'flex' : 'block')};
  padding-bottom: ${props => (props.isEmbed ? '1rem' : 0)};
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: left;
  max-width: 600px;
`;
