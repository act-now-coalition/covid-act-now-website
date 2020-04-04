import styled from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';

export const StyledNewsletter = styled.div`
  max-width: 640px;
  margin: 0 auto 3rem;
  border: 1px solid ${palette.divider};
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);

  p {
    margin-top: 0;
    text-align: center;
    color: ${palette.black};
  }

  form {
    display: flex;

    input {
      flex: 3;
      display: block;
      padding: 0.25rem 0.75rem;
      line-height: 2rem;
      height: 2.5rem;
      outline: 0;
      border: 1px solid ${palette.divider};
      border-right-width: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      appearance: none;
      font-size: 0.875rem;
      box-sizing: border-box;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;

      &[hidden] {
        display: none;
      }
    }

    button {
      display: block;
      appearance: none;
      box-sizing: border-box;
      height: 2.5rem;
      flex-shrink: 0;
      flex: 1;
      outline: 0;
      border: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      appearance: none;
      font-size: 0.875rem;
      padding: 0.25rem 1.25rem;
      line-height: 2rem;
      text-transform: uppercase;
      background-color: ${palette.secondary.main};
      color: ${palette.white};
      font-weight: 700;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
  }

  @media screen and (max-width: 640px) {
    form {
      display: block;

      input {
        border-top-right-radius: 4px;
        border-bottom-left-radius: 0;
        border-right-width: 1px;
        border-bottom-width: 0;
        width: 100%;
      }

      button {
        border-top-right-radius: 0;
        border-bottom-left-radius: 4px;
        width: 100%;
      }
    }
  }
`;

export const NewsletterCopy = styled(Typography)`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6rem;
  color: rgba(0, 0, 0, 0.7);
`;
