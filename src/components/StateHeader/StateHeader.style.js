import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const HeaderHighlight = styled.span`
  color: ${props => props.color};
  font-weight: 600;
`;

export const HeaderTitle = styled(Typography)`
  margin-top: 1.7rem;
  font-size: 1.7rem;
  line-height: 2.2rem;

  @media(min-width: 600px) {
    margin-top: 1rem;
    font-size: 2rem;
    line-height: 2.7rem;
  }
`;

export const HeaderRule = styled(Typography)`
  width: 80px;
  height: 1px;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0.4;
  margin: 1.25rem 0;

  @media(min-width: 1280px) {
    width: 100px;
    margin: 1.5rem auto;
  }
`;

export const HeaderSubCopy = styled(Typography)`
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6rem;

  @media(min-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
`;
export const HeaderDisclaimer = styled(Typography)`
  font-size: 1rem;
  line-height: 1.6rem;

  a {
    color: red;
  }
`;

export const StyledStateHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #F2F2F2;
  padding: 2rem;
  margin: 0;

  @media(min-width: 1280px) {
    text-align: center;
    align-items: center;
    padding: 1.5rem 2rem;
    flex-direction: row;
  }
`;

export const StyledStateHeaderInner = styled.div`
  max-width: 600px;

  @media(min-width: 1280px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const StyledStateImageWrapper = styled.div`
  @media(min-width: 1280px) {
    display: flex;
    justify-content: center;
  }
`;

