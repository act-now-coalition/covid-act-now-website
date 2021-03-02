/* Scrolls to the specific element corresponding to the hash. 
Example: covidactnow.org/glossary#npi will automatically scroll to the NPI section. */

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollWithTimeout } from 'components/Markdown/MarkdownLink';

export default function useScrollToElement(): void {
  const { pathname, hash } = useLocation();

  const isLocationPage = pathname.includes('/us/');
  const offset = isLocationPage ? -180 : -80;

  useEffect(() => {
    const element = hash ? (document.querySelector(hash) as HTMLElement) : null;
    if (element) {
      scrollWithTimeout(element, offset);
    }
  }, [hash, offset]);
}
