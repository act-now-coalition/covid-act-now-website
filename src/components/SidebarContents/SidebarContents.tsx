import React, { Fragment } from 'react';
import * as Styles from './SidebarContents.style';

interface TocItem {
  label: string;
  to: string;
  items?: TocItem[];
}

const SidebarContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  return (
    <nav>
      <Styles.TopLevelList>
        {items.map(topLevelItem => (
          <li key={topLevelItem.to}>
            <Fragment>
              <Styles.TopLevelLink to={topLevelItem.to}>
                {topLevelItem.label}
              </Styles.TopLevelLink>
              {topLevelItem.items && (
                <Styles.InnerList>
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
