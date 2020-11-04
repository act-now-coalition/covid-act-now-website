import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollSpy from 'react-scrollspy';
import * as Styles from './SidebarContents.style';

interface TocItem {
  label: string;
  to: string;
  items?: TocItem[];
}

const SidebarContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  // do not highlight based on scroll if we are on a hash page
  const { hash } = useLocation();
  const disableScrollSpy = hash && hash.length > 0;

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
                <Styles.InnerList
                  items={topLevelItem.items.map(item => item.to.split('#')[1])}
                  currentClassName={disableScrollSpy ? '' : 'active'}
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
