export enum SharedComponent {
  Any = 'any',
  Compare = 'compare',
  Explore = 'explore',
}

type Params = { [key: string]: any };

/**
 * Share links (/compare/<id>, /explore/<id>) are retired, so there are never
 * stored params to restore; shared URLs render the plain page.
 */
export function useSharedComponentParams(
  component: SharedComponent,
): Params | undefined {
  return undefined;
}
