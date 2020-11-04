import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import * as Styles from './SidebarContents.style';

interface TocItem {
  label: string;
  to: string;
  items?: TocItem[];
}

function getHash(item: TocItem) {
  const parts = item.to.split('#');
  return parts.length > 1 ? parts[1] : '';
}

const SidebarContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const { hash, pathname } = useLocation();
  return (
    <nav>
      <Styles.TopLevelList>
        {items.map(topLevelItem => (
          <li key={topLevelItem.to}>
            <Fragment>
              <Styles.TopLevelLink to={topLevelItem.to}>
                {topLevelItem.label}
              </Styles.TopLevelLink>
              {topLevelItem.items && topLevelItem.to === pathname && (
                // Disable scrollspy when the user navigates to a specific section
                <Styles.InnerList
                  items={topLevelItem.items.map(getHash)}
                  currentClassName={hash ? '' : 'active'}
                >
                  {topLevelItem.items.map(childItem => (
                    <li key={childItem.to}>
                      <Styles.InnerLevelLink to={childItem.to}>
                        {childItem.label}
                      </Styles.InnerLevelLink>
                    </li>
                  ))}
                </Styles.InnerList>
              )}
            </Fragment>
          </li>
        ))}
      </Styles.TopLevelList>
    </nav>
  );
};

export default SidebarContents;
