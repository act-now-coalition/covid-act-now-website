import React from 'react';
import NavBarWithSearch from './NavBarWithSearch/NavBarWithSearch';
import NavBarWithoutSearch from './NavBarWithoutSearch/NavBarWithoutSearch';

const NavBar: React.FC<{
  renderSearch?: (menuOpen: boolean) => React.ReactElement;
  renderSecondaryElement: () => React.ReactElement;
  menuOpen?: any;
  setMenuOpen?: any;
}> = ({ renderSearch, renderSecondaryElement, menuOpen, setMenuOpen }) => {
  return (
    <>
      {renderSearch ? (
        <NavBarWithSearch
          renderSecondaryElement={renderSecondaryElement}
          renderSearch={renderSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      ) : (
        <NavBarWithoutSearch renderSecondaryElement={renderSecondaryElement} />
      )}
    </>
  );
};

export default NavBar;
