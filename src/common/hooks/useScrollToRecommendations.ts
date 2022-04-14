import React, { useEffect } from 'react';

const scrollTo = (div: null | HTMLDivElement, offset: number = 100) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

// allowScroll is an optional additional check before scrolling to recommendations. On location pages, we first check to see if there is another param in the url that controls scrolling (ie. a chart share url)
export default function useScrollToRecommendations(
  pathname: string,
  ref: React.RefObject<HTMLDivElement> | null,
  allowScroll: boolean = true,
) {
  const isRecommendationsShareUrl = pathname.includes('recommendations');

  useEffect(() => {
    const scrollToRecommendations = () => {
      const timeoutId = setTimeout(() => {
        if (isRecommendationsShareUrl) {
          if (ref && ref.current && allowScroll) {
            scrollTo(ref.current);
          }
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    };

    scrollToRecommendations();
  }, [isRecommendationsShareUrl, allowScroll, ref]);
}
