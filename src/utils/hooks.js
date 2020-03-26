import { useLocation } from 'react-router-dom';

export function useEmbed() {
  // Check if we're embedded in an iFrame
  const { pathname } = useLocation();
  const isEmbed = pathname.includes('/embed');

  return { isEmbed };
}
