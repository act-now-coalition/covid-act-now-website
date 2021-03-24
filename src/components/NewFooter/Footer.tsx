import React from 'react';
import { StyledFooter } from './Menu.style';
import MenuContent from './MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { ThemeProvider } from 'styled-components';
import { megaMenuFooter } from 'assets/theme/palette';
import theme from 'assets/theme';
import LogoNonUrl from 'assets/images/LogoNonUrl';
import { useIsEmbed } from 'common/utils/hooks';

const Footer: React.FC = () => {
  const isEmbed = useIsEmbed();

  const onClick = (label: string) => {
    trackEvent(EventCategory.FOOTER, EventAction.NAVIGATE, label);
  };

  if (isEmbed) {
    return null;
  }

  return (
    <ThemeProvider
      theme={{
        ...theme,
        palette: { ...theme.palette, megaMenu: megaMenuFooter },
      }}
    >
      <StyledFooter role="contentinfo">
        <MenuContent onClick={onClick} Logo={LogoNonUrl} />
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;
