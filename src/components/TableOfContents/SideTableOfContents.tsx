import React from 'react';
import { NavHashLink } from 'common/utils/router';
import { Item } from './TableOfContents';
import * as Style from './SideTableOfContents.style';
import { scrollWithOffset } from './utils';

const SideTableOfContents: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <Style.Container>
      <ul>
        {items.map(({ title, id }) => (
          <li key={id}>
            <NavHashLink
              to={`#${id}`}
              scroll={element => scrollWithOffset(element, -80)}
              activeClassName="active"
            >
              {title}
            </NavHashLink>
          </li>
        ))}
      </ul>
    </Style.Container>
  );
};

export default SideTableOfContents;
