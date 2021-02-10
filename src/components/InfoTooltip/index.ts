import InfoTooltip from './InfoTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  description: string;
};

export { InfoTooltip };
