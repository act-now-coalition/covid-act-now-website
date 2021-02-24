import { Markdown } from '../utils';
import productsLanding from './products-landing.json';

/**
 * Data API Landing Page
 **/

export interface LandingPageButton {
  cta: string;
  redirect: string;
}

export interface ProductsLandingSection {
  productName: string;
  productId: string;
  productSubtitle: string;
  productDescription: Markdown;
  buttons?: LandingPageButton[];
}

export interface LogoItem {
  altText: string;
  image: string;
  url: string;
}

export interface ProductsLandingContent {
  header: string;
  intro?: Markdown;
  logos: LogoItem[];
  productsList: ProductsLandingSection[];
  metadataTitle: string;
  metadataDescription: string;
}

export const productsLandingContent = productsLanding as ProductsLandingContent;
