import { mobileWidth } from 'components/Search/SearchAutocomplete/SearchAutocomplete.style';

/**
 * Used for the searchbar on the homepage + in the navbar across the site
 *
 * There are a few minor style differences in the wrapping div
 * (MobileWrapperClosed in SearchAutocomplete.style.tsx)
 */

export interface SearchbarTheme {
  mobileClosedWidth: string;
  mobileClosedPadding: string;
  mobileClosedMaxWidth: string;
  mobileClosedMarginLeft: string;
}

export const searchbar: SearchbarTheme = {
  mobileClosedWidth: `${mobileWidth}px`,
  mobileClosedPadding: '0.75rem 0.5rem 1rem',
  mobileClosedMaxWidth: 'unset',
  mobileClosedMarginLeft: '0',
};

export const navSearchbar: SearchbarTheme = {
  mobileClosedWidth: '100%',
  mobileClosedPadding: '1rem 0.25rem 1rem 1.25rem',
  mobileClosedMaxWidth: '200px',
  mobileClosedMarginLeft: 'auto',
};

export const navSearchbarLocPage: SearchbarTheme = {
  mobileClosedWidth: '100%',
  mobileClosedPadding: '1rem .5rem',
  mobileClosedMaxWidth: '100%',
  mobileClosedMarginLeft: 'auto',
};
