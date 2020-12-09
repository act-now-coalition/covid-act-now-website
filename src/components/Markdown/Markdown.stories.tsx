import React from 'react';
import { MarkdownContent } from './index';

export default {
  title: 'Building Blocks/Markdown',
  component: MarkdownContent,
};

export const Default = () => {
  const source = `
# About Covid Act Now

## Our mission
Covid Act Now is a 501(c)(3) nonprofit founded in March 2020. We strive to provide the most timely and accurate local COVID data so that every American can make informed decisions during the pandemic. We are committed to:

https://www.youtube.com/embed/_S0k1I3kIbM

- **Data**: We support data and science-backed policies and decision-making
- **Transparency**: Our data and methodologies are fully open-source so that the public can vet, freely use, and build upon our work
- **Accessibility**: We make data universally accessible so that anyone can easily understand and use it, regardless of ability or prior knowledge
  `;
  return <MarkdownContent>{source}</MarkdownContent>;
};
