const randInt = (a: number, b: number): number =>
  Math.round(a + (b - a) * Math.random());

export const randomizeId = (name: string): string =>
  `${randInt(100, 999)}-${name}`;
