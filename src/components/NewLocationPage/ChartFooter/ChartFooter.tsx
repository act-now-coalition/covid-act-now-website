import React from 'react';
import useBreakpoint from 'common/hooks/useBreakpoint';
import { Footer, Disclaimer, StyledSpan } from './ChartFooter.style';

const isMobile = useBreakpoint(600);

interface FooterProps {
  shareButton: any;
  footerText?: string;
  footerLinkOrLegend?: any;
}

const ChartFooter: React.FC<FooterProps> = ({
  shareButton,
  footerText,
  footerLinkOrLegend,
}) => {
  return (
    <Footer>
      <Disclaimer>
        {footerText}
        {isMobile && footerLinkOrLegend && (
          <StyledSpan>{footerLinkOrLegend}</StyledSpan>
        )}
        {!isMobile && <>{footerLinkOrLegend}</>}
      </Disclaimer>
      {shareButton}
    </Footer>
  );
};

export default ChartFooter;
