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
  GreenLinkButton,
} from './DataApi.style';
import { TocItem } from 'cms-content/utils';
import AvailabilityTable, {
  AVAILABILITY_SNAPSHOT,
  FIELDS_PRETTY_NAMES,
} from './AvailabilityTable';
import LogoGrid from 'components/LogoGrid/LogoGrid';
import { EventCategory } from 'components/Analytics';

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
    items: productsList.map(product => ({
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
        <GreenLinkButton
          trackingCategory={EventCategory.API}
          trackingLabel="Data API: Register"
          href="https://apidocs.covidactnow.org/access/"
        >
          Register
        </GreenLinkButton>
        {productsList.map((product: ProductsLandingSection) => (
          <DataApiSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownDataApi source={product.productDescription} />
            {product.productId === 'coverage' && (
              <AvailabilityTable rows={FIELDS_PRETTY_NAMES} />
            )}
            {product.logos && <LogoGrid logos={product.logos} />}
          </DataApiSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default DataApi;
