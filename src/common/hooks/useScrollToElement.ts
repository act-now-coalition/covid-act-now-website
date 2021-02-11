/* Scrolls to the specific element corresponding to the hash. 
Example: covidactnow.org/glossary#npi will automatically scroll to the NPI section. */

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollWithTimeout } from 'components/Markdown/MarkdownLink';

export default function useScrollToElement(): void {
  const elementToScrollTo = useLocation().hash;
  useEffect(() => {
    const element = elementToScrollTo
      ? (document.querySelector(elementToScrollTo) as HTMLElement)
      : null;
    if (element) {
      scrollWithTimeout(element, -80);
    }
  }, [elementToScrollTo]);
}
