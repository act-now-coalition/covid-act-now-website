import styled from 'styled-components';
import palette from 'assets/theme/palette';

export const StyledNewsletter = styled.div`
  form {
    display: flex;
    margin-top: 1rem;

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
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

      &[hidden] {
        display: none;
      }
    }

    button {
      cursor: pointer;
      display: block;
      appearance: none;
      box-sizing: border-box;
      height: 2.5rem;
      flex-shrink: 0;
      flex: 1;
      min-width: 95px;
      outline: 0;
      border: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      appearance: none;
      font-size: 0.875rem;
      padding: 0.25rem 1.25rem;
      line-height: 2rem;
      text-transform: uppercase;
      transition: 0.3s ease background-color;
      background-color: ${palette.secondary.main};
      color: ${palette.white};
      font-weight: 700;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

      &:hover {
        background-color: ${palette.secondary.dark};
      }
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
