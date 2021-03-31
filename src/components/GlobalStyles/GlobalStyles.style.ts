import { createGlobalStyle } from 'styled-components';
import theme from 'assets/theme';

// TODO(pablo): We want to grab these from the ThemeProvider:
// color: ${props => props.theme.colors.interactiveBase} but TS
// complains if we do
const GlobalStyle = createGlobalStyle`
  a {
    color: ${theme.colors.interactiveBase};
  }

  a:hover {
    color: ${theme.colors.interactiveHover};
    text-decoration: underline;
  }
`;

export default GlobalStyle;
