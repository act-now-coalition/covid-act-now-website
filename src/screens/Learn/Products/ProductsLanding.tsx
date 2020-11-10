import React, { Fragment } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { MarkdownContent, Heading1, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import {
  learnPages,
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn';
import { BreadcrumbsContainer } from '../Learn.style';

const {
  header,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

const ProductsLanding = () => {
  let { url } = useRouteMatch();
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
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {productsList.map((product: ProductsLandingSection) => (
          <Fragment key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <p>{product.productSubtitle}</p>
            <MarkdownContent source={product.productDescription} />
            <Link to={`${url}/${product.productId}`}>
              {product.buttons[0].cta}
            </Link>
            <a
              href={product.buttons[1].redirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.buttons[1].cta}
            </a>
          </Fragment>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default ProductsLanding;
