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

const sanitizeSection = (section: ContactUsSection): ContactUsSection => ({
  sectionId: sanitizeID(section.sectionId),
  header: section.header,
  body: section.body,
});

const sanitizeContent = (content: ContactUsContent): ContactUsContent => ({
  header: content.header,
  intro: content?.intro || '',
  sections: content.sections.map(sanitizeSection),
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

interface Page<T> {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  sidebarItems: TocItem[];
  content: T;
}

export const ContactPage: Page<ContactUsContent> = {
  pageTitle: 'Contact Us',
  pageDescription: '',
  canonicalUrl: '/contact',
  sidebarItems,
  content: contactUsContent,
};
