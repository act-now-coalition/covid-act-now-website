import React from 'react';
import { scrollWithOffset } from '../TableOfContents';
import * as Style from './SidebarContents.style';

export interface Item {
  id: string;
  title: string;
}

const SidebarContents: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <nav>
      <Style.ItemList>
        {items.map(({ title, id }) => (
          <li key={id}>
            <Style.NavLink
              to={`#${id}`}
              scroll={el => scrollWithOffset(el, -80)}
            >
              {title}
            </Style.NavLink>
          </li>
        ))}
      </Style.ItemList>
    </nav>
  );
};
export default SidebarContents;
