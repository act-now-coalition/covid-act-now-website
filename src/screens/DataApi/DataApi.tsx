import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2, MarkdownContent } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { LearnHeading1 } from '../Learn/Learn.style';
import {
  LogoItem,
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn/data-api';
import { MarkdownDataApi, DataApiSection } from './DataApi.style';
import { TocItem } from 'cms-content/utils';
import { chunk } from 'lodash';
import { Grid } from '@material-ui/core';
import { LogoGridItem } from 'components/LogoGrid/LogoGrid';
import GovLogoGrid from 'screens/About/GovLogoGrid';

const {
  header,
  logos,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

const usingDataItem = {
  productName: "Who's using our data",
  productId: 'whos-using-our-data',
  productSubtitle: '',
  productDescription:
    'Our API is used by organizations and individuals around the country including:',
};

const sidebarContent = [usingDataItem, ...productsLandingContent.productsList];

export const sidebarSections: TocItem[] = [
  {
    label: 'Data API',
    to: '/data-api',
    items: sidebarContent.map(product => ({
      to: `/data-api#${product.productId}`,
      label: product.productName,
    })),
  },
];

const WhosUsingOurDataSection: React.FC<{
  logos: LogoItem[];
}> = ({ logos }) => {
  return (
    <DataApiSection key={usingDataItem.productId}>
      <Heading2 id={usingDataItem.productId}>
        {usingDataItem.productName}
      </Heading2>
      <MarkdownDataApi source={usingDataItem.productDescription} />
      <GovLogoGrid logos={logos} />
    </DataApiSection>
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
        <WhosUsingOurDataSection logos={logos} />
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
