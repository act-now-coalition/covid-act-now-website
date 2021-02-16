import { Location } from './index';

export const decomposeUrl = (url: string): Location => {
  const [queryLocation, hash] = url.split('#');
  const [pathname, queryString] = queryLocation.split('?');
  const search = new URLSearchParams(queryString ?? '').toString();

  return {
    pathname: pathname,
    search: search,
    hash: hash ?? '',
  };
};
