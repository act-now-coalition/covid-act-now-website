import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

/**
 * Notes:
 *
 * 1. Use the Typography component from Material UI when possible, since it
 *    has props that allows to customize some styling (align, gutterBottom, etc),
 *    which can help us reduce the amount of style overrides.
 *
 *    Example:
 *
 *        <Subtitle1 align="center">how we determine risk factors</Subtitle1>
 *
 *    instead of
 *
 *      export const RiskFactorsSubtitle = styled(Subtitle1)`
 *        text-align: center
 *      `;
 *
 *     <RiskFactorsSubtitle>how we determine risk factors</RiskFactorsSubtitle>
 *
 * 2. The `theme` prop here comes from the theme provider from styled components
 *    (see the `ScThemeProvider` wrapper in App.js. This would allow us to
 *    dynamically change the theme on specific context (embeds, for example) or
 *    at the application level (if we were to implement a dark theme).
 */

export const Subtitle1 = styled(Typography).attrs(props => ({
  variant: 'body1',
}))`
  ${props => props.theme.fonts.subtitle1};
`;
