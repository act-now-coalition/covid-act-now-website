import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { LearnHeading1 } from '../Learn/Learn.style';
import {
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn/tools';
import { MarkdownTools, ToolsSection } from './Tools.style';
import { TocItem } from 'cms-content/utils';

const {
  header,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

export const sidebarSections: TocItem[] = [
  {
    label: 'Tools',
    to: '/tools',
    items: productsLandingContent.productsList.map(product => ({
      to: `/tools#${product.productId}`,
      label: product.productName,
    })),
  },
];

const Tools = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/tools"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={sidebarSections}>
        <LearnHeading1>{header}</LearnHeading1>
        {productsList.map((product: ProductsLandingSection) => (
          <ToolsSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownTools source={product.productDescription} />
          </ToolsSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Tools;
