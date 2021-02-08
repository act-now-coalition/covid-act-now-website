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

/**
 * When updating the COVID_RESPONSE_SIMULATOR_URL, update the version number
 * and the URL in src/assets/covid-response-simulator-version.txt. This file is
 * used by the the CRS to determine if a copy is up to date, and show a
 * message to the user.
 */
export const COVID_RESPONSE_SIMULATOR_URL =
  'https://docs.google.com/spreadsheets/d/1iUQvuY-DGbuxGBDrj1fvaDjk-peunHm89sMJe0z24U8/copy?usp=sharing';

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
