import { Markdown } from '../utils';

export interface InfoTooltip {
  title: string;
  id: string;
  body: Markdown;
  cta: Markdown;
}
