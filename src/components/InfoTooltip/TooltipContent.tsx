import React from 'react';
import { InfoIcon, StyledMarkdown } from './InfoTooltip.style';
import Tooltip from '@material-ui/core/Tooltip';
import { TrendingUpRounded } from '@material-ui/icons';
import { MarkdownBody } from 'components/Markdown';
import { useBreakpoint } from 'common/hooks';

const TooltipContent: React.FC<{ body: string; cta: string }> = ({
  body,
  cta,
}) => {
  const isMobile = useBreakpoint(600);
  return (
    <>
      <StyledMarkdown source={body} />
      {isMobile && <br />}
      <StyledMarkdown source={cta} />
    </>
  );
};

export default TooltipContent;
