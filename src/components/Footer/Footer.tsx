import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledFooter } from './Footer.style';
import MenuContent from 'components/MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { megaMenuFooter } from 'assets/theme';
import LogoNonUrl from 'assets/images/LogoNonUrl';
import { useIsEmbed } from 'common/utils/hooks';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const Footer: React.FC = () => {
  const isEmbed = useIsEmbed();

  const theme = useContext(ThemeContext);
  const { pathname } = useLocation();
  // Extra padding added to the footer for the homepage upsell experiment,
  // which implements a fixed banner to the bottom of the screen:
  const extraPaddingBottom = pathname.includes('/us');

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
        megaMenu: megaMenuFooter,
      }}
    >
      <Experiment id={ExperimentID.HOMEPAGE_UPSELL}>
        <Variant id={VariantID.A}>
          <StyledFooter role="contentinfo">
            <MenuContent onClick={onClick} Logo={LogoNonUrl} />
          </StyledFooter>
        </Variant>
        <Variant id={VariantID.B}>
          <StyledFooter
            role="contentinfo"
            extraPaddingBottom={extraPaddingBottom}
          >
            <MenuContent onClick={onClick} Logo={LogoNonUrl} />
          </StyledFooter>
        </Variant>
      </Experiment>
    </ThemeProvider>
  );
};

export default Footer;
