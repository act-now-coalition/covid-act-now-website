export function isInternalLink(href: string) {
  return href.startsWith('#') || href.startsWith('/');
}

export function isValidURL(href: string): boolean {
  const isInternal = isInternalLink(href);
  try {
    isInternal ? new URL(href, 'https://covidactnow.org') : new URL(href);
  } catch (err) {
    console.error(err, href);
    return false;
  }
  return true;
}
