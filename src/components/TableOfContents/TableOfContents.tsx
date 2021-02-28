import React from 'react';
import { HashLink } from 'common/utils/router';
import * as Style from './TableOfContents.style';
import { scrollWithOffset } from './utils';

export interface Item {
  id: string;
  title: string;
}

const TableOfContents: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <Style.Container>
      <ul>
        {items.map(({ title, id }) => (
          <li key={id}>
            <HashLink
              to={`#${id}`}
              scroll={element => scrollWithOffset(element, -80)}
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
