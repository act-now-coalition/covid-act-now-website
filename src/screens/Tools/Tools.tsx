import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2, MarkdownContent } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { ButtonContainer, LearnHeading1 } from '../Learn/Learn.style';
import {
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn/tools';
import { MarkdownTools, ToolsSection } from './Tools.style';
import { TocItem } from 'cms-content/utils';
import SectionButton, {
  ButtonTheme,
} from 'screens/Learn/Landing/SectionButton';

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
        <MarkdownContent source={intro} />
        {productsList.map((product: ProductsLandingSection) => (
          <ToolsSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownTools source={product.productDescription} />
            {product.buttons &&
              product.buttons.map(button => {
                console.log(button);
                return (
                  <ButtonContainer>
                    <SectionButton
                      cta={button.cta}
                      redirect={button.redirect}
                      theme={ButtonTheme.WHITE}
                    ></SectionButton>
                  </ButtonContainer>
                );
              })}
          </ToolsSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Tools;
