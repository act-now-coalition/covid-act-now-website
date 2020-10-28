import React, { Fragment } from 'react';
import {
  PageContainer,
  PageHeader,
  PageContent,
  BreadcrumbsContainer,
  PageIntro,
  PageSidebar,
  Sticky,
} from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import Breadcrumbs from 'components/Breadcrumbs';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';
import { BreadcrumbItem } from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import SidebarContents from 'components/SidebarContents';

const Faq = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = faqContent;
  const date = formatMetatagDate();

  function getSectionItems(sections: FaqSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { to: '/learn', label: 'Learn' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContainer>
        <PageContent>
          <BreadcrumbsContainer>
            <Breadcrumbs pathItems={breadcrumbItems} />
          </BreadcrumbsContainer>
          <PageHeader>{header}</PageHeader>
          <PageIntro source={intro} />
          <Style.MobileOnly>
            <TableOfContents items={getSectionItems(sections)} />
          </Style.MobileOnly>
          {sections.map((section: FaqSection) => (
            <Section key={section.sectionId} content={section} />
          ))}
        </PageContent>
        <Style.DesktopOnly>
          <PageSidebar>
            <Sticky>
              <SidebarContents items={getSectionItems(sections)} />
            </Sticky>
          </PageSidebar>
        </Style.DesktopOnly>
      </PageContainer>
    </Fragment>
  );
};

export default Faq;
