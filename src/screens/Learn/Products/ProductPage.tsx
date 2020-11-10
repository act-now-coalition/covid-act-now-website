import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent, Heading1, Heading2 } from 'components/Markdown';
import PageContent from 'components/PageContent';
import {
  learnPages,
  getProductPageContent,
  BodySection,
} from 'cms-content/learn';
import { BreadcrumbsContainer } from '../Learn.style';

const ProductPage: React.FC = () => {
  let { productId } = useParams<{ productId: string }>();
  const date = formatMetatagDate();
  const pageContent = getProductPageContent(productId);

  if (!pageContent) {
    return null;
  }

  const {
    productName,
    productIntro,
    metadataTitle,
    metadataDescription,
    sections,
  } = pageContent;

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={`/products/${productId}`}
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/products', label: 'Products' }} />
        </BreadcrumbsContainer>
        <Heading1>{productName}</Heading1>
        <MarkdownContent source={productIntro} />
        {sections.map((section: BodySection) => (
          <Fragment key={section.sectionId}>
            <Heading2>{section.sectionTitle}</Heading2>
            <MarkdownContent source={section.sectionBody} />
          </Fragment>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default ProductPage;
