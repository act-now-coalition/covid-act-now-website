import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { contactUsContent, sidebarItems } from 'cms-content/contact';

const {
  header,
  intro,
  sections,
  metadataDescription,
  metadataTitle,
} = contactUsContent;

const ContactUsPage: React.FC = () => (
  <Fragment>
    <AppMetaTags
      canonicalUrl="/contact"
      pageTitle={metadataTitle}
      pageDescription={metadataDescription}
    />
    <PageContent sidebarItems={sidebarItems}>
      <Heading1>{header}</Heading1>
      {intro && intro.length && <MarkdownContent source={intro} />}
      {sections.map(({ sectionId, header, body }) => (
        <Fragment key={sectionId}>
          <Heading2 id={sectionId}>{header}</Heading2>
          <MarkdownContent source={body} />
        </Fragment>
      ))}
    </PageContent>
  </Fragment>
);

export default ContactUsPage;
