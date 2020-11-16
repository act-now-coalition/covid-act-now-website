import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { LearnHeading1 } from '../Learn.style';
import {
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn';
import { MarkdownProduct, ProductSection } from './ProductsLanding.style';
import { TocItem } from 'cms-content/utils';

const {
  header,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

export const sidebarSections: TocItem[] = [
  {
    label: 'Products',
    to: '/products',
    items: productsLandingContent.productsList.map(product => ({
      to: `/products#${product.productId}`,
      label: product.productName,
    })),
  },
];

const ProductsLanding = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/products"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={sidebarSections}>
        <LearnHeading1>{header}</LearnHeading1>
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
