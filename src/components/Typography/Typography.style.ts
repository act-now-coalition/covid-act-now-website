import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

/**
 * https://material-ui.com/api/typography/
 */

export const Subtitle1 = styled(Typography).attrs(props => ({
  variant: 'body1',
}))`
  ${props => props.theme.fonts.subtitle1};
`;
