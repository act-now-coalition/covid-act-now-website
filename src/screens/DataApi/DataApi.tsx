import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2, MarkdownContent } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { LearnHeading1 } from '../Learn/Learn.style';
import {
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn/data-api';
import {
  MarkdownDataApi,
  DataApiSection,
  ExternalStyledLink,
} from './DataApi.style';
import { TocItem } from 'cms-content/utils';
import { GreenButton } from 'screens/Learn/Landing/SectionButton.style';

const {
  header,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

export const sidebarSections: TocItem[] = [
  {
    label: 'Data API',
    to: '/data-api',
    items: productsLandingContent.productsList.map(product => ({
      to: `/data-api#${product.productId}`,
      label: product.productName,
    })),
  },
];

const DataApi = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/data-api"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={sidebarSections}>
        <LearnHeading1>{header}</LearnHeading1>
        <MarkdownContent source={intro} />
        <ExternalStyledLink href="https://apidocs.covidactnow.org/access/">
          <GreenButton disableRipple>Register</GreenButton>
        </ExternalStyledLink>
        {productsList.map((product: ProductsLandingSection) => (
          <DataApiSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownDataApi source={product.productDescription} />
          </DataApiSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default DataApi;
