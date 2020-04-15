import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const PublicCallToActionContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const PublicCallToActionColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1em;

  @media only screen and (min-width: 768px) {
    max-width: 50%;
  }
`;

export const PublicCallToActionHeader = styled(Typography)`
  padding-bottom: 1rem;
  font-weight: 800;
`;

export const PublicCallToActionContentBlock = styled(Box)`
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const PublicCallToActionContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5rem 0;

  @media only screen and (min-width: 768px) {
    padding: 0.5rem;
  }
`;

export const ListIconNumber = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  width: 1.8rem;
  min-width: 1.8rem;
  margin: 0.7rem 0.5rem 0 0;
  border-radius: 2rem;
  background-color: #4be6bf;
  color: white;
  font-weight: 800;
`;

export const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  width: 1.8rem;
  min-width: 1.8rem;
  margin: 0.8rem 0.5rem 0 0;
  > svg {
    font-size: 2rem;
    color: ${props => props.iconColor || 'blue'};
  }
`;
