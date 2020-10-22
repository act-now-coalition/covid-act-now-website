import React from 'react';
import { HashLink } from 'react-router-hash-link';
import * as Style from './TableOfContents.style';
import { scrollWithOffset } from './utils';

export interface Item {
  id: string;
  title: string;
}

const TableOfContents: React.FC<{
  items: Item[];
  onClickItem: (id: string) => void;
}> = ({ items, onClickItem }) => {
  return (
    <Style.Container>
      <ul>
        {items.map(({ title, id }) => (
          <li key={id}>
            <HashLink
              to={`#${id}`}
              scroll={element => scrollWithOffset(element, -80)}
              onClick={() => onClickItem(id)}
            >
              {title}
            </HashLink>
          </li>
        ))}
      </ul>
    </Style.Container>
  );
};

export default TableOfContents;
