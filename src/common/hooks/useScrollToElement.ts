/* Scrolls to the specific element corresponding to the hash.
Example: covidactnow.org/#some-section will automatically scroll to that section. */

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollWithTimeout } from 'components/Markdown/MarkdownLink';

export default function useScrollToElement(): void {
  const { hash } = useLocation();
  const offset = -100;

  useEffect(() => {
    const element = hash ? (document.querySelector(hash) as HTMLElement) : null;
    if (element) {
      scrollWithTimeout(element, offset);
    }
  }, [hash, offset]);
}
