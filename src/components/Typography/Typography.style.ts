import styled from 'styled-components';
import theme from 'assets/theme';
import Typography from '@material-ui/core/Typography';

export const Subtitle = styled(Typography).attrs(props => ({
  variant: 'p',
}))`
  ${theme.fonts.subtitle};
`;
