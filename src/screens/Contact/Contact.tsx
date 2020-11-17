import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import { Anchor } from 'components/TableOfContents';
import PageContent from 'components/PageContent';
import { contactUsContent, sidebarItems } from 'cms-content/contact';
import { getMetricDefinition, Metric } from 'common/metric';
import { ThermometerBox } from 'components/Thermometer';

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
      <ThermometerBox>
        {getMetricDefinition(Metric.CONTACT_TRACING).renderThermometer()}
      </ThermometerBox>
      {intro && intro.length && <MarkdownContent source={intro} />}
      {sections.map(({ sectionId, header, body }) => (
        <Fragment key={sectionId}>
          <Anchor id={sectionId} />
          <Heading2>{header}</Heading2>
          <MarkdownContent source={body} />
        </Fragment>
      ))}
    </PageContent>
  </Fragment>
);

export default ContactUsPage;
