import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const HeaderHighlight = styled.span`
  color: ${props => props.color};
  font-weight: 600;
`;

export const HeaderTitle = styled(Typography)`
  font-size: 1.5rem;
  line-height: 1.75rem;
`;

export const HeaderSubCopy = styled(Typography)`
  margin-top: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgba(0, 0, 0, 0.7);
`;

export const StyledStateHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 2rem;
  margin: 0;

  @media (min-width: 600px) {
    align-items: center;
    flex-direction: row;
  }
`;

export const StyledStateHeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;

  @media (min-width: 600px) {
    margin: 0 auto;
    flex-direction: row;
  }
`;

export const StyledStateImageWrapper = styled.div`
  height: 64px;
  margin-bottom: 2em;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    margin-right: 2em;
    margin-bottom: 0;
  }
`;

export const StyledStateCopyWrapper = styled.div`
  text-align: left;
  max-width: 600px;
`;
