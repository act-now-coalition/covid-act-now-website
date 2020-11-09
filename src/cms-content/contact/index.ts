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
  metadataTitle: string;
  metadataDescription: string;
}

const sanitizeSection = (section: ContactUsSection): ContactUsSection => ({
  sectionId: sanitizeID(section.sectionId),
  header: section.header,
  body: section.body,
});

const sanitizeContent = (content: ContactUsContent): ContactUsContent => ({
  header: content.header,
  intro: content?.intro || '',
  sections: content.sections.map(sanitizeSection),
  metadataDescription: content.metadataDescription,
  metadataTitle: content.metadataDescription,
});

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
