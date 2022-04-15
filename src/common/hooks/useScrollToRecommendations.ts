import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollTo = (div: null | HTMLDivElement, offset: number = 100) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop - offset,
    behavior: 'smooth',
  });

export default function useScrollToRecommendations(
  ref: React.RefObject<HTMLDivElement> | null,
) {
  const location = useLocation();
  const isRecommendationsShareUrl = location.pathname.includes(
    'recommendations',
  );

  useEffect(() => {
    const scrollToRecommendations = () => {
      const timeoutId = setTimeout(() => {
        if (isRecommendationsShareUrl) {
          if (ref && ref.current) {
            scrollTo(ref.current);
          }
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    };

    scrollToRecommendations();
  }, [ref, isRecommendationsShareUrl]);
}
