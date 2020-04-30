import styled from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';

export const ShareSpacer = styled.div`
  padding-right: 32px;

  @media (max-width: 600px) {
    padding-right: 16px;
  }
`;

export const ShareContainer = styled.div<{
  condensed?: boolean;
  forceVertical?: boolean;
}>`
  background: ${palette.white};
  max-width: 900px;
  margin: ${props => (props.condensed ? 0 : '3rem 0')};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  @media screen and (min-width: 900px) {
    display: ${props => (props.forceVertical ? 'block' : 'flex')};
  }
`;

export const ShareInstruction = styled(Typography)<{ component?: string }>`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6rem;
  color: ${palette.black};
  text-align: left;
`;

export const ShareButtonContainer = styled.div<{ reflow: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 -0.75rem;

  > div {
    margin: 0 0.75rem;
  }

  @media (max-width: 600px) {
    margin: -0.5rem;
    flex-wrap: ${props => (props.reflow ? 'wrap' : 'nowrap')};

    > div {
      margin: 0.5rem;
      min-width: ${props => (props.reflow ? '40%' : '0')};
    }
  }
`;

export const ShareType = styled.div<{ forceVertical?: Boolean }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
  flex: 1;
  &:last-child {
    border-bottom: 0;
  }


  @media (min-width: 900px) {
    border-right: ${props =>
      props.forceVertical ? '0' : '1px solid rgba(0, 0, 0, 0.12);'}
    border-bottom: ${props =>
      props.forceVertical ? '1px solid rgba(0, 0, 0, 0.12);' : '0'};

    &:last-child {
      border-right: 0;
    }
  }
`;

export const StyledShareButton = styled.div<{
  color: string;
  disableElevation?: boolean /* seems to do nothing? */;
  variant?: string;
}>`
  background-color: ${props => props.color};
  border-radius: 5px;
  cursor: pointer;
  color: white;
  display: block;
  flex: 1;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  height: 2.5rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  user-select: none;
  text-align: center;

  > button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  svg {
    display: block;
  }
`;
