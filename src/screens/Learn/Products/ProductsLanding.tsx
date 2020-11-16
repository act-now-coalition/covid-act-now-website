import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { MarkdownContent, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import {
  learnPages,
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn';
import { MarkdownProduct, ProductSection } from './ProductsLanding.style';

const {
  header,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

const ProductsLanding = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/products"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <MarkdownContent source={intro} />
        {productsList.map((product: ProductsLandingSection) => (
          <ProductSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownProduct source={product.productDescription} />
          </ProductSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default ProductsLanding;
