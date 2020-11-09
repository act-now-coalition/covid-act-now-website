import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import { Anchor } from 'components/TableOfContents';
import MainContent from 'components/PageContent';
import { contactUsContent, sidebarItems } from 'cms-content/contact';

const { header, intro, sections } = contactUsContent;

const ContactUsPage: React.FC = () => (
  <Fragment>
    <AppMetaTags
      canonicalUrl="/contact"
      pageTitle="Contact us"
      pageDescription="We’re here to help. Drop us a line."
    />
    <MainContent sidebarItems={sidebarItems}>
      <Heading1>{header}</Heading1>
      {intro && intro.length && <MarkdownContent source={intro} />}
      {sections.map(({ sectionId, header, body }) => (
        <Fragment key={sectionId}>
          <Anchor id={sectionId} />
          <Heading2>{header}</Heading2>
          <MarkdownContent source={body} />
        </Fragment>
      ))}
    </MainContent>
  </Fragment>
);

export default ContactUsPage;
