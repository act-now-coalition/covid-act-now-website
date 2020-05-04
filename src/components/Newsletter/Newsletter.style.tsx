import styled from 'styled-components';
import palette from 'assets/theme/palette';

export const StyledNewsletter = styled.div`
  form {
    display: flex;

    input {
      flex: 3;
      display: block;
      padding: 0.25rem 0.75rem;
      line-height: 2rem;
      height: 3.25rem;
      outline: 0;
      border: 1px solid rgba(0, 0, 0, 0.12);
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
      height: 3.25rem;
      flex-shrink: 0;
      flex: 1;
      outline: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      appearance: none;
      font-size: 0.875rem;
      padding: 0.25rem 1.25rem;
      line-height: 2rem;
      text-transform: uppercase;
      transition: 0.3s ease background-color;
      background-color: ${palette.info.main};
      border: 1px solid ${palette.info.dark};
      color: ${palette.white};
      font-weight: 700;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

      &:hover {
        background-color: ${palette.info.dark};
      }
    }
  }
`;
