import React from 'react';
import NavBarWithSearch from './NavBarWithSearch/NavBarWithSearch';
import NavBarWithoutSearch from './NavBarWithoutSearch/NavBarWithoutSearch';

const noop = () => {};

const NavBar: React.FC<{
  renderSearch?: () => React.ReactElement;
  renderSecondaryElement: () => React.ReactElement;
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  renderSearch,
  renderSecondaryElement,
  menuOpen = false,
  setMenuOpen = noop,
}) => {
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
