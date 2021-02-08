import { Markdown } from '../utils';

export interface InfoTooltip {
  title: string;
  id: string;
  content: Markdown;
  cta: Markdown;
}
