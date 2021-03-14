import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';

export const ShareSpacer = styled.div`
  padding-right: 32px;

  @media (max-width: 600px) {
    padding-right: 16px;
  }
`;

export const ShareContainer = styled.div`
  @media print {
    display: none;
  }
`;

export const ShareInstructionHeader = styled(Typography)<{
  $alertsInstructions?: boolean;
}>`
  margin-top: 0;
  margin-bottom: ${({ $alertsInstructions }) =>
    $alertsInstructions ? '1.25rem' : '1rem'};
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2rem;
  color: inherit;

  @media (min-width: 600px) {
    font-size: 2.125rem;
    line-height: 2.25rem;
  }
`;

export const ShareInstructionBody = styled(Typography)<{
  $alertsInstructions?: boolean;
}>`
  margin-top: 0;
  margin-bottom: ${({ $alertsInstructions }) =>
    $alertsInstructions ? '1.5rem' : '1rem'};
  line-height: 1.6rem;
  color: inherit;
`;

export const ShareRow = styled.div<{ newsletter?: Boolean }>`
  background-color: ${props =>
    props.newsletter ? '#FBFBFB' : palette.secondary.main};
  color: ${props => (props.newsletter ? palette.black : palette.white)};
  padding: 4.5rem 1rem;

  @media (min-width: 600px) {
    padding: ${({ newsletter }) =>
      newsletter ? '5rem 1rem 4rem' : '6rem 1rem'};
    max-height: 500px;
    overflow: hidden;
  }
`;

export const ShareRowContentArea = styled.div<{
  $isMatchingProjectionsRoute?: Boolean;
}>`
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  @media (min-width: 1350px) {
    max-width: 900px;
    margin: ${(props: any) =>
      props.$isMatchingProjectionsRoute ? '0 445px 0 auto' : '0 auto'};
    position: relative;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const NewsletterMockupWrapper = styled.div`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  margin: -1rem 0 -6rem;

  @media (max-width: 599px) {
    display: none;
  }
`;

export const SocialMockupWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  @media screen and (min-width: 600px) {
    width: 50%;
    padding-left: 1.5rem;
    margin: -1.5rem 0;
  }
`;

export const NewsletterTextArea = styled.div`
  @media screen and (min-width: 600px) {
    width: 50%;
    padding-left: 1.5rem;
  }
`;

export const SocialTextAreaWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const SocialTextArea = styled.div`
  text-align: center;

  @media (min-width: 600px) {
    text-align: left;
    max-width: 21rem;
  }
`;

export const EmbedPrompt = styled(Typography)`
  text-align: center;
  color: inherit;
  max-width: 15rem;
  line-height: 1.5rem;
  margin: 1rem auto 3rem;

  span {
    cursor: pointer;
    text-decoration: underline;
  }

  @media (min-width: 600px) {
    margin: 0;
  }
`;

export const ShareButtonContainer = styled.div<{ reflow: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  max-width: 15rem;
  margin: 1.5rem auto 0;
  position: relative;

  &:before {
    content: ' ';
    height: 0;
    right: 100%;
    top: 1.25rem;
    width: 2.5rem;
    height: 6.25rem;
    position: absolute;
    border-top: 1px dashed ${palette.white};
    border-left: 1px dashed ${palette.white};
  }
  &:after {
    content: ' ';
    background-color: #cbcbcb;
    height: 1rem;
    width: 1rem;
    top: 6.75rem;
    border-radius: 50%;
    border: 0.25rem solid ${palette.white};
    position: absolute;
    left: -3rem;
    margin-top: 0.75rem;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    &:before {
      width: 1.25rem;
    }
    &:after {
      left: -1.75rem;
    }
  }

  @media (min-width: 600px) {
    margin: 1.5rem 0 0.75rem;
    position: static;

    &:before {
      height: 0;
      left: 15rem;
      right: -1.5rem;
      height: 1.25rem;
      width: auto;
      border-top: 0;
      border-left: 0;
      top: auto;
      border-bottom: 1px dashed ${palette.white};
    }
    &:after {
      top: auto;
      right: -2rem;
      left: auto;
      margin-top: 0.75rem;
    }
  }
`;

export const StyledShareButtonStyles = css<{
  color?: string;
  variant?: string;
}>`
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  > button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  svg {
    display: block;
    rect {
      fill: transparent;
    }
    path {
      fill: ${props => (props.color ? props.color : '#000')};
    }
  }
`;

export const StyledShareButton = styled.div`
  ${StyledShareButtonStyles}
`;
