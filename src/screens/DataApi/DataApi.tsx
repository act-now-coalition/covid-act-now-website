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
import { MarkdownDataApi, DataApiSection } from './DataApi.style';
import { TocItem } from 'cms-content/utils';
import DataCoverageTable, {
  FIELDS_PRETTY_NAMES,
} from 'components/DataCoverageTable';
import LogoGrid from 'components/LogoGrid/LogoGrid';
import { EventCategory } from 'components/Analytics';
import { Grid } from '@material-ui/core';
import { LargeFilledButton, TextButton } from 'components/ButtonSystem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

const DataCoverageSection: React.FC<{}> = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DataCoverageTable rows={FIELDS_PRETTY_NAMES} />
      </Grid>
      <Grid item xs={12}>
        <TextButton
          href="https://apidocs.covidactnow.org/data-definitions"
          endIcon={<ArrowForwardIcon />}
          trackingCategory={EventCategory.API}
          trackingLabel="Data API: View all metrics"
        >
          View more metrics
        </TextButton>
      </Grid>
    </Grid>
  );
};

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
        <LargeFilledButton
          trackingCategory={EventCategory.API}
          trackingLabel="Data API: Register"
          href="https://apidocs.covidactnow.org/access/"
        >
          Register
        </LargeFilledButton>
        {productsList.map((product: ProductsLandingSection) => (
          <DataApiSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownDataApi source={product.productDescription} />
            {product.productId === 'coverage' && <DataCoverageSection />}
            {product.logos && <LogoGrid logos={product.logos} />}
          </DataApiSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default DataApi;
