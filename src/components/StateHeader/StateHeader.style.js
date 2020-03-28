import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const HeaderHighlight = styled.span`
  color: ${props => props.color};
  font-weight: 600;
`;

export const HeaderTitle = styled(Typography)`
  margin-top: 2rem;
  font-size: 1.5rem;
  line-height: 1.75rem;
`;

export const HeaderRule = styled(Typography)`
  width: 64px;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 1rem 0;

  @media (min-width: 600px) {
    margin: 2rem auto;
  }
`;

export const HeaderSubCopy = styled(Typography)`
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 0.7);
`;
export const HeaderDisclaimer = styled(Typography)`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(0, 0, 0, 0.7);

  a {
    color: red;
  }
`;

export const StyledStateHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 2rem;
  margin: 0;

  @media (min-width: 600px) {
    text-align: center;
    align-items: center;
    flex-direction: row;
  }
`;

export const StyledStateHeaderInner = styled.div`
  max-width: 600px;

  @media (min-width: 600px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const StyledStateImageWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
  }
`;
