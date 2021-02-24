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

const {
  header,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
  logos,
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

interface Props {
  logos: LogoItem[];
}

const WhosUsingOurDataSection = ({ logos }: Props) => {
  const key = 'whos-using-our-data';
  const name = "Who's using our data";
  return (
    <DataApiSection key={key}>
      <Heading2 id={key}>{name}</Heading2>
      {logos.map(logo => (
        <img src={logo.url} alt={logo.altText} />
      ))}
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
