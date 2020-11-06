import { sanitizeID, Markdown, TocItem } from '../utils';
import content from './contact.json';

interface ContactUsSection {
  sectionId: string;
  header: string;
  body: Markdown;
}

interface ContactUsContent {
  header: string;
  intro?: Markdown;
  sections: ContactUsSection[];
}

function sanitizeSection(section: ContactUsSection): ContactUsSection {
  return {
    sectionId: sanitizeID(section.sectionId),
    header: section.header,
    body: section.body,
  };
}

function sanitizeContent(content: ContactUsContent): ContactUsContent {
  return {
    header: content.header,
    intro: content?.intro || '',
    sections: content.sections.map(sanitizeSection),
  };
}

export const contactUsContent = sanitizeContent(content as ContactUsContent);

export const sidebarItems: TocItem[] = [
  {
    to: '/contact',
    label: 'Contact us',
    items: contactUsContent.sections.map(section => ({
      to: `/contact#${section.sectionId}`,
      label: section.header,
    })),
  },
];
