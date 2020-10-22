import React from 'react';
import { HashLink } from 'react-router-hash-link';
import * as Style from './TableOfContents.style';

export interface Item {
  id: string;
  title: string;
}

const scrollWithOffset = (element: HTMLElement) => {
  const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

const TableOfContents: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <Style.Container>
      <ul>
        {items.map(({ title, id }) => (
          <li key={id}>
            <HashLink to={`#${id}`} scroll={scrollWithOffset}>
              {title}
            </HashLink>
          </li>
        ))}
      </ul>
    </Style.Container>
  );
};

export default TableOfContents;
